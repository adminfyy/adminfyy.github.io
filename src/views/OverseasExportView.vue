<script setup lang="ts">
import { computed, ref } from "vue";

import {
  buildExportChecklist,
  calculateOverseasQuote,
} from "@/utils/overseasExport";

const productCostCny = ref(42);
const domesticLogisticsCny = ref(8);
const oceanFreightUsd = ref(0.9);
const insuranceUsd = ref(0.2);
const platformFeeRate = ref(12);
const tariffRate = ref(8);
const marginRate = ref(20);
const exchangeRate = ref(7.2);

const market = ref<"US" | "EU" | "SEA" | "MIDDLE_EAST">("US");
const incoterm = ref<"EXW" | "FOB" | "CIF" | "DDP">("FOB");
const containsBattery = ref(false);
const hasTrademark = ref(true);

const quote = computed(() =>
  calculateOverseasQuote({
    productCostCny: productCostCny.value,
    domesticLogisticsCny: domesticLogisticsCny.value,
    oceanFreightUsd: oceanFreightUsd.value,
    insuranceUsd: insuranceUsd.value,
    platformFeeRate: platformFeeRate.value,
    tariffRate: tariffRate.value,
    marginRate: marginRate.value,
    exchangeRate: exchangeRate.value,
  })
);

const checklist = computed(() =>
  buildExportChecklist({
    market: market.value,
    incoterm: incoterm.value,
    containsBattery: containsBattery.value,
    hasTrademark: hasTrademark.value,
  })
);

const copiedTip = ref("");

const marketLabelMap = {
  US: "美国",
  EU: "欧盟",
  SEA: "东南亚",
  MIDDLE_EAST: "中东",
};

const summaryText = computed(() =>
  [
    "海外出口测算摘要",
    `- 市场：${marketLabelMap[market.value]}`,
    `- 贸易术语：${incoterm.value}`,
    `- EXW 成本：¥${quote.value.exwCny}`,
    `- FOB 报价：$${quote.value.fobUsd}`,
    `- CIF 报价：$${quote.value.cifUsd}`,
    `- 到岸成本：$${quote.value.landedUsd}`,
    `- 建议批发价：$${quote.value.suggestedWholesaleUsd}`,
    `- 建议零售价：$${quote.value.suggestedRetailUsd}`,
    "",
    "执行清单：",
    ...checklist.value.map((item, index) => `${index + 1}. ${item}`),
  ].join("\n")
);

const copySummary = async () => {
  if (!navigator?.clipboard) {
    copiedTip.value = "当前浏览器不支持复制";
    return;
  }

  await navigator.clipboard.writeText(summaryText.value);
  copiedTip.value = "已复制测算摘要";
  setTimeout(() => {
    copiedTip.value = "";
  }, 1200);
};
</script>

