export const displayMoney = (n) => {
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "ETB",
  });

  // or use toLocaleString()
  return format.format(n);
};
