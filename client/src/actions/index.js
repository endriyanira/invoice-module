import { ADD_INVOICE, GET_INVOICES, GET_GRAPH_DATA } from "./types";

export const addInvoice = (invoice) => (dispatch) => {
  dispatch({ type: ADD_INVOICE, payload: invoice });
};
