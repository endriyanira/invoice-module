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
  CHANGE_ITEMS,
  CREATE_INVOICE,
  CREATE_INVOICE_SUCCESS,
  CREATE_INVOICE_FAILURE,
} from "../constants/types";

const initialState = {
  invoices: [],
  loading_fetch_invoices: false,
  error_fetch_invoices: false,
  loading_create_invoice: false,
  error_create_invoice: false,
  create_invoice_success_message: "",
  invoice: {
    date: new Date(),
    customer_name: "",
    salesperson_name: "",
    payment_type: "",
    notes: "",
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
        invoice: {
          ...state.invoice,
          date: action.payload,
        },
      };

    case CHANGE_CUSTOMER_NAME:
      return {
        ...state,
        invoice: {
          ...state.invoice,
          customer_name: action.payload,
        },
      };

    case CHANGE_SALESPERSON_NAME:
      return {
        ...state,
        invoice: {
          ...state.invoice,
          salesperson_name: action.payload,
        },
      };

    case CHANGE_PAYMENT_TYPE:
      return {
        ...state,
        invoice: {
          ...state.invoice,
          payment_type: action.payload,
        },
      };

    case CHANGE_NOTES:
      return {
        ...state,
        invoice: {
          ...state.invoice,
          notes: action.payload,
        },
      };

    case CHANGE_ITEMS:
      return {
        ...state,
        items: action.payload,
      };

    case CREATE_INVOICE:
      return {
        ...state,
        loading_create_invoice: true,
        error_create_invoice: null,
      };

    case CREATE_INVOICE_SUCCESS:
      return {
        ...state,
        create_invoice_success_message: action.payload,
        error_create_invoice: false,
        loading_create_invoice: false,
      };

    case CREATE_INVOICE_FAILURE:
      return {
        ...state,
        loading_create_invoice: false,
        error_create_invoice: action.payload,
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
