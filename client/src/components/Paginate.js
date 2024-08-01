import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import { fetchInvoicesData } from "../api";

const Paginate = () => {
  const dispatch = useDispatch();
  const pagination = useSelector((state) => state.pagination);

  const handlePageChange = (e, value) => {
    dispatch(fetchInvoicesData(value));
  };

  return (
    <Pagination
      count={pagination.totalPages}
      variant="outlined"
      color="primary"
      onChange={handlePageChange}
    />
  );
};

export default Paginate;
