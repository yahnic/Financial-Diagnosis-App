export function generateStockAdvice({ action, stock, portfolio, marketPhase }) {
  const advice = [];

  // Calculate total portfolio value
  const total = Object.values(portfolio).reduce((a, b) => a + b, 0);

  // Calculate sector exposures dynamically
  const exposures = Object.entries(portfolio).reduce((acc, [sector, value]) => {
    acc[sector] = (value / total) * 100;
    return acc;
  }, {});

  const bankingExposure = exposures.Banking || 0;
  const agricultureExposure = exposures.Agriculture || 0;
  const techExposure = exposures.Tech || 0;
  const consumerGoodsExposure = exposures.ConsumerGoods || 0;
  const industrialExposure = exposures.Industrial || 0;
  const oilGasExposure = exposures.OilGas || 0;
  const healthcareExposure = exposures.Healthcare || 0;
  const insuranceExposure = exposures.Insurance || 0;
  const telecomExposure = exposures.Telecom || 0;
  const utilityExposure = exposures.Utility || 0;
  const realEstateExposure = exposures.RealEstate || 0;
  const transportationExposure = exposures.Transportation || 0;
  const materialsExposure = exposures.Materials || 0;

  /* =====================
  TRADE EXPLANATION
  ===================== */
  if (action === "BUY") {
    advice.push(
      `Buying ${stock.symbol} increases your exposure to the ${stock.sector} sector.`,
    );
  }

  if (action === "SELL") {
    advice.push(
      `Selling ${stock.symbol} reduces your exposure to the ${stock.sector} sector.`,
    );
  }

  /* =====================
  CONCENTRATION RISK
  ===================== */
  if (bankingExposure > 40) {
    advice.push(
      `Banking now represents ${Math.round(
        bankingExposure,
      )}% of your portfolio. Consider diversifying into other sectors.`,
    );
  }

  if (agricultureExposure > 40) {
    advice.push(
      `You are heavily exposed to agriculture (${Math.round(
        agricultureExposure,
      )}%). Palm oil prices could significantly affect your returns.`,
    );
  }

  if (techExposure > 40) {
    advice.push(
      `Your technology allocation (${Math.round(
        techExposure,
      )}%) is becoming concentrated. Diversification may reduce risk.`,
    );
  }

  if (consumerGoodsExposure > 40) {
    advice.push(
      `Consumer Goods represents ${Math.round(
        consumerGoodsExposure,
      )}% of your portfolio. Consider balancing your sectors.`,
    );
  }

  if (industrialExposure > 40) {
    advice.push(
      `Industrial exposure is high at ${Math.round(
        industrialExposure,
      )}%. Diversify carefully.`,
    );
  }

  if (oilGasExposure > 40) {
    advice.push(
      `Energy sector (Oil & Gas) exposure is ${Math.round(
        oilGasExposure,
      )}%. Watch commodity price risk.`,
    );
  }

  if (healthcareExposure > 40) {
    advice.push(
      `Healthcare allocation is ${Math.round(
        healthcareExposure,
      )}%, which is concentrated.`,
    );
  }

  if (insuranceExposure > 40) {
    advice.push(
      `Insurance sector exposure is ${Math.round(
        insuranceExposure,
      )}%. Consider reducing concentration risk.`,
    );
  }

  if (telecomExposure > 40) {
    advice.push(
      `Telecom sector exposure is ${Math.round(
        telecomExposure,
      )}%. Diversification recommended.`,
    );
  }

  if (utilityExposure > 40) {
    advice.push(
      `Utility sector exposure is ${Math.round(
        utilityExposure,
      )}%. Heavy concentration may be risky.`,
    );
  }

  if (realEstateExposure > 40) {
    advice.push(
      `Real Estate exposure is ${Math.round(
        realEstateExposure,
      )}%. Diversify to reduce risk.`,
    );
  }

  if (transportationExposure > 40) {
    advice.push(
      `Transportation sector exposure is ${Math.round(
        transportationExposure,
      )}%. Consider spreading risk.`,
    );
  }

  if (materialsExposure > 40) {
    advice.push(
      `Materials sector is ${Math.round(
        materialsExposure,
      )}% of your portfolio. Diversification is advised.`,
    );
  }

  /* =====================
  MARKET PHASE COACHING
  ===================== */
  if (marketPhase === "Expansion") {
    advice.push(
      "Growth assets typically perform well during expansion phases.",
    );
  }

  if (marketPhase === "Peak") {
    advice.push("Market peaks often reward caution and rebalancing.");
  }

  if (marketPhase === "Recession") {
    advice.push(
      "During recessions, defensive assets and cash become more valuable.",
    );
  }

  if (marketPhase === "Recovery") {
    advice.push(
      "Recovery phases often reward investors who accumulated quality assets during downturns.",
    );
  }

  return advice;
}
