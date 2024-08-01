import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

import { getDateFromISOString } from "../utils";

const InvoiceCard = ({ invoice }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        marginY: "20px",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "20px",
            alignItems: "center",
            paddingBottom: "10px",
            borderBottom: "1px solid gray",
          }}
        >
          <Typography variant="body2" component="h2">
            INVOICE #{invoice.id}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "20px",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" component="h2">
              {getDateFromISOString(invoice.date)}
            </Typography>
            <Box
              sx={{
                border: "1px solid green",
                padding: "4px 8px",
                borderRadius: "5px",
              }}
            >
              {" "}
              <Typography variant="body2" component="h2" color={"green"}>
                Paid
              </Typography>
            </Box>
          </Box>
        </Box>
        {/* bawah */}
        <Box sc={{ display: "flex" }}>
          <Typography variant="body2" color="black" mt={2}>
            Customer - {invoice.customer_name}
          </Typography>
          <Typography variant="body2" color="black">
            Salesperson - {invoice.salesperson_name}
          </Typography>

          <Typography variant="body2" color="black" mt={3}>
            Notes:
            <Typography variant="body2" color="grey">
              {invoice.notes}
            </Typography>
          </Typography>

          <Typography variant="body2" color="black" mt={3}>
            Total Amount:
            <Typography variant="body2" color="grey">
              Rp 200.000,00
            </Typography>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default InvoiceCard;
