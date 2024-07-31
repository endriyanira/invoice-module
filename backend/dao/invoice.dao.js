const db = require("../config/db");
const Invoice = require("../models/invoice.model");

class InvoiceDAO {
  getAllInvoices = async () => {
    const [rows] = await db.execute("SELECT * FROM invoices");
    return rows.map(
      (row) =>
        new Invoice(
          row.invoice_no,
          row.date,
          row.customer_name,
          row.salesperson_name,
          row.paymentType,
          row.notes
        )
    );
  };

  createInvoice = async (invoice) => {
    const { date, customer_name, salesperson_name, payment_type, notes } =
      invoice;
    const query = `INSERT INTO invoices (date,customer_name, salesperson_name, payment_type, notes) VALUES (?,?,?,?,?)`;
    const result = await db.execute(query, [
      date,
      customer_name,
      salesperson_name,
      payment_type,
      notes,
    ]);
    return result.insertId;
  };
}

module.exports = InvoiceDAO;
