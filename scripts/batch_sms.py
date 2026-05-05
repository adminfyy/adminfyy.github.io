#!/usr/bin/env python3
"""
batch_sms.py - 批量短信发送脚本
支持多种开源/免费方案，通过 Provider 插件化扩展。

用法:
    python batch_sms.py --provider gammu --recipients phones.csv --message "Hello"
    python batch_sms.py --provider email2sms --recipients phones.csv --message "Hello"
    python batch_sms.py --provider android --recipients phones.csv --message "Hello"
"""

import argparse
import csv
import json
import logging
import smtplib
import subprocess
import sys
import time
from abc import ABC, abstractmethod
from email.mime.text import MIMEText
from pathlib import Path
from typing import Optional

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%H:%M:%S",
)
logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# 数据模型
# ---------------------------------------------------------------------------
class SendResult:
    def __init__(self, phone: str, success: bool, error: Optional[str] = None):
        self.phone = phone
        self.success = success
        self.error = error


# ---------------------------------------------------------------------------
# Provider 基类
# ---------------------------------------------------------------------------
class SMSProvider(ABC):
    """短信发送提供者基类"""

    @abstractmethod
    def send(self, phone: str, message: str) -> bool:
        """发送单条短信，返回是否成功"""
        ...

    @property
    @abstractmethod
    def name(self) -> str:
        ...


# ---------------------------------------------------------------------------
# Provider 1: Gammu (USB GSM Modem / 短信猫)
# 开源: https://wammu.eu/gammu/
# 需要: gammu 已安装并配置，USB 短信猫已连接
# ---------------------------------------------------------------------------
class GammuProvider(SMSProvider):
    """通过 Gammu CLI 发送短信（USB GSM Modem）"""

    def __init__(self, config: Optional[dict] = None):
        self.config = config or {}
        self.device = self.config.get("device", "")  # 如 COM3 / /dev/ttyUSB0
        self.delay = float(self.config.get("delay", 2))

    def send(self, phone: str, message: str) -> bool:
        cmd = ["gammu", "sendsms", "TEXT", phone]
        if self.device:
            cmd.extend(["-c", self.device])
        try:
            result = subprocess.run(
                cmd,
                input=message.encode("utf-8"),
                capture_output=True,
                timeout=30,
            )
            if result.returncode == 0:
                logger.info(f"[Gammu] 发送成功 -> {phone}")
                return True
            else:
                err = result.stderr.decode("utf-8", errors="replace").strip()
                logger.error(f"[Gammu] 发送失败 -> {phone}: {err}")
                return False
        except Exception as e:
            logger.error(f"[Gammu] 异常 -> {phone}: {e}")
            return False

    @property
    def name(self) -> str:
        return "gammu"


# ---------------------------------------------------------------------------
# Provider 2: Email-to-SMS 网关 (免费)
# 原理: 运营商提供 email 转短信的网关地址
# 支持运营商映射（国内部分运营商已停用此功能，需自行确认）
# ---------------------------------------------------------------------------
CARRIER_GATEWAYS = {
    # 中国区（部分可能已停用）
    "13": "139sms",    # 移动: 手机号@139.com
    "15": "139sms",
    "18": "139sms",
    "17": "139sms",
    # 国际
    "us-att": "{phone}@txt.att.net",
    "us-verizon": "{phone}@vtext.com",
    "us-tmobile": "{phone}@tmomail.net",
}