<template>
  <main class="export-lab">
    <section class="hero">
      <p class="eyebrow">Overseas Export Toolkit</p>
      <h1>一页完成出口报价与合规清单</h1>
      <p>
        输入成本和费率，自动得到
        FOB/CIF/到岸成本与建议售价；并根据目标市场生成可执行的出海检查清单。
      </p>
    </section>

    <section class="workspace">
      <article class="panel form-panel">
        <h2>成本参数</h2>
        <div class="form-grid">
          <label>
            货值成本 (CNY)
            <input
              v-model.number="productCostCny"
              type="number"
              min="0"
              step="0.1"
            />
          </label>
          <label>
            国内物流 (CNY)
            <input
              v-model.number="domesticLogisticsCny"
              type="number"
              min="0"
              step="0.1"
            />
          </label>
          <label>
            海运费 (USD)
            <input
              v-model.number="oceanFreightUsd"
              type="number"
              min="0"
              step="0.1"
            />
          </label>
          <label>
            保险费 (USD)
            <input
              v-model.number="insuranceUsd"
              type="number"
              min="0"
              step="0.1"
            />
          </label>
          <label>
            平台费率 (%)
            <input
              v-model.number="platformFeeRate"
              type="number"
              min="0"
              step="0.1"
            />
          </label>
          <label>
            关税税率 (%)
            <input
              v-model.number="tariffRate"
              type="number"
              min="0"
              step="0.1"
            />
          </label>
          <label>
            目标利润率 (%)
            <input
              v-model.number="marginRate"
              type="number"
              min="0"
              step="0.1"
            />
          </label>
          <label>
            汇率 (CNY/USD)
            <input
              v-model.number="exchangeRate"
              type="number"
              min="0.0001"
              step="0.01"
            />
          </label>
        </div>

        <h3>市场条件</h3>
        <div class="control-grid">
          <label>
            目标市场
            <select v-model="market">
              <option value="US">美国</option>
              <option value="EU">欧盟</option>
              <option value="SEA">东南亚</option>
              <option value="MIDDLE_EAST">中东</option>
            </select>
          </label>
          <label>
            贸易术语
            <select v-model="incoterm">
              <option value="EXW">EXW</option>
              <option value="FOB">FOB</option>
              <option value="CIF">CIF</option>
              <option value="DDP">DDP</option>
            </select>
          </label>
          <label class="check">
            <input v-model="containsBattery" type="checkbox" />
            带电池产品
          </label>
          <label class="check">
            <input v-model="hasTrademark" type="checkbox" />
            含品牌授权链路
          </label>
        </div>
      </article>

      <article class="panel result-panel">
        <h2>报价结果</h2>
        <div class="kpi-grid">
          <div class="kpi">
            <p>EXW</p>
            <strong>¥{{ quote.exwCny }}</strong>
          </div>
          <div class="kpi">
            <p>FOB</p>
            <strong>${{ quote.fobUsd }}</strong>
          </div>
          <div class="kpi">
            <p>CIF</p>
            <strong>${{ quote.cifUsd }}</strong>
          </div>
          <div class="kpi">
            <p>到岸成本</p>
            <strong>${{ quote.landedUsd }}</strong>
          </div>
          <div class="kpi">
            <p>建议批发价</p>
            <strong>${{ quote.suggestedWholesaleUsd }}</strong>
          </div>
          <div class="kpi">
            <p>建议零售价</p>
            <strong>${{ quote.suggestedRetailUsd }}</strong>
          </div>
        </div>

        <h3>合规执行清单</h3>
        <ul>
          <li v-for="item in checklist" :key="item">{{ item }}</li>
        </ul>

        <pre>{{ summaryText }}</pre>
        <button @click="copySummary">复制摘要</button>
        <p v-if="copiedTip" class="tip">{{ copiedTip }}</p>
      </article>
    </section>
  </main>
</template>

<style scoped>
.export-lab {
  width: 100%;
  display: grid;
  gap: 1rem;
  animation: rise-in 0.6s ease both;
}

.hero {
  padding: 1.3rem;
  border: 1px solid rgba(255, 214, 167, 0.33);
  border-radius: 18px;
  color: #fff6eb;
  background: radial-gradient(
      circle at 80% 12%,
      rgba(255, 175, 103, 0.34),
      transparent 35%
    ),
    radial-gradient(
      circle at 10% 86%,
      rgba(118, 219, 201, 0.25),
      transparent 36%
    ),
    linear-gradient(136deg, #32170b, #3e2620 48%, #18364a);
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 12px;
  opacity: 0.85;
}

.hero h1 {
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  margin: 0.35rem 0 0.55rem;
}

.workspace {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.panel {
  border-radius: 16px;
  border: 1px solid var(--color-border);
  background: var(--surface-glass);
  backdrop-filter: blur(8px);
  padding: 1rem;
}

.form-grid,
.control-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.65rem;
  margin-top: 0.7rem;
}

label {
  display: grid;
  gap: 0.3rem;
}

input,
select {
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 0.52rem;
  background: rgba(7, 19, 35, 0.56);
  color: var(--color-text);
}

.check {
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 0.5rem;
}

.check input {
  width: 16px;
  height: 16px;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.55rem;
}

.kpi {
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 0.65rem;
  background: rgba(7, 24, 43, 0.5);
}

.kpi p {
  font-size: 12px;
  opacity: 0.82;
}

.kpi strong {
  font-size: 1.15rem;
}

ul {
  margin: 0.7rem 0;
  padding-left: 1.2rem;
}

li + li {
  margin-top: 0.35rem;
}

pre {
  margin: 0.7rem 0;
  white-space: pre-wrap;
  border: 1px dashed var(--color-border-hover);
  border-radius: 10px;
  padding: 0.75rem;
  background: rgba(2, 14, 29, 0.5);
}

button {
  border: 1px solid rgba(255, 184, 125, 0.46);
  border-radius: 999px;
  padding: 0.4rem 0.85rem;
  background: rgba(89, 44, 26, 0.55);
  color: #ffedda;
  cursor: pointer;
}

.tip {
  margin-top: 0.5rem;
  color: #9cf7bc;
}

@media (min-width: 960px) {
  .workspace {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }

  .form-grid,
  .control-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
