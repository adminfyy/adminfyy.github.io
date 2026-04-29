# H5 `launch-app`：微信开放标签 `wx-open-launch-app` 原理与实战

在微信内置浏览器里，普通 H5 的 `scheme` 唤起常常会被限制。  
要稳定地从 H5 打开 App，官方路径是微信开放标签：`wx-open-launch-app`。

这篇文章不只讲“怎么写代码”，重点讲清楚它的工作原理。

## 1. 为什么要用开放标签

传统 H5 唤端一般依赖：

- URL Scheme
- Universal Link（iOS）
- 应用市场兜底页

但在微信 WebView 中，这类方式经常受限。  
`wx-open-launch-app` 的核心价值是：**把“唤端动作”交给微信客户端执行**，而不是让网页直接跳系统能力。

## 2. 原理拆解：三层模型

可以把整个机制理解为三层：

1. 权限层（谁有资格调用）
2. 渲染层（标签如何被微信识别）
3. 唤起层（点击后如何打开 App）

### 2.1 权限层：JS-SDK 签名校验

页面必须先完成 `wx.config`，并且把 `wx-open-launch-app` 放进 `openTagList`。  
这一步本质是告诉微信：

- 当前页面域名合法
- 当前签名合法
- 当前页面被允许使用开放标签能力

如果签名失败、域名未配置，标签通常不会正常生效。

### 2.2 渲染层：微信客户端接管标签

`wx-open-launch-app` 不是普通 HTML 组件，它由微信客户端识别并接管。  
你写在页面里的标签，更像是一个“声明式指令”：

- 告诉微信“这个区域是唤端按钮”
- 告诉微信“目标 App 是哪个（`appid`）”
- 可传 `extinfo` 给 App 作为路由参数

### 2.3 唤起层：点击触发客户端能力

用户点击后，微信客户端尝试打开目标 App：

- 已安装：直接拉起，并把 `extinfo` 带过去
- 未安装/不可拉起：根据平台策略走失败分支或兜底逻辑

所以它不是“前端 JS 直接唤端”，而是**微信客户端代理唤端**。

## 3. 关键链路（从 0 到 1）

## 3.1 后端：生成签名参数

后端通常提供一个签名接口，返回：

- `appId`（公众号 AppID）
- `timestamp`
- `nonceStr`
- `signature`

前端拿到后执行 `wx.config`。

## 3.2 前端：初始化 JS-SDK

```html
<script src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
<script>
  wx.config({
    debug: false,
    appId: sign.appId,
    timestamp: sign.timestamp,
    nonceStr: sign.nonceStr,
    signature: sign.signature,
    jsApiList: [],
    openTagList: ['wx-open-launch-app']
  })
  wx.ready(() => {
    console.log('wx sdk ready')
  })
  wx.error((err) => {
    console.error('wx config error', err)
  })
</script>
```

## 3.3 页面：开放标签声明

```html
<wx-open-launch-app appid="开放平台移动应用AppID" extinfo='{"page":"detail","id":"1001"}'>
  <script type="text/wxtag-template">
    <style>
      .open-btn {
        width: 220px;
        line-height: 44px;
        text-align: center;
        border-radius: 999px;
        background: #07c160;
        color: #fff;
        font-weight: 600;
      }
    </style>
    <div class="open-btn">打开 App 查看详情</div>
  </script>
</wx-open-launch-app>
```

> 常见误区：`wx.config` 里的 `appId` 和标签内 `appid` 不是同一个概念，前者是公众号，后者是开放平台移动应用。

## 3.4 基于 `launch-app` 组件的实战代码（H5 项目）

下面这版是组件化写法，适合真实业务复用。

### 组件模板（核心）

```vue
<template>
  <div :id="idName" ref="root" class="pos-relative" @click="$emit('click')">
    <Loading v-if="isAndroidWechat && !showOpenTag" size="20" />
    <slot>{{ text }}</slot>

    <wx-open-launch-app
      v-if="showOpenTag"
      :id="idName"
      appid="你的移动应用AppID"
      class="wrapper"
      :style="rootSizeStyle"
      :extinfo="wxExtInfo"
      @error="onWxLaunchError"
      @launch="onWxLaunchSuccess"
    >
      <script type="text/wxtag-template">
        <style>
          .btn {
            display: block;
            width: {{ rootWidth }}px;
            height: {{ rootHeight }}px;
            color: transparent;
          }
        </style>
        <div class="btn">{{ text }}</div>
      </script>
    </wx-open-launch-app>
  </div>
</template>
```

### 组件逻辑（关键点）

```js
computed: {
  showOpenTag() {
    return this.wxConfigReady && this.isAndroidWechat
  },
  wxExtInfo() {
    const raw = this?.getExt?.() || this.$route.query.type || ''
    return encodeURIComponent(raw)
  }
},
methods: {
  onWxLaunchError() {
    // 唤端失败兜底到应用宝
    window.location.replace('https://a.app.qq.com/o/simple.jsp?pkgname=你的包名')
  },
  initWechatConfig() {
    wx?.ready(() => {
      this.wxConfigReady = true
    })
  }
}
```

### JS-SDK 配置（必须包含 `openTagList`）

```js
wx.config({
  debug: false,
  appId: WECHAT_APP_ID,
  timestamp,
  nonceStr,
  signature,
  jsApiList: ['checkJsApi'],
  openTagList: ['wx-open-launch-app']
})
```

### Vue 识别开放标签（避免被当成未知元素报错）

```js
Vue.config.ignoredElements = ['wx-open-launch-app']
```

### 这套实现的设计意图

1. 仅在 Android 微信显示开放标签，其他端走降级逻辑。
2. 把 `extinfo` 当路由参数通道，前后端约定统一格式。
3. `error` 事件强制兜底下载，减少“按钮可见但无响应”体验。
4. 用组件封装统一唤端行为，业务页只关心传参和样式。

## 4. 时序图（简化版）

1. H5 请求后端签名
2. H5 执行 `wx.config`
3. 微信校验签名 + 域名权限
4. 微信接管 `wx-open-launch-app` 标签
5. 用户点击
6. 微信客户端尝试拉起 App 并传递 `extinfo`

## 5. 排障清单（最常见）

如果按钮不显示/点击无效，优先检查：

1. 页面是否在微信内打开
2. 签名 URL 是否与当前页面 URL 完全一致（含 query 规则）
3. 公众号域名与 JS 安全域名是否配置正确
4. `openTagList` 是否包含 `wx-open-launch-app`
5. `appid` 是否填成了移动应用 AppID（而不是公众号 AppID）
6. 目标 App 是否在开放平台完成关联配置
7. `extinfo` 是否过长或格式错误（建议 JSON 字符串）

## 6. 工程化建议

- 把唤端按钮封装成统一组件，内置监控埋点（展示、点击、成功、失败）。
- `extinfo` 只传路由键和业务 ID，不传敏感信息。
- 对失败路径提供“复制口令/下载引导页/客服入口”等兜底方案。
- 在灰度阶段按机型与系统版本分桶观察成功率。

## 7. 总结

`wx-open-launch-app` 的本质是：  
**网页声明 + 微信鉴权 + 客户端代唤起**。

理解这个原理后，你会发现它不是一个“按钮组件问题”，而是一条“公众号配置、开放平台关联、签名服务、H5 渲染、App 路由”全链路能力。
