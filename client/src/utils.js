export const getDate = (isoString) => {
  const date = new Date(isoString);
  const formattedDate = date.toDateString().split(" ").slice(1, 4).join(" ");
  return formattedDate;
};

export const getDateFromISOString = (isoString) => {
  const date = new Date(isoString);

  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const formatCurrency = (amount, currency = "IDR", locale = "id-ID") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
};

export const isEmptyobject = (obj) => {
  if (obj === null || obj === undefined) {
    return true; // Handle null and undefined cases
  }
  return Object.keys(obj).length === 0;
};
