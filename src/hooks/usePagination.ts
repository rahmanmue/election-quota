import { useState } from "react";

export const usePagination = <T>() => {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(0);

  const setPaginationData = (
    newData: T[],
    currentPage: number,
    total: number,
    size: number
  ) => {
    setData(newData);
    setPage(currentPage);
    setTotalPages(total);
    setPageSize(size);
  };

  return {
    data, // The dynamic data
    page, // Current page number
    totalPages, // Total number of pages
    pageSize, // Page size
    setData, // Function to set data
    setPage, // Function to set page
    setTotalPages, // Function to set total pages
    setPageSize, // Function to set page size
    setPaginationData, // Helper to set all state
  };
};
