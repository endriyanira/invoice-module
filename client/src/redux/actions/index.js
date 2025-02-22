import {
  RESET_STATE,
  FETCH_INVOICES,
  FETCH_INVOICES_SUCCESS,
  FETCH_INVOICES_FAILURE,
  CHANGE_DATE,
  CHANGE_CUSTOMER_NAME,
  CHANGE_SALESPERSON_NAME,
  CHANGE_PAYMENT_TYPE,
  CHANGE_NOTES,
  CHANGE_ITEMS,
  CREATE_INVOICE,
  CREATE_INVOICE_SUCCESS,
  CREATE_INVOICE_FAILURE,
} from "../constants/types";

export const resetState = () => {
  return {
    type: RESET_STATE,
  };
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

export const changeDate = (date) => {
  return {
    type: CHANGE_DATE,
    payload: date,
  };
};

export const changeCustomerName = (customerName) => {
  return {
    type: CHANGE_CUSTOMER_NAME,
    payload: customerName,
  };
};

export const changeSalesPersonName = (salesPersonName) => {
  return {
    type: CHANGE_SALESPERSON_NAME,
    payload: salesPersonName,
  };
};

export const changePaymentType = (paymentType) => {
  return {
    type: CHANGE_PAYMENT_TYPE,
    payload: paymentType,
  };
};

export const changeNotes = (notes) => {
  return {
    type: CHANGE_NOTES,
    payload: notes,
  };
};

export const changeItems = (items) => {
  return {
    type: CHANGE_ITEMS,
    payload: items,
  };
};

export const createInvoice = () => {
  return {
    type: CREATE_INVOICE,
  };
};

export const createInvoiceSuccess = (data) => {
  return {
    type: CREATE_INVOICE_SUCCESS,
    payload: data,
  };
};

export const createInvoiceFailure = (error) => {
  return {
    type: CREATE_INVOICE_FAILURE,
    payload: error,
  };
};
