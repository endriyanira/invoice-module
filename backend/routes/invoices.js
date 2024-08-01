const express = require("express");
const router = express.Router();
const cors = require("cors");
const db = require("../config/db");

const Invoice = require("../models/invoice.model");
const InvoiceDAO = require("../dao/invoice.dao");
const InvoiceProductDAO = require("../dao/invoiceproduct.dao");

router.use(cors());

/* GET invoices listing */
router.get("/", async (req, res) => {
  const { page, perPage } = req.query;
  const currentPage = parseInt(page, 10) || 1;
  const perPageLimit = parseInt(perPage, 10) || 10;

  try {
    const invoiceDAO = new InvoiceDAO();
    const invoices = await invoiceDAO.getAllInvoices(currentPage, perPageLimit);

    res.json(invoices);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching invoices",
    });
  }
});

/* GET invoices by id */
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const invoiceDAO = new InvoiceDAO();
    const invoiceWithProducts = await invoiceDAO.getInvoice(id);
    res.json(invoiceWithProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching invoice",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const invoiceDAO = new InvoiceDAO();
    const invoiceId = await invoiceDAO.createInvoice(req.body);
    const { items } = req.body;

    for (const item of items) {
      const invoiceProductDAO = new InvoiceProductDAO();
      await invoiceProductDAO.createInvoiceProduct(invoiceId, item);
    }

    res.status(201).send({
      message: "Invoice created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating invoice" });
  }
});

module.exports = router;
