const db = require("../config/db");

class InvoiceProductDAO {
  createInvoiceProduct = async (invoiceId, invoiceProduct) => {
    const { name, quantity, totalPrice } = invoiceProduct;
    const query = `INSERT INTO invoice_products (invoice_no, name, quantity, totalPrice) VALUES (?, ?, ?, ?)`;
    const values = [invoiceId, name, quantity, totalPrice];
    await db.execute(query, values);
  };
}

module.exports = InvoiceProductDAO;
