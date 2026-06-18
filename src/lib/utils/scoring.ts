export function getScoreColor(score: number): string {
  if (score >= 75) return "#16A34A";
  if (score >= 55) return "#D97706";
  return "#DC2626";
}

export function getScoreLabel(score: number): string {
  if (score >= 75) return "Strong";
  if (score >= 55) return "Moderate";
  return "Cautious";
}

export function computeScore(breakdown: {
  location: number;
  zoning: number;
  price: number;
  developmentPotential: number;
}): number {
  return (
    breakdown.location * 0.3 +
    breakdown.zoning * 0.25 +
    breakdown.price * 0.25 +
    breakdown.developmentPotential * 0.2
  );
}
