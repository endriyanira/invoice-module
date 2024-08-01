import {
  ADD_INVOICE,
  FETCH_INVOICES,
  FETCH_INVOICES_SUCCESS,
  FETCH_INVOICES_FAILURE,
} from "../constants/types";

export const addInvoice = (invoice) => (dispatch) => {
  dispatch({ type: ADD_INVOICE, payload: invoice });
};

export const fetchInvoices = () => {
  return {
    type: FETCH_INVOICES,
  };
};

export const fetchInvoicesSuccess = (invoices) => {
  return {
    type: FETCH_INVOICES_SUCCESS,
    payload: invoices,
  };
};

export const fetchInvoicesFailure = (error) => {
  return {
    type: FETCH_INVOICES_FAILURE,
    payload: error,
  };
};
