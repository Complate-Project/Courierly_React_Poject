import { useState, useMemo, useEffect } from 'react';

const usePagination = (data, initialRowsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  const effectiveRowsPerPage =
    rowsPerPage === 'All' || rowsPerPage === 'select'
      ? data.length
      : rowsPerPage;

  const totalPages = useMemo(
    () => Math.ceil(data.length / effectiveRowsPerPage),
    [data, effectiveRowsPerPage],
  );

  const paginatedData = useMemo(() => {
    if (rowsPerPage === 'All') return data;
    const start = (currentPage - 1) * effectiveRowsPerPage;
    return data.slice(start, start + effectiveRowsPerPage);
  }, [data, currentPage, effectiveRowsPerPage, rowsPerPage]);

  // reset page if rowsPerPage changed
  useEffect(() => {
    setCurrentPage(1);
  }, [rowsPerPage, data.length]);

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
