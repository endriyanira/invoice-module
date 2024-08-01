import React, { useState } from "react";
import {
  Autocomplete,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import productsJSON from "./products.json";

const products = productsJSON;

const AddInvoice = () => {
  const [invoice, setInvoice] = useState({
    date: new Date(),
    customerName: "",
    salespersonName: "",
    paymentType: "",
    notes: "",
    items: [],
  });
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: 1,
    price: 0,
  });

  //   Handle change for customer name, salesperson, payment type, notes
  const handleInputChange = (e) => {
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  };

  const handleProductSelect = (e, value) => {
    setInvoice({ ...invoice, items: [...invoice.products, value] });
  };

  const handleChangeItem = (e, field) => {
    setNewItem({ ...newItem, [field]: e.target.value });
  };

  const handleAddItem = () => {
    setItems([...items, newItem]);
    setNewItem({ name: "", quantity: 1, price: 0 });
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const calculateTotalPrice = () => {
    let total = 0;
    for (const item of items) {
      const itemTotal = parseFloat(item.quantity) * parseFloat(item.price);
      total += itemTotal;
    }
    return total;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // POST API call to save the invoice to database
    fetch("/localhost:3000/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invoice),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <Card variant="outlined" sx={{ maxWidth: 500 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Invoice
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Date */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoItem label="Responsive variant">
              <DatePicker
                label="Date"
                defaultValue={dayjs(invoice.date)}
                onChange={(newValue) =>
                  setInvoice({ ...invoice, date: newValue })
                }
                required
              />
            </DemoItem>
          </LocalizationProvider>

          {/* Customer Name */}
          <TextField
            label="Customer Name"
            name="customerName"
            value={invoice.customerName}
            onChange={handleInputChange}
            required
          />

          {/* Salesperson Name */}
          <TextField
            label="Salesperson Name"
            name="salespersonName"
            value={invoice.salespersonName}
            onChange={handleInputChange}
          />

          {/* Notes */}
          <TextField
            label="Notes"
            name="notes"
            value={invoice.notes}
            onChange={handleInputChange}
          />

          {/* Payment Type */}
          <TextField
            label="Payment Type"
            name="paymentType"
            value={invoice.paymentType}
            onChange={handleInputChange}
          />

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">Add Invoice Items</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              id="product-input"
              options={products}
              getOptionLabel={(option) => option.name}
              onChange={handleProductSelect}
              renderInput={(params) => (
                <TextField {...params} label="Product" variant="outlined" />
              )}
            />
            {/* <TextField
              fullWidth
              label="Item"
              value={newItem.name}
                onChange={(event) => handleChange(event, "name")}
            /> */}
          </Grid>
          <Autocomplete
            id="product-input"
            options={products}
            getOptionLabel={(option) => option.name}
            onChange={handleProductSelect}
            renderInput={(params) => (
              <TextField {...params} label="Product" variant="outlined" />
            )}
          />
          <Button type="submit">Add Invoice</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddInvoice;
