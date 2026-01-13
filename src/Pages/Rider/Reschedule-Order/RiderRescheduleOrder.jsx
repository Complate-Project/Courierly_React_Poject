import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FiChevronDown,
  FiFilter,
  FiGrid,
  FiList,
  FiRefreshCcw,
  FiSearch,
} from 'react-icons/fi';
import Spinner from '../../../Shared/Spinier/Spinier';

const RiderRescheduleOrder = () => {
  const [orders, setOrders] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isGridView, setIsGridView] = useState(false);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(8); // Default 8 rows per page

  const indexOfLastOrder = currentPage * perPage;
  const indexOfFirstOrder = indexOfLastOrder - perPage;

  const currentOrders =
    perPage === 'All'
      ? orders
      : orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = perPage === 'All' ? 1 : Math.ceil(orders.length / perPage);

  // Replace with your token
  const token = localStorage.getItem('token'); // token from localStorage

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/reschedule-parcel-list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(response.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const handleSelectRow = id => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectAll = e => {
    if (e.target.checked) {
      setSelectedRows(orders.map(order => order.id));
    } else {
      setSelectedRows([]);
    }
  };

  const totalCollectedAmount = orders
    .filter(order => selectedRows.includes(order.id))
    .reduce((sum, order) => sum + (order.collection || 0), 0);

  const getStatusBadge = status => {
    const statusColors = {
      Pending: 'bg-yellow-100 text-yellow-800',
      'Reschedule Order': 'bg-blue-100 text-blue-800',
      Completed: 'bg-green-100 text-green-800',
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          statusColors[status] || 'bg-gray-100 text-gray-800'
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
          Delivery Order List Management
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Manage and track your pickup orders efficiently
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-t-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          {/* Left */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-48">
              <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full">
                <option>Export All</option>
                <option>Export Selected</option>
                <option>Export CSV</option>
              </select>
              <FiChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-64">
              <FiSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search orders..."
                className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>

            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setIsGridView(false)}
                className={`p-2 rounded-md transition-all duration-300 ${
                  !isGridView
                    ? 'bg-white shadow-sm'
                    : 'hover:bg-white hover:shadow-sm'
                }`}
              >
                <FiList
                  size={16}
                  className={!isGridView ? 'text-blue-600' : 'text-gray-600'}
                />
              </button>
              <button
                onClick={() => setIsGridView(true)}
                className={`p-2 rounded-md transition-all duration-300 ${
                  isGridView
                    ? 'bg-white shadow-sm'
                    : 'hover:bg-white hover:shadow-sm'
                }`}
              >
                <FiGrid
                  size={16}
                  className={isGridView ? 'text-blue-600' : 'text-gray-600'}
                />
              </button>
              <button className="p-2 rounded-md hover:bg-white hover:shadow-sm transition-all duration-300">
                <FiFilter size={16} className="text-gray-600" />
              </button>
              <button className="p-2 rounded-md hover:bg-white hover:shadow-sm transition-all duration-300">
                <FiRefreshCcw size={16} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <>
          <Spinner></Spinner>
        </>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={
                        selectedRows.length === orders.length &&
                        orders.length > 0
                      }
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SL
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tracking ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rider Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Shop
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer Phone
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Note
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Collection
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentOrders.map((order, index) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(order.id)}
                        onChange={() => handleSelectRow(order.id)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-600">
                      {order.tracking_id}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {order.rider_name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {order.shop}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {order.customer_name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {order.customer_phone}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 max-w-xs truncate">
                      {order.customer_address}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 max-w-xs truncate">
                      {order.delivery_note}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      ${order.collection || 0}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        Reschedule
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="mt-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4 bg-white p-4 rounded-md shadow">
            {/* Total Collected Amount */}
            <div className="mt-4 p-3 bg-gray-50 rounded-md">
              <p className="text-sm font-medium text-gray-700">
                Total Collected Amount:{' '}
                <span className="text-green-600 font-bold">
                  ${totalCollectedAmount.toFixed(2)}
                </span>
              </p>
            </div>
            <div className="flex gap-2">
              {/* Per Page Selector */}
              <div className="flex items-center gap-2">
                <select
                  value={perPage}
                  onChange={e => {
                    setPerPage(
                      e.target.value === 'All'
                        ? 'All'
                        : parseInt(e.target.value)
                    );
                    setCurrentPage(1); // reset page
                  }}
                  className="border border-gray-300 px-2 py-1 rounded"
                >
                  <option value={8}>8</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value="All">All</option>
                </select>
              </div>
              {/* Pagination Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Previous button */}
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

                {/* Page numbers */}
                <div className="flex items-center gap-1">
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    const isCurrent = currentPage === pageNum;
                    const isNearCurrent = Math.abs(currentPage - pageNum) <= 1;
                    const isEdge = pageNum === 1 || pageNum === totalPages;

                    // Show ellipsis for gaps in page numbers
                    if (
                      totalPages > 7 &&
                      !isNearCurrent &&
                      !isEdge &&
                      pageNum !== 2 &&
                      pageNum !== totalPages - 1
                    ) {
                      if (
                        (currentPage <= 3 && pageNum === 4) ||
                        (currentPage >= totalPages - 2 &&
                          pageNum === totalPages - 3) ||
                        (currentPage > 3 &&
                          currentPage < totalPages - 2 &&
                          (pageNum === currentPage - 2 ||
                            pageNum === currentPage + 2))
                      ) {
                        return (
                          <span
                            key={`ellipsis-${i}`}
                            className="px-2 text-gray-400"
                          >
                            ...
                          </span>
                        );
                      }
                      return null;
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`
                min-w-[2.5rem] h-10 px-2 text-sm font-medium rounded-lg transition-all duration-200
                ${
                  isCurrent
                    ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-700'
                    : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                }
              `}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                {/* Next button */}
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
        </>
      )}
    </div>
  );
};

export default RiderRescheduleOrder;
