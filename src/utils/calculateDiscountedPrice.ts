export function calculateDiscountedPrice(baseFare: number, percentage: number) {
  const discountAmount = baseFare * (percentage / 100);
  const finalPrice = baseFare - discountAmount;
  const roundedFinalPrice = Math.round(finalPrice);
  const formattedFinalPrice = roundedFinalPrice.toLocaleString();

  const commission = baseFare - roundedFinalPrice;

  return { cm: commission, ap: formattedFinalPrice };
}
