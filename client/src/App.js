import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InvoicesList from "./components/InvoicesList";
import store from "./redux/store";
import Navbar from "./components/Navbar";
import "./App.css";
import AddInvoice from "./components/AddInvoice";

const App = () => {
  return (
    <Provider store={store}>
      <Navbar />
      <Router>
        <Routes>
          <Route exact path="/" Component={InvoicesList} />
          <Route exact path="/invoices/add" Component={AddInvoice} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
