export function getOrdinalSuffix(number: number): string {
  const suffixes: string[] = ['st', 'nd', 'rd'];
  const remainder: number = number % 10;
  return (
    suffixes[((number % 100) - 20) % 10] || suffixes[remainder - 1] || 'th'
  );
}
