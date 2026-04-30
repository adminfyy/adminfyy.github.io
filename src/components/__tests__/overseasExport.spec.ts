import { describe, expect, it } from "vitest";

import {
  buildExportChecklist,
  calculateOverseasQuote,
} from "@/utils/overseasExport";

describe("overseas export helpers", () => {
  it("calculates overseas quote metrics", () => {
    const result = calculateOverseasQuote({
      productCostCny: 42,
      domesticLogisticsCny: 8,
      oceanFreightUsd: 0.9,
      insuranceUsd: 0.2,
      platformFeeRate: 12,
      tariffRate: 8,
      marginRate: 20,
      exchangeRate: 7.2,
    });

    expect(result.exwCny).toBe(50);
    expect(result.fobUsd).toBe(6.94);
    expect(result.cifUsd).toBe(8.04);
    expect(result.landedUsd).toBe(8.69);
    expect(result.suggestedWholesaleUsd).toBe(11.68);
    expect(result.suggestedRetailUsd).toBe(14.6);
  });

  it("guards against invalid exchange rate", () => {
    const result = calculateOverseasQuote({
      productCostCny: 20,
      domesticLogisticsCny: 2,
      oceanFreightUsd: 0.5,
      insuranceUsd: 0.1,
      platformFeeRate: 10,
      tariffRate: 5,
      marginRate: 20,
      exchangeRate: 0,
    });

    expect(result.fobUsd).toBeGreaterThan(0);
    expect(Number.isFinite(result.fobUsd)).toBe(true);
  });

  it("builds market and product specific checklist", () => {
    const checklist = buildExportChecklist({
      market: "EU",
      incoterm: "DDP",
      containsBattery: true,
      hasTrademark: true,
    });

    expect(checklist).toContain("欧盟市场：核对 CE、RoHS、REACH 与 EPR 责任");
    expect(checklist).toContain(
      "带电产品：准备 UN38.3、MSDS、危包证（如适用）"
    );
    expect(checklist).toContain("品牌货物：检查目标市场商标注册与授权链路");
    expect(checklist).toContain("DDP 模式：提前确认进口税号与末端税费代缴责任");
  });
});
