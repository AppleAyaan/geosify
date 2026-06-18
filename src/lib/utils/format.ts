export function formatCurrency(value: number): string {
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `$${Math.round(value / 1_000)}K`;
  }
  return `$${value.toLocaleString()}`;
}

export function formatCurrencyRange(min: number, max: number): string {
  return `${formatCurrency(min)} – ${formatCurrency(max)}`;
}

export function formatAcreage(acres: number): string {
  return `${acres.toFixed(acres < 10 ? 1 : 0)} ac`;
}

export function formatScore(score: number): string {
  return Math.round(score).toString();
}
