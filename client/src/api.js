import axios from "axios";

const API_BASE_URL = "localhost:3000";

// Get all invoices
export const getAllInvoices = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: `${API_BASE_URL}/invoices`,
    });
    if (!response.ok) {
      throw Error(response.status + " " + response.statusText);
    }
    if (!response.body) {
      throw Error("ReadableStream not yet supported in this browser.");
    }
    return response.data;
  } catch (error) {
    console.log("Error fetching data:", error);
    return false;
  }
};

export const createInvoice = async (invoice, items) => {
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
      url: `${API_BASE_URL}/invoices`,
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
