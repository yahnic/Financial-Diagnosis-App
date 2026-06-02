export const nigeriaInflation = {
  2015: 9.0,
  2016: 15.7,
  2017: 16.5,
  2018: 12.1,
  2019: 11.4,
  2020: 13.2,
  2021: 15.6,
  2022: 21.3,
  2023: 28.9,
  2024: 34.8,
  2025: 31.5,
  2026: 15.5,
};

export function getAverageInflation() {
  const values = Object.values(nigeriaInflation);

  return values.reduce((a, b) => a + b, 0) / values.length;
}
