import axios from "axios";
import {
  fetchInvoices,
  fetchInvoicesSuccess,
  fetchInvoicesFailure,
} from "./redux/actions";

const API_BASE_URL = "http://localhost:3000/api";

// Get all invoices
export const fetchInvoicesData = (page) => async (dispatch) => {
  dispatch(fetchInvoices());
  const url = `${API_BASE_URL}/invoices?page=${page}&per_page=10`;
  try {
    const response = await axios({
      method: "GET",
      url: url,
    });

    if (response.status !== 200) {
      throw Error(response.status + " " + response.statusText);
    }
    dispatch(fetchInvoicesSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(fetchInvoicesFailure(error.message));
    return false;
  }
};

export const createInvoice = async (invoice, items, page) => {
  try {
    const payload = {
      date: invoice.date,
      customer_name: invoice.customerName,
      salesperson_name: invoice.salesperson_name,
      payment_type: invoice.paymentType,
      notes: invoice.notes,
      items: items,
    };

    const response = await axios({
      method: "POST",
      url: `${API_BASE_URL}/invoices/page=${page}/per_page=${10}`,
      data: payload,
    });

    if (!response.ok) {
      throw Error(response.status + " " + response.statusText);
    }
    if (!response.body) {
      throw Error("ReadableStream not yet supported in this browser.");
    }
    return true;
  } catch (error) {
    console.log("Error fetching data:", error);
    return false;
  }
};
