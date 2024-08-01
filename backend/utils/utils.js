const getInvoiceTotalAmount = (items) => {
  let amount = 0;
  for (const item of items) {
    const { totalPrice, quantity } = item;
    amount += totalPrice * quantity;
  }
  return amount;
};

module.exports = {
  getInvoiceTotalAmount,
};
