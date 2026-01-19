import axios from 'axios';
import React, { useState } from 'react';
import {
  FiRefreshCcw,
  FiList,
  FiGrid,
  FiFilter,
  FiSearch,
  FiDownload,
  FiCalendar,
} from 'react-icons/fi';
import Spinner from '../../../Shared/Spinier/Spinier';
import RiderReturnHistoryTable from './RiderReturnHistoryTable';

const RiderReturnHistory = () => {
  const [tableData, setTableData] = useState([]);
  console.log(tableData);
  const [fromDate, setFromDate] = useState('2020-01-11');
  const [toDate, setToDate] = useState('2026-01-14');

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const fetchReturnHistory = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/return-history`,
        {
          params: {
            fromdate: fromDate,
            todate: toDate,
          },
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        },
      );

      setTableData(res.data?.payments_date || []);
    } catch (error) {
      console.error('Return history fetch failed', error);
    } finally {
      setLoading(false);
    }
  };

  // load data
  const handleLoad = () => {
    if (!fromDate || !toDate) {
      alert('Please select both dates');
      return;
    }
    fetchReturnHistory();
  };

  const totalPages =
    itemsPerPage === 'all' ? 1 : Math.ceil(tableData.length / itemsPerPage);

  const startIndex =
    itemsPerPage === 'all' ? 0 : (currentPage - 1) * itemsPerPage;

  const endIndex =
    itemsPerPage === 'all' ? tableData.length : startIndex + itemsPerPage;

  const currentData =
    itemsPerPage === 'all' ? tableData : tableData.slice(startIndex, endIndex);

  const getPageNumbers = () => {
    const pages = [];
    const maxPageNumbers = 5;

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (endPage - startPage < maxPageNumbers - 1) {
      startPage = Math.max(1, endPage - (maxPageNumbers - 1));
      endPage = Math.min(totalPages, startPage + (maxPageNumbers - 1));
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Order Return Report (Date Wins)
        </h1>
      </div>

      {/* Control Panel */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          {/* Left Controls */}
          <div className="flex flex-col sm:flex-row item-center gap-3 w-full lg:w-auto">
            {/* Date From */}
            <div className="relative w-full sm:w-40">
              <span className="block text-sm text-gray-600 mb-1">From:</span>
              <div className="flex items-center">
                <FiCalendar
                  className="absolute left-3 text-gray-400"
                  size={16}
                />
                <input
                  type="date"
                  value={fromDate}
                  onChange={e => setFromDate(e.target.value)}
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded text-sm w-full"
                />
              </div>
            </div>

            {/* Date To */}
            <div className="relative w-full sm:w-40">
              <span className="block text-sm text-gray-600 mb-1">To:</span>
              <div className="flex items-center">
                <FiCalendar
                  className="absolute left-3 text-gray-400"
                  size={16}
                />
                <input
                  type="date"
                  value={toDate}
                  onChange={e => setToDate(e.target.value)}
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded text-sm w-full"
                />
              </div>
            </div>

            {/* Load Button */}
            <div className="flex items-end">
              <button
                onClick={handleLoad}
                className="bg-blue-600 text-white px-6 py-2 rounded text-sm hover:bg-blue-700 transition-colors duration-200 h-[42px]"
              >
                Load
              </button>
            </div>

            {/* Export Button */}
            <button className="bg-white border border-gray-300 rounded px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2 w-full sm:w-auto justify-center h-[42px] mt-6">
              <FiDownload size={16} />
              Export Basic
            </button>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 w-full lg:w-auto mt-6 sm:mt-0">
            {/* Search */}
            <div className="relative flex-1 lg:flex-none">
              <FiSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full lg:w-64"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1">
              <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors duration-200">
                <FiRefreshCcw size={16} className="text-gray-600" />
              </button>
              <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors duration-200">
                <FiList size={16} className="text-gray-600" />
              </button>
              <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors duration-200">
                <FiGrid size={16} className="text-gray-600" />
              </button>
              <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors duration-200">
                <FiFilter size={16} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <Spinner></Spinner>
      ) : (
        <>
          {' '}
          {/* Table Section */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <RiderReturnHistoryTable
              currentData={currentData}
              startIndex={startIndex}
            ></RiderReturnHistoryTable>

            {/* Table Footer */}
            <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600">
                <div>
                  Showing {startIndex + 1} to{' '}
                  {Math.min(endIndex, tableData.length)} of {tableData.length}{' '}
                  rows
                </div>
                <div className="flex items-center gap-2">
                  <span>{itemsPerPage}</span>
                  <select
                    value={itemsPerPage}
                    onChange={e => {
                      const value =
                        e.target.value === 'all'
                          ? 'all'
                          : Number(e.target.value);
                      setItemsPerPage(value);
                      setCurrentPage(1); // page reset
                    }}
                    className="bg-white border border-gray-300 rounded px-2 py-1 text-sm"
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value="all">All</option>
                  </select>
                  <div className="flex items-center gap-1">
                    {/* Prev Button */}
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(p => p - 1)}
                      className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      Previous
                    </button>

                    {/* First Page */}
                    {currentPage > 3 && (
                      <>
                        <button
                          onClick={() => setCurrentPage(1)}
                          className={`px-3 py-1 border rounded ${
                            currentPage === 1 ? 'bg-blue-600 text-white' : ''
                          }`}
                        >
                          1
                        </button>
                        {currentPage > 4 && <span>...</span>}
                      </>
                    )}

                    {/* Middle Pages */}
                    {getPageNumbers().map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-9 h-9 flex items-center justify-center text-sm font-medium rounded-lg border transition-all duration-200 ${
                          currentPage === page
                            ? 'bg-blue-600 text-white'
                            : 'border-gray-300'
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    {/* Last Page */}
                    {currentPage < totalPages - 2 && (
                      <>
                        {currentPage < totalPages - 3 && <span>...</span>}
                        <button
                          onClick={() => setCurrentPage(totalPages)}
                          className={`px-3 py-1 border rounded ${
                            currentPage === totalPages
                              ? 'bg-blue-600 text-white'
                              : ''
                          }`}
                        >
                          {totalPages}
                        </button>
                      </>
                    )}

                    {/* Next Button */}
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(p => p + 1)}
                      className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow"
                    >
                      Next
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RiderReturnHistory;
