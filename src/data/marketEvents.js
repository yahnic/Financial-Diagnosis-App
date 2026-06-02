export const marketEvents = [
  {
    title: "Bull Market",

    multiplier: 1.15,

    affected: ["NGX Stocks", "US Stocks", "ETF", "Crypto"],
  },

  {
    title: "Market Crash",

    multiplier: 0.7,

    affected: ["NGX Stocks", "US Stocks", "Crypto"],
  },

  {
    title: "Naira Devaluation",

    multiplier: 1.25,

    affected: ["Dollar Savings", "US Stocks", "ETF", "Eurobond"],
  },

  {
    title: "Interest Rate Hike",

    multiplier: 1.15,

    affected: ["Treasury Bills", "MMF", "Commercial Paper"],
  },

  {
    title: "Property Boom",

    multiplier: 1.2,

    affected: ["Real Estate", "REIT"],
  },
];
