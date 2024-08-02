const getInvoiceTotalAmount = (items) => {
  let amount = 0;
  for (const item of items) {
    const { totalPrice, quantity } = item;
    amount += totalPrice * quantity;
  }
  return amount;
};

const getDateFromISOString = (isoString) => {
  const date = new Date(isoString);

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

module.exports = {
  getInvoiceTotalAmount,
  getDateFromISOString,
};
