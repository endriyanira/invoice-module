const db = require("../config/db");
const Invoice = require("../models/invoice.model");

class InvoiceDAO {
  getAllInvoices = async (page, perPage) => {
    const offset = (page - 1) * perPage;
    const query = `SELECT * FROM invoices LIMIT ${perPage} OFFSET ${offset}`;
    const [rows] = await db.execute(query);

    // Get the total count of invoices
    const [totalCount] = await db.execute(
      "SELECT COUNT(*) AS count FROM invoices"
    );
    const totalCountValue = totalCount[0].count;

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCountValue / perPage);
    const currentPage = page;
    const hasNextPage = currentPage < totalPages;
    const hasPreviousPage = currentPage > 1;

    // Return the pagination metadata along with the invoices
    return {
      invoices: rows,
      pagination: {
        totalCount: totalCountValue,
        totalPages,
        currentPage,
        hasNextPage,
        hasPreviousPage,
      },
    };
  };

  getInvoice = async (id) => {
    const invoiceQuery = `SELECT * FROM invoices WHERE id = ?`;
    const [invoiceRows] = await db.execute(invoiceQuery, [id]);
    const invoice = invoiceRows[0];
    const query = `
    SELECT 
      ip.invoice_no,
      ip.quantity,
      ip.name,
      ip.totalPrice
    FROM 
      invoices i
    LEFT JOIN 
      invoice_products ip ON i.id = ip.invoice_no
    WHERE 
      i.id = ?
  `;
    const [rows] = await db.execute(query, [id]);
    console.log(invoice);
    return {
      ...invoice,
      products: [rows],
    };
  };

  createInvoice = async (invoice) => {
    const { date, customer_name, salesperson_name, payment_type, notes } =
      invoice;
    console.log(invoice);
    const query = `INSERT INTO invoices (date, customer_name, salesperson_name, payment_type, notes) VALUES (?, ?, ?, ?, ?)`;
    const values = [date, customer_name, salesperson_name, payment_type, notes];
    const result = await db.execute(query, values);
    return result[0].insertId;
  };
}

module.exports = InvoiceDAO;
