import axios from "axios";
import { getDateFromISOString } from "./utils";
import {
  fetchInvoices,
  fetchInvoicesSuccess,
  fetchInvoicesFailure,
} from "./redux/actions";

const API_BASE_URL = "http://localhost:3000/api";

// Get all invoices
export const fetchInvoicesData = (page) => async (dispatch) => {
  dispatch(fetchInvoices());
  const url = `${API_BASE_URL}/invoices?page=${
    page !== undefined ? page : "1"
  }&per_page=10`;
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

export const createInvoice = async (invoice, items) => {
  try {
    const payload = {
      date: getDateFromISOString(invoice.date),
      customer_name: invoice.customer_name,
      salesperson_name: invoice.salesperson_name,
      payment_type: invoice.payment_type,
      notes: invoice.notes,
      items,
    };
    console.log(payload);

    const response = await axios({
      method: "POST",
      url: `${API_BASE_URL}/invoices`,
      data: payload,
    });

    if (!response.ok) {
      throw Error(response.status + " " + response.statusText);
    }
    return response.data;
  } catch (error) {
    console.log("Error fetching data:", error);
    return false;
  }
};
