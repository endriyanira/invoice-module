class InvoiceProduct {
  constructor(id, invoice_no, name, quantity, totalPrice) {
    this.id = id;
    this.invoice_no = invoice_no;
    this.name = name;
    this.quantity = quantity;
    this.totalPrice = totalPrice;
  }
}

module.exports = InvoiceProduct;
