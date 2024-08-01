import {
  ADD_INVOICE,
  GET_INVOICES,
  FETCH_INVOICES,
  FETCH_INVOICES_SUCCESS,
  FETCH_INVOICES_FAILURE,
} from "../constants/types";

const initialState = {
  invoices: [],
  loading_fetch_invoices: false,
  error_fetch_invoices: false,
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
