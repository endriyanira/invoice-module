const express = require("express");
const router = express.Router();
const cors = require("cors");

const InvoiceDAO = require("../dao/invoice.dao");

router.use(cors());

router.get("/", async (req, res) => {
  try {
    const invoiceDAO = new InvoiceDAO();
    const dailyRevenue = await invoiceDAO.getDailyRevenue();
    const monthLyRevenue = await invoiceDAO.getMonthlyRevenue();
    res.json({
      daily_revenue: dailyRevenue,
      monthly_revenue: monthLyRevenue,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching revenue" });
  }
});

module.exports = router;
