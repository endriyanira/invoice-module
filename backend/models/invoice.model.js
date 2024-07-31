class Invoice {
  constructor(invoiceNo, date, customer, salesperson, paymentType, notes) {
    this.invoice_no = invoiceNo;
    this.date = date;
    this.customer_name = customer;
    this.salesperson_name = salesperson;
    this.paymentType = paymentType;
    this.notes = notes;
  }
}

module.exports = Invoice;
