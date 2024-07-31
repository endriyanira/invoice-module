class Invoice {
  constructor(id, date, customer, salesperson, paymentType, notes) {
    this.id = id;
    this.date = date;
    this.customer_name = customer;
    this.salesperson_name = salesperson;
    this.payment_type = paymentType;
    this.notes = notes;
  }
}

module.exports = Invoice;
