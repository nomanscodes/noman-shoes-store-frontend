export const getDiscountedPriceParcentage = (
  originalPrice,
  discountedPrice
) => {
  const discount = originalPrice - discountedPrice;

  const discountedParcentage = (discount / originalPrice) * 100;
  return discountedParcentage.toFixed(2);
};
