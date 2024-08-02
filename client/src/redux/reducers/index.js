import {
  ADD_INVOICE,
  FETCH_INVOICES,
  FETCH_INVOICES_SUCCESS,
  FETCH_INVOICES_FAILURE,
  CHANGE_DATE,
  CHANGE_CUSTOMER_NAME,
  CHANGE_SALESPERSON_NAME,
  CHANGE_PAYMENT_TYPE,
  CHANGE_NOTES,
} from "../constants/types";

const initialState = {
  invoices: [],
  loading_fetch_invoices: false,
  error_fetch_invoices: false,
  invoiceData: {
    invoice: {
      date: "",
      customer_name: "",
      salesperson_name: "",
      payment_type: "",
      notes: "",
    },
  },
  items: [],
  pagination: {
    totalCount: 0,
    totalPages: 0,
    currentPage: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  },
};

const reducer = (state = initialState, action) => {
  console.log(action.payload);
  switch (action.type) {
    case CHANGE_DATE:
      return {
        ...state,
        invoiceData: {
          ...state.invoiceData,
          invoice: {
            ...state.invoiceData.invoice,
            date: action.payload,
          },
        },
      };

    case CHANGE_CUSTOMER_NAME:
      return {
        ...state,
        invoiceData: {
          ...state.invoiceData,
          invoice: {
            ...state.invoiceData.invoice,
            customer_name: action.payload,
          },
        },
      };

    case CHANGE_SALESPERSON_NAME:
      return {
        ...state,
        invoiceData: {
          ...state.invoiceData,
          invoice: {
            ...state.invoiceData.invoice,
            customer_name: action.payload,
          },
        },
      };

    case CHANGE_PAYMENT_TYPE:
      return {
        ...state,
        invoiceData: {
          ...state.invoiceData,
          invoice: {
            ...state.invoiceData.invoice,
            customer_name: action.payload,
          },
        },
      };

    case CHANGE_NOTES:
      return {
        ...state,
        invoiceData: {
          ...state.invoiceData,
          invoice: {
            ...state.invoiceData.invoice,
            customer_name: action.payload.notes,
          },
        },
      };

    case FETCH_INVOICES:
      return {
        ...state,
        loading_fetch_invoices: true,
        error_fetch_invoices: null,
      };

    case FETCH_INVOICES_SUCCESS:
      return {
        ...state,
        invoices: action.payload.invoices,
        pagination: action.payload.pagination,
        loading_fetch_invoices: false,
      };

    case FETCH_INVOICES_FAILURE:
      return {
        ...state,
        invoices: [],
        error_fetch_invoices: action.payload.error,
        loading_fetch_invoices: false,
      };

    default:
      return state;
  }
};

export default reducer;
