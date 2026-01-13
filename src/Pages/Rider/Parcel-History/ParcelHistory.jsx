import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  FiRefreshCcw,
  FiList,
  FiGrid,
  FiFilter,
  FiSearch,
  FiChevronDown,
  FiDownload,
  FiCalendar,
} from 'react-icons/fi';
import Spinner from '../../../Shared/Spinier/Spinier';

const ParcelHistory = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default 10
  const token = localStorage.getItem('token');

  // Fetch API data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/parcel-history`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const mappedData = res.data.map(item => ({
          id: item.id,
          trackingId: item.tracking_id,
          pickupDate: item.pickup_date
            ? item.pickup_date
            : item.created_at.split('T')[0],
          merchantName: item.business_name || 'N/A',
          customerName: item.customer_name,
          customerPhone: item.customer_phone,
          customerAddress: item.customer_address,
          invoiceValue: item.selling_price,
          type: item.type,
          status: item.status,
        }));

        setTableData(mappedData);
      } catch (error) {
        console.error('Parcel History API Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // Calculate pagination
  const totalPages =
    itemsPerPage === 'all' ? 1 : Math.ceil(tableData.length / itemsPerPage);
  const startIndex =
    itemsPerPage === 'all' ? 0 : (currentPage - 1) * itemsPerPage;
  const endIndex =
    itemsPerPage === 'all'
      ? tableData.length
      : startIndex + Number(itemsPerPage);
  const currentData =
    itemsPerPage === 'all' ? tableData : tableData.slice(startIndex, endIndex);

  // Dynamic page numbers for display
  const getPageNumbers = () => {
    if (itemsPerPage === 'all') return [];
    const pages = [];
    const maxPageNumbers = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    if (end - start < maxPageNumbers - 1) {
      start = Math.max(1, end - (maxPageNumbers - 1));
      end = Math.min(totalPages, start + (maxPageNumbers - 1));
    }

    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Rider Order History
        </h1>
      </div>

      {/* Control Panel */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            {/* Status Filter */}
            <div className="relative w-full sm:w-48">
              <select className="appearance-none bg-white border border-gray-300 rounded px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full">
                <option>--select status--</option>
                <option>Pending</option>
                <option>Completed</option>
                <option>In Progress</option>
                <option>Cancelled</option>
              </select>
              <FiChevronDown
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
            </div>

            {/* Date From */}
            <div className="relative w-full sm:w-40">
              <FiCalendar
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="date"
                className="pl-10 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                placeholder="From Date"
              />
            </div>

            {/* Date To */}
            <div className="relative w-full sm:w-40">
              <FiCalendar
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="date"
                className="pl-10 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
                placeholder="To Date"
              />
            </div>

            {/* Load Button */}
            <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 w-full sm:w-auto justify-center">
              Load
            </button>

            {/* Export Button */}
            <button className="bg-white border border-gray-300 rounded px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2 w-full sm:w-auto justify-center">
              <FiDownload size={16} />
              Export Basic
            </button>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 w-full lg:w-auto">
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

      {/* Table Section */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                      SL
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                      Tracking ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                      Pickup Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                      Merchant Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                      Customer Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                      Customer Phone
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                      Customer Address
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
                      Invoice Value
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Type
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {currentData.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                        {index + 1}.
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-600 border-r border-gray-200">
                        {item.trackingId}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                        {item.pickupDate}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                        {item.merchantName}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                        {item.customerName}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                        {item.customerPhone}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 border-r border-gray-200 max-w-xs">
                        <div className="truncate" title={item.customerAddress}>
                          {item.customerAddress}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                        {item.invoiceValue}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {item.type}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
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
          </>
        )}
      </div>
    </div>
  );
};

export default ParcelHistory;
