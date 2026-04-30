export interface OverseasQuoteInput {
  productCostCny: number;
  domesticLogisticsCny: number;
  oceanFreightUsd: number;
  insuranceUsd: number;
  platformFeeRate: number;
  tariffRate: number;
  marginRate: number;
  exchangeRate: number;
}

export interface OverseasQuoteResult {
  exwCny: number;
  fobUsd: number;
  cifUsd: number;
  landedUsd: number;
  suggestedWholesaleUsd: number;
  suggestedRetailUsd: number;
}

export interface ExportChecklistInput {
  market: "US" | "EU" | "SEA" | "MIDDLE_EAST";
  incoterm: "EXW" | "FOB" | "CIF" | "DDP";
  containsBattery: boolean;
  hasTrademark: boolean;
}

const toSafeNumber = (value: number, fallback = 0): number => {
  if (!Number.isFinite(value)) return fallback;
  return value;
};

const toPercent = (value: number): number =>
  Math.max(0, toSafeNumber(value) / 100);

const round2 = (value: number): number => Math.round(value * 100) / 100;

export function calculateOverseasQuote(
  input: OverseasQuoteInput
): OverseasQuoteResult {
  const exchangeRate = Math.max(0.0001, toSafeNumber(input.exchangeRate, 7.2));
  const exwCny =
    toSafeNumber(input.productCostCny) +
    toSafeNumber(input.domesticLogisticsCny);
  const fobUsd = exwCny / exchangeRate;
  const cifUsd =
    fobUsd +
    toSafeNumber(input.oceanFreightUsd) +
    toSafeNumber(input.insuranceUsd);
  const landedUsd = cifUsd * (1 + toPercent(input.tariffRate));
  const operatingCostUsd = landedUsd * (1 + toPercent(input.platformFeeRate));
  const suggestedWholesaleUsd =
    operatingCostUsd * (1 + toPercent(input.marginRate));
  const suggestedRetailUsd = suggestedWholesaleUsd * 1.25;

  return {
    exwCny: round2(exwCny),
    fobUsd: round2(fobUsd),
    cifUsd: round2(cifUsd),
    landedUsd: round2(landedUsd),
    suggestedWholesaleUsd: round2(suggestedWholesaleUsd),
    suggestedRetailUsd: round2(suggestedRetailUsd),
  };
}

export function buildExportChecklist(input: ExportChecklistInput): string[] {
  const list: string[] = [
    "确认 HS Code 与出口退税率",
    `按 ${input.incoterm} 明确卖家/买家成本边界`,
    "准备商业发票、装箱单、合同与报关资料",
    "核对目的港清关时效与查验风险",
  ];

  if (input.market === "US") {
    list.push("美国市场：核对 FCC/FDA 或 CPSC 合规要求");
  }

  if (input.market === "EU") {
    list.push("欧盟市场：核对 CE、RoHS、REACH 与 EPR 责任");
  }

  if (input.market === "SEA") {
    list.push("东南亚市场：确认各国进口许可与本地标签要求");
  }

  if (input.market === "MIDDLE_EAST") {
    list.push("中东市场：确认 SASO/G-Mark 或当地认证要求");
  }

  if (input.containsBattery) {
    list.push("带电产品：准备 UN38.3、MSDS、危包证（如适用）");
  }

  if (input.hasTrademark) {
    list.push("品牌货物：检查目标市场商标注册与授权链路");
  }

  if (input.incoterm === "DDP") {
    list.push("DDP 模式：提前确认进口税号与末端税费代缴责任");
  }

  return list;
}
