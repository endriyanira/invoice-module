import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
  OutlinedInput,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import productsJSON from "./products.json";

import {
  changeDate,
  changeCustomerName,
  changeSalesPersonName,
  changePaymentType,
  changeNotes,
  changeItems,
  resetState,
} from "../redux/actions";
import { getDateFromISOString } from "../utils";
import { postInvoice } from "../api";

const products = productsJSON;

const AddInvoice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const invoice = useSelector((state) => state.invoice);
  const loading_create_invoice = useSelector(
    (state) => state.loading_create_invoice
  );
  const create_invoice_success_message = useSelector(
    (state) => state.create_invoice_success_message
  );

  const [items, setItems] = useState([
    { name: "", picture: "", quantity: 1, price: 0, totalPrice: 0 },
  ]);

  const [newItem, setNewItem] = useState({
    name: "",
    quantity: 1,
    price: 0,
    totalPrice: 0,
  });

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
      dispatch(changeItems(updatedItems));
    }
  };

  const handleChangeQuantity = (e, index) => {
    const updatedItems = [...items];
    updatedItems[index].quantity = e.target.value;
    updatedItems[index].totalPrice =
      parseFloat(updatedItems[index].price) *
      parseFloat(updatedItems[index].quantity);
    setItems(updatedItems);
    dispatch(changeItems(updatedItems));
  };

  const handleChangeItem = (e, field) => {
    setNewItem({
      ...newItem,
      [field]: e.target.value,
    });

    if (field === "quantity") {
      const price = newItem.price;
      const qty = newItem.quantity;
    }
  };

  const handleAddItem = () => {
    setItems([...items, newItem]);
    dispatch(changeItems(items));
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
    dispatch(changeItems(items));
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
    dispatch(postInvoice(invoice, items));
    navigate("/");
  };

  useEffect(() => {
    dispatch(resetState());
  }, []);

  return (
    <Box
      sx={{
        padding: "30px",
        mx: "100px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Card variant="outlined">
        <CardContent>
          <Typography
            gutterBottom
            paddingBottom={2}
            variant="h5"
            component="div"
            style={{ fontWeight: "700" }}
          >
            Invoice Form
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
              mb={4}
            >
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                style={{ fontWeight: "500" }}
              >
                Invoice Details
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    gap: "20px",
                  }}
                >
                  {/* Date */}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoItem>
                      <DatePicker
                        label="Date"
                        defaultValue={dayjs(invoice.date)}
                        onChange={(date) =>
                          dispatch(changeDate(getDateFromISOString(date)))
                        }
                        slotProps={{
                          textField: {
                            required: true,
                          },
                        }}
                      />
                    </DemoItem>
                  </LocalizationProvider>
                  {/* Payment Type */}
                  <TextField
                    label="Payment Type"
                    name="paymentType"
                    value={invoice.payment_type}
                    onChange={(e) =>
                      dispatch(changePaymentType(e.target.value))
                    }
                    required
                    fullWidth
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    gap: "20px",
                  }}
                >
                  {/* Customer Name */}
                  <TextField
                    label="Customer Name"
                    name="customerName"
                    value={invoice.customer_name}
                    onChange={(e) =>
                      dispatch(changeCustomerName(e.target.value))
                    }
                    required
                  />

                  {/* Salesperson Name */}
                  <TextField
                    label="Salesperson Name"
                    name="salespersonName"
                    value={invoice.salesperson_name}
                    onChange={(e) =>
                      dispatch(changeSalesPersonName(e.target.value))
                    }
                    required
                  />
                </Box>
              </Box>

              {/* Notes */}
              <TextField
                label="Notes"
                name="notes"
                value={invoice.notes}
                multiline
                rows={4}
                onChange={(e) => dispatch(changeNotes(e.target.value))}
              />
            </Box>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              style={{ fontWeight: "500" }}
            >
              Invoice Items
            </Typography>
            <Box marginTop={2} borderRadius={1}>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Items</TableCell>
                      <TableCell align="left">Price</TableCell>
                      <TableCell align="left">Qty</TableCell>
                      <TableCell align="left">Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.map((row, index) => (
                      <TableRow
                        key={index.toString()}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              gap: "20px",
                            }}
                          >
                            <Button
                              color="error"
                              onClick={() => handleRemoveItem(index)}
                            >
                              <HighlightOffIcon color="error" />
                            </Button>
                            <Autocomplete
                              disablePortal
                              id="product-input"
                              options={products}
                              getOptionLabel={(option) => option.name}
                              onChange={(e, value) =>
                                handleChangeItemProduct(e, value, index)
                              }
                              fullWidth
                              renderInput={(params) => (
                                <MenuItem>
                                  <TextField
                                    {...params}
                                    label="Product"
                                    variant="outlined"
                                  />
                                </MenuItem>
                              )}
                              renderOption={(props, item) => (
                                <Box component="li" {...props}>
                                  <img
                                    src={item.picture}
                                    alt={item.name}
                                    style={{
                                      width: "50px",
                                      height: "50px",
                                      marginRight: "10px",
                                    }}
                                  />
                                  <Grid gap={2}>
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      {item.name}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                    >
                                      Stock: {item.stock}
                                    </Typography>
                                    <Typography variant="body2">
                                      Rp {parseFloat(item.price).toFixed(2)}
                                    </Typography>
                                  </Grid>
                                </Box>
                              )}
                            />
                          </Box>
                        </TableCell>

                        {/* Price */}
                        <TableCell align="left">
                          <OutlinedInput
                            id="outlined-adornment-amount"
                            startAdornment={
                              <InputAdornment position="start">
                                Rp
                              </InputAdornment>
                            }
                            fullWidth
                            value={parseFloat(row.price).toFixed(2)}
                            disabled
                            type="number"
                            onChange={(event) =>
                              handleChangeItem(event, "price")
                            }
                          />
                        </TableCell>

                        {/* Quantity */}
                        <TableCell align="left">
                          <Grid item xs={3}>
                            <TextField
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Grid item xs={3} paddingY={2} mb={3}>
              <Button variant="text" onClick={handleAddItem}>
                <AddCircleOutlineIcon style={{ marginRight: "10px" }} /> Add
                Item
              </Button>
            </Grid>
            {loading_create_invoice ? (
              <Button variant="contained" disabled>
                <CircularProgress size={20} />
                Loading
              </Button>
            ) : (
              <Button variant="contained" type="submit">
                Create Invoice
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddInvoice;
