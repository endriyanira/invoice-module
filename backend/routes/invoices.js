const express = require("express");
const router = express.Router();
const cors = require("cors");
const db = require("../config/database");

const InvoiceDAO = require("../dao/invoice.dao");

router.use(cors());

/* GET invoices listing */
router.get("/", async (req, res) => {
  try {
    const invoiceDAO = new InvoiceDAO();
    const invoices = await invoiceDAO.getAllInvoices();
    res.json(invoices);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching invoices",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const invoiceDAO = new InvoiceDAO();
    const invoice = await invoiceDAO.createInvoice(req.body);

    // items.forEach(async (item) => {
    //   const query = `INSERT INTO invoice_items (invoice_id, item_name, quantity, price) VALUES (?, ?, ?, ?)`;
    //   const values = [invoiceId, item.name, item.quantity, item.price];
    //   await db.execute(query, values);
    // });

    res.status(201).send({
      message: "Invoice created successfully",
      data: invoice,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating invoice" });
  }
});

module.exports = router;
