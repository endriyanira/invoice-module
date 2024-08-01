import React, { useState } from "react";
import {
  Autocomplete,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CardMedia,
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

  const [items, setItems] = useState([
    { name: "", picture: "", quantity: 1, price: 0, totalPrice: 0 },
  ]);

  const [newItem, setNewItem] = useState({
    name: "",
    quantity: 1,
    price: 0,
    totalPrice: 0,
  });

  //   Handle change for customer name, salesperson, payment type, notes
  const handleInputChange = (e, field) => {
    setInvoice({ ...invoice, [field]: e.target.value });
  };

  const handleChangeItemProduct = (e, value, index) => {
    if (value) {
      const name = value.name;
      const picture = value.picture;
      const price = value.price;
      const updatedItems = [...items];
      updatedItems[index].name = name;
      updatedItems[index].picture = picture;
      updatedItems[index].price = price;
      updatedItems[index].totalPrice =
        parseFloat(price) * parseFloat(updatedItems[index].quantity);
      setItems(updatedItems);
    }
  };

  const handleChangeQuantity = (e, index) => {
    const updatedItems = [...items];
    updatedItems[index].quantity = e.target.value;
    updatedItems[index].totalPrice =
      parseFloat(updatedItems[index].price) *
      parseFloat(updatedItems[index].quantity);
    setItems(updatedItems);
  };

  const handleChangeItem = (e, field) => {
    setNewItem({
      ...newItem,
      [field]: e.target.value,
    });

    if (field === "quantity") {
      const price = newItem.price;
      const qty = newItem.quantity;
      console.log(price);
      console.log(qty);
    }
  };

  const handleAddItem = () => {
    // concat
    setItems([...items, newItem]);
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
    <Card variant="outlined">
      <CardContent>
        <Typography gutterBottom paddingBottom={2} variant="h5" component="div">
          Invoice Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Date */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoItem>
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
              onChange={(e) => handleInputChange(e, "customerName")}
              required
            />

            {/* Salesperson Name */}
            <TextField
              label="Salesperson Name"
              name="salespersonName"
              value={invoice.salespersonName}
              onChange={(e) => handleInputChange(e, "salespersonName")}
            />

            {/* Payment Type */}
            <TextField
              label="Payment Type"
              name="paymentType"
              value={invoice.paymentType}
              onChange={(e) => handleInputChange(e, "paymentType")}
              required
            />

            {/* Notes */}
            <TextField
              label="Notes"
              name="notes"
              value={invoice.notes}
              multiline
              rows={4}
              onChange={(e) => handleInputChange(e, "notes")}
            />
          </Box>

          <Box marginTop={3} borderRadius={1}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Items</TableCell>
                    <TableCell align="left">Price</TableCell>
                    <TableCell align="left">Qty</TableCell>
                    <TableCell align="left">Total</TableCell>
                    <TableCell align="left">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((row, index) => (
                    <TableRow
                      key={index.toString()}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Grid item xs={3}>
                          <Autocomplete
                            id="product-input"
                            options={products}
                            getOptionLabel={(option) => option.name}
                            onChange={(e, value) =>
                              handleChangeItemProduct(e, value, index)
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Product"
                                variant="outlined"
                              />
                            )}
                          />
                        </Grid>
                      </TableCell>

                      {/* Price */}
                      <TableCell align="right">
                        <Grid item xs={3}>
                          <TextField
                            fullWidth
                            disabled
                            type="text"
                            value={row.price}
                            onChange={(event) =>
                              handleChangeItem(event, "price")
                            }
                          />
                        </Grid>
                      </TableCell>

                      {/* Quantity */}
                      <TableCell align="right">
                        <Grid item xs={3}>
                          <TextField
                            fullWidth
                            type="number"
                            value={row.quantity}
                            onChange={(event) =>
                              handleChangeQuantity(event, index)
                            }
                          />
                        </Grid>
                      </TableCell>
                      <TableCell align="left">
                        Rp{" "}
                        {row.totalPrice
                          ? parseFloat(row.totalPrice).toFixed(2)
                          : "0"}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleRemoveItem(index)}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {/* <Grid container spacing={2}>
              <Grid item xs={3}>
                <Autocomplete
                  id="product-input"
                  options={products}
                  getOptionLabel={(option) => option.name}
                  onChange={handleChangeItemProduct}
                  renderInput={(params) => (
                    <TextField {...params} label="Product" variant="outlined" />
                  )}
                />
              </Grid>

              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="text"
                  value={newItem.quantity}
                  onChange={(event) => handleChangeItem(event, "quantity")}
                />
              </Grid>

              <Grid item xs={3}>
                <TextField
                  fullWidth
                  type="number"
                  value={newItem.totalPrice}
                  onChange={(event) => handleChangeItem(event, "totalPrice")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">Rp</InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  //   label="Qty"
                  type="text"
                  value={newItem.quantity}
                  onChange={(event) => handleChangeItem(event, "quantity")}
                />
              </Grid>
            </Grid> */}
            {/* </Box> */}
          </Box>
          <Grid item xs={3} paddingY={2}>
            <Button variant="contained" onClick={handleAddItem}>
              Add Item
            </Button>
          </Grid>

          {/* {items.length !== 0 &&
            items.map((item, index) => (
              <Grid item xs={12} key={index}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={3}>
                    <Typography variant="body1">{item.name}</Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography variant="body1">{item.quantity}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="body1">${item.totalPrice}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="body1">
                      $
                      {(
                        parseFloat(item.quantity) * parseFloat(item.price)
                      ).toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleRemoveItem(index)}
                    >
                      Remove
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            ))} */}

          <Button type="submit">Create Invoice</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddInvoice;
