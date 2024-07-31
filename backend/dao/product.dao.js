const db = require("../config/db");
const Product = require("../models/product.model");

class ProductDAO {
  getAllProducts = async () => {
    const [rows] = await db.execute("SELECT * FROM products");
    return rows.map(
      (row) => new Product(row.id, row.name, row.picture, row.stock, row.price)
    );
  };
}

module.exports = ProductDAO;
