export const fxHistory = {
  2015: 199,
  2016: 305,
  2017: 360,
  2018: 362,
  2019: 361,
  2020: 380,
  2021: 410,
  2022: 470,
  2023: 760,
  2024: 1480,
  2025: 1520,
  2026: 1375,
};

export function getFxGrowth() {
  const years = Object.keys(fxHistory);

  const first = fxHistory[years[0]];
  const last = fxHistory[years[years.length - 1]];

  return (((last - first) / first) * 100).toFixed(2);
}