class Email2SMSProvider(SMSProvider):
    """通过 Email-to-SMS 网关发送短信"""

    def __init__(self, config: dict):
        self.smtp_host = config["smtp_host"]
        self.smtp_port = int(config.get("smtp_port", 587))
        self.smtp_user = config["smtp_user"]
        self.smtp_pass = config["smtp_pass"]
        self.sender_email = config.get("sender_email", self.smtp_user)
        self.gateway = config.get("gateway", "139sms")  # 默认移动139邮箱
        self.delay = float(config.get("delay", 3))

    def _build_gateway_address(self, phone: str) -> str:
        """根据运营商网关规则生成收件地址"""
        if self.gateway == "139sms":
            return f"{phone}@139.com"
        if "{" in self.gateway:
            return self.gateway.format(phone=phone)
        return f"{phone}@{self.gateway}"

    def send(self, phone: str, message: str) -> bool:
        to_addr = self._build_gateway_address(phone)
        msg = MIMEText(message, "plain", "utf-8")
        msg["From"] = self.sender_email
        msg["To"] = to_addr
        msg["Subject"] = ""  # 短信网关通常忽略主题

        try:
            with smtplib.SMTP(self.smtp_host, self.smtp_port, timeout=15) as server:
                server.starttls()
                server.login(self.smtp_user, self.smtp_pass)
                server.sendmail(self.sender_email, [to_addr], msg.as_string())
            logger.info(f"[Email2SMS] 发送成功 -> {phone} ({to_addr})")
            return True
        except Exception as e:
            logger.error(f"[Email2SMS] 发送失败 -> {phone}: {e}")
            return False

    @property
    def name(self) -> str:
        return "email2sms"


# ---------------------------------------------------------------------------
# Provider 3: Android 手机网关 (ADB / Termux)
# 开源: https://github.com/termux/termux-api
# 原理: 通过 ADB 连接 Android 手机，调用 Termux:API 发送短信
# ---------------------------------------------------------------------------
class AndroidProvider(SMSProvider):
    """通过 Android 手机 + Termux:API 发送短信"""

    def __init__(self, config: Optional[dict] = None):
        self.config = config or {}
        self.use_adb = self.config.get("use_adb", True)
        self.device = self.config.get("device", "")
        self.delay = float(self.config.get("delay", 2))

    def send(self, phone: str, message: str) -> bool:
        if self.use_adb:
            return self._send_via_adb(phone, message)
        else:
            return self._send_via_ssh(phone, message)

    def _send_via_adb(self, phone: str, message: str) -> bool:
        """通过 ADB 调用 Termux API 发送短信"""
        cmd = ["adb"]
        if self.device:
            cmd.extend(["-s", self.device])
        cmd.extend(["shell", "am", "start",
                     "-a", "android.intent.action.SENDTO",
                     "-d", f"smsto:{phone}",
                     "--es", "sms_body", message])
        try:
            result = subprocess.run(cmd, capture_output=True, timeout=15)
            if result.returncode == 0:
                logger.info(f"[Android] 发送成功 -> {phone}")
                return True
            err = result.stderr.decode("utf-8", errors="replace").strip()
            logger.error(f"[Android] 发送失败 -> {phone}: {err}")
            return False
        except Exception as e:
            logger.error(f"[Android] 异常 -> {phone}: {e}")
            return False

    def _send_via_ssh(self, phone: str, message: str) -> bool:
        """通过 SSH 调用远程 Termux:API 发送短信"""
        host = self.config.get("ssh_host", "")
        port = self.config.get("ssh_port", 22)
        cmd = [
            "ssh", "-p", str(port), host,
            "termux-sms-send", "-n", phone,
        ]
        try:
            result = subprocess.run(
                cmd, input=message.encode("utf-8"),
                capture_output=True, timeout=15,
            )
            if result.returncode == 0:
                logger.info(f"[Android-SSH] 发送成功 -> {phone}")
                return True
            err = result.stderr.decode("utf-8", errors="replace").strip()
            logger.error(f"[Android-SSH] 发送失败 -> {phone}: {err}")
            return False
        except Exception as e:
            logger.error(f"[Android-SSH] 异常 -> {phone}: {e}")
            return False

    @property
    def name(self) -> str:
        return "android"


# ---------------------------------------------------------------------------
# Provider 注册表
# ---------------------------------------------------------------------------
PROVIDERS = {
    "gammu": GammuProvider,
    "email2sms": Email2SMSProvider,
    "android": AndroidProvider,
}


