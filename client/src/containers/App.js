import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddInvoice from "../components/AddInvoice";
import Invoices from "../components/Invoices";
import InvoiceCard from "../components/InvoiceCard";
import TimeSeriesGraph from "../components/TimeSeriesGraph";

const Apppp = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Invoices />} />
        <Route exact path="/invoices/add" element={<AddInvoice />} />
        <Route exact path="/invoices" element={<InvoiceCard />} />
        <Route exact path="/graph" element={<TimeSeriesGraph />} />
      </Routes>
    </Router>
  );
};

export default Apppp;
