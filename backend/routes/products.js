const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");

router.use(bodyParser.json());
router.use(cors());

const products = require("../data/products.json");

/* GET products listing */
router.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.json(products);
});

module.exports = router;