# ---------------------------------------------------------------------------
# 收件人加载
# ---------------------------------------------------------------------------
def load_recipients(path: str) -> list[str]:
    """从 CSV/JSON/TXT 加载手机号列表"""
    p = Path(path)
    ext = p.suffix.lower()

    if ext == ".csv":
        phones = []
        with open(p, newline="", encoding="utf-8") as f:
            reader = csv.reader(f)
            for row in reader:
                if row:
                    phone = row[0].strip().replace("-", "").replace(" ", "")
                    if phone and phone[0].isdigit():
                        phones.append(phone)
        return phones

    if ext == ".json":
        with open(p, encoding="utf-8") as f:
            data = json.load(f)
        if isinstance(data, list):
            return [str(x).strip().replace("-", "").replace(" ", "") for x in data]
        if isinstance(data, dict) and "phones" in data:
            return [str(x).strip().replace("-", "").replace(" ", "") for x in data["phones"]]
        return []

    # .txt 或无后缀: 每行一个号码
    phones = []
    with open(p, encoding="utf-8") as f:
        for line in f:
            phone = line.strip().replace("-", "").replace(" ", "")
            if phone and phone[0].isdigit():
                phones.append(phone)
    return phones


# ---------------------------------------------------------------------------
# 主流程
# ---------------------------------------------------------------------------
def main():
    parser = argparse.ArgumentParser(description="批量短信发送脚本（开源方案）")
    parser.add_argument(
        "--provider", "-p",
        choices=list(PROVIDERS.keys()),
        default="gammu",
        help="短信发送方案: gammu / email2sms / android",
    )
    parser.add_argument(
        "--recipients", "-r",
        required=True,
        help="收件人文件 (.csv / .json / .txt，每行一个号码)",
    )
    parser.add_argument(
        "--message", "-m",
        required=True,
        help="短信内容",
    )
    parser.add_argument(
        "--config", "-c",
        help="Provider 配置文件 (JSON)",
    )
    parser.add_argument(
        "--dry-run", "-d",
        action="store_true",
        help="仅打印收件人列表，不实际发送",
    )
    parser.add_argument(
        "--delay",
        type=float,
        help="每条短信间隔（秒），覆盖配置值",
    )
    parser.add_argument(
        "--report",
        help="输出发送结果报告文件路径",
    )
    args = parser.parse_args()

    # 加载收件人
    phones = load_recipients(args.recipients)
    if not phones:
        logger.error(f"未找到任何收件人: {args.recipients}")
        sys.exit(1)
    logger.info(f"加载 {len(phones)} 个收件人")

    # 加载配置
    config = {}
    if args.config:
        with open(args.config, encoding="utf-8") as f:
            config = json.load(f)
    if args.delay:
        config["delay"] = args.delay

    # Dry run
    if args.dry_run:
        logger.info("=== DRY RUN ===")
        for i, phone in enumerate(phones, 1):
            print(f"  {i}. {phone}")
        logger.info(f"共 {len(phones)} 个收件人，短信内容: {args.message}")
        return

    # 初始化 Provider
    provider_cls = PROVIDERS[args.provider]
    provider = provider_cls(config)
    logger.info(f"使用方案: {provider.name}")

    # 批量发送
    results: list[SendResult] = []
    success_count = 0
    fail_count = 0

    for i, phone in enumerate(phones, 1):
        logger.info(f"[{i}/{len(phones)}] 发送 -> {phone}")
        ok = provider.send(phone, args.message)
        results.append(SendResult(phone, ok))
        if ok:
            success_count += 1
        else:
            fail_count += 1

        delay = float(config.get("delay", 2))
        if i < len(phones) and delay > 0:
            time.sleep(delay)

    # 汇总
    logger.info(f"=== 发送完成: 成功 {success_count}, 失败 {fail_count}, 总计 {len(phones)} ===")

    # 输出报告
    if args.report:
        with open(args.report, "w", encoding="utf-8") as f:
            f.write("phone,success,error\n")
            for r in results:
                f.write(f"{r.phone},{r.success},{r.error or ''}\n")
        logger.info(f"报告已写入: {args.report}")


if __name__ == "__main__":
    main()
