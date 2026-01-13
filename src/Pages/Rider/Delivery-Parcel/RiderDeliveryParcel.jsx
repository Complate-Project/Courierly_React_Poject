import React, { useState, useEffect } from 'react';
import {
  FiRefreshCcw,
  FiList,
  FiGrid,
  FiFilter,
  FiSearch,
  FiChevronDown,
  FiTruck,
  FiCalendar,
  FiPackage,
  FiCornerUpLeft,
} from 'react-icons/fi';
import axios from 'axios';
import Spinner from '../../../Shared/Spinier/Spinier';

const RiderDeliveryParcel = () => {
  const [isGridView, setIsGridView] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/delivery-parcel-list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const mappedData = response.data.map(item => ({
          id: item.id,
          trackingId: item.tracking_id,
          merchantName: item.shop,
          merchantPhone: item.mobile,
          customerName: item.customer_name,
          customerNumber: item.customer_phone,
          customerAddress: item.customer_address,
          type: item.type,
          partial: item.isPartial === 1 ? 'Yes' : 'No',
          invoiceValue: `৳${item.collection}`,
        }));

        setTableData(mappedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching delivery parcels:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate Pagination
  const totalPages = Math.ceil(tableData.length / itemsPerPage);
  const paginatedData = tableData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Mobile Card View
  const MobileCard = ({ item, index }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm">
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <span className="font-medium text-gray-500">SL:</span>
          <p className="text-gray-900">{index + 1}</p>
        </div>
        <div>
          <span className="font-medium text-gray-500">Tracking ID:</span>
          <p className="text-blue-600 font-medium">{item.trackingId}</p>
        </div>
        <div>
          <span className="font-medium text-gray-500">Merchant:</span>
          <p className="text-gray-900">{item.merchantName}</p>
        </div>
        <div>
          <span className="font-medium text-gray-500">Type:</span>
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
              item.type === 'Express'
                ? 'bg-red-100 text-red-800'
                : 'bg-green-100 text-green-800'
            }`}
          >
            {item.type}
          </span>
        </div>
        <div>
          <span className="font-medium text-gray-500">Customer:</span>
          <p className="text-gray-900">{item.customerName}</p>
        </div>
        <div>
          <span className="font-medium text-gray-500">Invoice:</span>
          <p className="text-gray-900 font-semibold">{item.invoiceValue}</p>
        </div>
        <div className="col-span-2">
          <span className="font-medium text-gray-500">Address:</span>
          <p className="text-gray-900 text-sm">{item.customerAddress}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
        <button className="flex-1 min-w-[120px] bg-green-600 text-white px-3 py-2 rounded text-xs hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-1">
          <FiTruck size={12} />
          Deliver
        </button>
        <button className="flex-1 min-w-[120px] bg-blue-600 text-white px-3 py-2 rounded text-xs hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-1">
          <FiCalendar size={12} />
          Reschedule
        </button>
        <button className="flex-1 min-w-[120px] bg-yellow-600 text-white px-3 py-2 rounded text-xs hover:bg-yellow-700 transition-colors duration-200 flex items-center justify-center gap-1">
          <FiPackage size={12} />
          Partial
        </button>
        <button className="flex-1 min-w-[120px] bg-red-600 text-white px-3 py-2 rounded text-xs hover:bg-red-700 transition-colors duration-200 flex items-center justify-center gap-1">
          <FiCornerUpLeft size={12} />
          Return
        </button>
      </div>
    </div>
  );

  return (
    <div className="">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
          Delivery Order List Management
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Manage and track your pickup orders efficiently
        </p>
      </div>

      {/* Control Panel */}
      <div className="bg-white rounded-t-lg shadow-sm border border-gray-200 p-4 md:p-6 ">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          {/* Left Controls */}
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

          {/* Right Controls */}
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

      {/* Mobile Card View */}
      {isGridView && (
        <div className="block md:hidden">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Delivery Parcels ({tableData.length})
            </h2>
          </div>
          {paginatedData.map((item, index) => (
            <MobileCard key={item.id} item={item} index={index} />
          ))}
        </div>
      )}

      {/* Tablet and Desktop Table View */}
      <div className={`${isGridView ? 'hidden md:block' : 'block'}`}>
        <div className="bg-white rounded-b-lg shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <Spinner />
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px] lg:min-w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        SL.
                      </th>
                      <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Tracking ID
                      </th>
                      <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Merchant
                      </th>
                      <th className="hidden lg:table-cell px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Merchant Phone
                      </th>
                      <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="hidden xl:table-cell px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Customer Phone
                      </th>
                      <th className="hidden 2xl:table-cell px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Address
                      </th>
                      <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="hidden md:table-cell px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Partial
                      </th>
                      <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Invoice
                      </th>
                      <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedData.map((item, index) => (
                      <tr
                        key={item.id}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                          {item.trackingId}
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div>
                            <div className="font-medium">
                              {item.merchantName}
                            </div>
                            <div className="text-gray-500 text-xs lg:hidden">
                              {item.merchantPhone}
                            </div>
                          </div>
                        </td>
                        <td className="hidden lg:table-cell px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.merchantPhone}
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div>
                            <div className="font-medium">
                              {item.customerName}
                            </div>
                            <div className="text-gray-500 text-xs xl:hidden">
                              {item.customerNumber}
                            </div>
                          </div>
                        </td>
                        <td className="hidden xl:table-cell px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.customerNumber}
                        </td>
                        <td className="hidden 2xl:table-cell px-4 md:px-6 py-4 text-sm text-gray-900">
                          <div
                            className="max-w-xs truncate"
                            title={item.customerAddress}
                          >
                            {item.customerAddress}
                          </div>
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              item.type === 'Express'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {item.type}
                          </span>
                        </td>
                        <td className="hidden md:table-cell px-4 md:px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              item.partial === 'Yes'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {item.partial}
                          </span>
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          {item.invoiceValue}
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-wrap gap-1">
                            <button className="bg-green-600 text-white px-2 py-1.5 rounded text-xs hover:bg-green-700 transition-colors duration-200 flex items-center gap-1">
                              <FiTruck size={10} />
                              <span className="hidden sm:inline">Deliver</span>
                            </button>
                            <button className="bg-blue-600 text-white px-2 py-1.5 rounded text-xs hover:bg-blue-700 transition-colors duration-200 flex items-center gap-1">
                              <FiCalendar size={10} />
                              <span className="hidden sm:inline">
                                Reschedule
                              </span>
                            </button>
                            <button className="bg-yellow-600 text-white px-2 py-1.5 rounded text-xs hover:bg-yellow-700 transition-colors duration-200 flex items-center gap-1">
                              <FiPackage size={10} />
                              <span className="hidden sm:inline">Partial</span>
                            </button>
                            <button className="bg-red-600 text-white px-2 py-1.5 rounded text-xs hover:bg-red-700 transition-colors duration-200 flex items-center gap-1">
                              <FiCornerUpLeft size={10} />
                              <span className="hidden sm:inline">Return</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer with Pagination */}
              <div className="px-4 md:px-6 py-4 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-700">
                {/* Entries info */}
                <div className="text-gray-600">
                  Showing{' '}
                  <span className="font-medium text-gray-900">
                    {paginatedData.length}
                  </span>{' '}
                  of{' '}
                  <span className="font-medium text-gray-900">
                    {tableData.length}
                  </span>{' '}
                  {tableData.length === 1 ? 'entry' : 'entries'}
                </div>

                {/* Controls container */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* Rows per page */}
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 whitespace-nowrap">
                      Rows per page:
                    </span>
                    <select
                      className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer transition-colors hover:border-gray-400"
                      value={itemsPerPage}
                      onChange={e => {
                        const value =
                          e.target.value === 'All'
                            ? tableData.length
                            : parseInt(e.target.value);
                        setItemsPerPage(value);
                        setCurrentPage(1);
                      }}
                      aria-label="Select rows per page"
                    >
                      <option value={8}>8</option>
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value="All">All</option>
                    </select>
                  </div>

                  {/* Divider (hidden on mobile) */}
                  <div className="hidden sm:block h-6 w-px bg-gray-300" />

                  {/* Pagination */}
                  <div className="flex items-center gap-2">
                    {/* Page info */}

                    {/* Pagination Buttons with truncation */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Previous Button */}
                      <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => p - 1)}
                        className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow active:scale-95"
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

                      {/* Page Numbers */}
                      <div className="flex items-center gap-1">
                        {/* Always show page 1 */}
                        <button
                          onClick={() => setCurrentPage(1)}
                          className={`w-9 h-9 flex items-center justify-center text-sm font-medium rounded-lg border transition-all duration-200 ${
                            currentPage === 1
                              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:shadow'
                          }`}
                        >
                          1
                        </button>

                        {/* Show page 2 if it exists */}
                        {totalPages >= 2 && (
                          <button
                            onClick={() => setCurrentPage(2)}
                            className={`w-9 h-9 flex items-center justify-center text-sm font-medium rounded-lg border transition-all duration-200 ${
                              currentPage === 2
                                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:shadow'
                            }`}
                          >
                            2
                          </button>
                        )}

                        {/* Dynamic page numbers with ellipsis */}
                        {(() => {
                          const pages = [];
                          const showEllipsisStart = currentPage > 3;
                          const showEllipsisEnd = currentPage < totalPages - 2;

                          if (showEllipsisStart) {
                            pages.push(
                              <span
                                key="ellipsis-start"
                                className="px-2 text-gray-400"
                              >
                                ...
                              </span>
                            );
                          }

                          // Show current page and nearby pages
                          for (
                            let i = Math.max(3, currentPage - 1);
                            i <= Math.min(totalPages - 1, currentPage + 1);
                            i++
                          ) {
                            if (i > 2 && i < totalPages) {
                              pages.push(
                                <button
                                  key={i}
                                  onClick={() => setCurrentPage(i)}
                                  className={`w-9 h-9 flex items-center justify-center text-sm font-medium rounded-lg border transition-all duration-200 ${
                                    currentPage === i
                                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:shadow'
                                  }`}
                                >
                                  {i}
                                </button>
                              );
                            }
                          }

                          if (showEllipsisEnd) {
                            pages.push(
                              <span
                                key="ellipsis-end"
                                className="px-2 text-gray-400"
                              >
                                ...
                              </span>
                            );
                          }

                          return pages;
                        })()}

                        {/* Show last page if there are more than 1 page */}
                        {totalPages > 2 && (
                          <button
                            onClick={() => setCurrentPage(totalPages)}
                            className={`w-9 h-9 flex items-center justify-center text-sm font-medium rounded-lg border transition-all duration-200 ${
                              currentPage === totalPages
                                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:shadow'
                            }`}
                          >
                            {totalPages}
                          </button>
                        )}
                      </div>

                      {/* Next Button */}
                      <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(p => p + 1)}
                        className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow active:scale-95"
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
    </div>
  );
};

export default RiderDeliveryParcel;
