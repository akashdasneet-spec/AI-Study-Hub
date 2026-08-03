export function generateCorrelationId(): string {
  return `corr-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
