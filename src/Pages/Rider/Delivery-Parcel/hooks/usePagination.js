import { useEffect, useState } from 'react';

const usePagination = (data = []) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const effectiveRows = rowsPerPage === 'All' ? data.length : rowsPerPage;

  const totalPages = Math.max(1, Math.ceil(data.length / effectiveRows));

  const paginatedData =
    rowsPerPage === 'All'
      ? data
      : data.slice(
          (currentPage - 1) * effectiveRows,
          currentPage * effectiveRows,
        );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [rowsPerPage, totalPages]);

  return {
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    totalPages,
    paginatedData,
  };
};

export default usePagination;
