import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import InvoiceCard from "./InvoiceCard";
import { fetchInvoicesData } from "../api";
import Paginate from "./Paginate";
import { resetState } from "../redux/actions";

const InvoicesList = () => {
  const dispatch = useDispatch();
  const invoices = useSelector((state) => state.invoices);
  const loadingFetchInvoice = useSelector(
    (state) => state.loading_fetch_invoices
  );
  const errorFetchInvoice = useSelector((state) => state.error_fetch_invoices);

  useEffect(() => {
    dispatch(resetState());
    dispatch(fetchInvoicesData());
  }, [dispatch]);

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
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          width: "100%",
        }}
      >
        <Card
          sx={{
            width: "100%",
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" component="h2" mb={2}>
                Invoice List
              </Typography>
              <Link to="/invoices/add">
                <Button variant="contained" color="primary">
                  Add Invoice
                </Button>
              </Link>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {invoices.map((invoice, i) => (
                <InvoiceCard
                  key={`invoice-key:${i.toString()}`}
                  invoice={invoice}
                />
              ))}
            </Box>
          </CardContent>
        </Card>
        <Paginate />
      </Box>
    </Box>
  );
};

export default InvoicesList;
