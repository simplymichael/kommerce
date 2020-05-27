export const generateUniqueProductKey = (product) => {
  const { id, color, size } = product;
  return `product_${id}_${color}_${size}`;
};
