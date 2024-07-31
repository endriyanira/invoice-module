const db = require("./config/db");

const createProductsTable = async () => {
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        picture VARCHAR(255),
        stock INT NOT NULL,
        price DECIMAL(10, 2),
        PRIMARY KEY (id)
      );
    `);
    console.log("Table created successfully!");
  } catch (error) {
    console.error("Error creating table:", error);
  }
};

const createInvoicesTable = async () => {
  try {
    await db.execute(`
      CREATE TABLE invoices (
        invoice_no INT PRIMARY KEY AUTO_INCREMENT,
        date DATE NOT NULL,
        customer_name VARCHAR(255) NOT NULL,
        salesperson_name VARCHAR(255) NOT NULL,
        payment_type VARCHAR(255) NOT NULL,
        notes TEXT
      );
    `);
    console.log("Table created successfully!");
  } catch (error) {
    console.error("Error creating table:", error);
  }
};

const createInvoiceProducts = async () => {
  try {
    await db.execute(`
       CREATE TABLE invoice_products (
        id INT PRIMARY KEY AUTO_INCREMENT,
        invoice_no INT NOT NULL,
        product_no INT NOT NULL,
        quantity INT NOT NULL,
        FOREIGN KEY (invoice_no) REFERENCES invoices(invoice_no),
        FOREIGN KEY (product_no) REFERENCES products(id)
      );
      `);
    console.log("Table created successfully!");
  } catch (error) {
    console.error("Error creating table:", error);
  }
};

// createProductsTable();
// createInvoicesTable();
createInvoiceProducts();
