import React from "react";
import {
  Skeleton,
  Stack,
  Box,
  CardContent,
  Card,
  Typography,
} from "@mui/material";

const InvoiceCardSkeleton = () => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Skeleton variant="text" sx={{ width: "300px" }} />
          <Skeleton variant="text" sx={{ width: "300px" }} />
          <Skeleton variant="text" sx={{ width: "300px" }} />
          <Skeleton variant="text" sx={{ width: "300px" }} />
          <Skeleton variant="text" sx={{ width: "300px" }} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default InvoiceCardSkeleton;
