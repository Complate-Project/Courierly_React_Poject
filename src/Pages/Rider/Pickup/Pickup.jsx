import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FiRefreshCcw,
  FiList,
  FiGrid,
  FiFilter,
  FiSearch,
  FiChevronDown,
} from 'react-icons/fi';
import useTitle from '../../../Hooks/useTitle';
import Spinier from '../../../Shared/Spinier/Spinier';

const PICKUP_API = `${
  import.meta.env.VITE_BASE_URL
}/api/rider-pickup-parcel-list`;
const AUTO_PICKUP_API = `${
  import.meta.env.VITE_BASE_URL
}/api/rider-auto-pickup-parcel-list`;

const ITEMS_PER_PAGE = 8;

const Pickup = () => {
  useTitle('Rider Dashboard | Pickup');

  const [activeTab, setActiveTab] = useState('pickup'); // pickup | auto-pickup
  const [pickupData, setPickupData] = useState([]);
  const [autoPickupData, setAutoPickupData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // 🧩 Fetch Data from API
  const fetchData = async type => {
    setLoading(true);
    const token = localStorage.getItem('token'); // token from localStorage

    try {
      const url = type === 'pickup' ? PICKUP_API : AUTO_PICKUP_API;
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (type === 'pickup') setPickupData(res.data || []);
      else setAutoPickupData(res.data || []);
    } catch (err) {
      console.error(err);
      if (type === 'pickup') setPickupData([]);
      else setAutoPickupData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchData(activeTab);
  }, [activeTab]);

  const activeData = activeTab === 'pickup' ? pickupData : autoPickupData;

  const totalPages = Math.ceil(activeData.length / ITEMS_PER_PAGE);

  const paginatedData = activeData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="bg-gray-50 min-h-screen ">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        {/* Header Section */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Pickup Management
          </h1>
          <p className="text-gray-600">
            Manage and track your pickup orders efficiently
          </p>
        </div>

        {/* Tabs - Segmented Control */}
        <div className="mt-4 md:mt-0">
          <div className="relative bg-gray-100 rounded-lg p-1 inline-flex">
            <div
              className={`absolute top-1 bottom-1 rounded-md bg-blue-600 transition-all duration-300 ${
                activeTab === 'pickup' ? 'left-1 w-20' : 'left-[90px] w-24'
              }`}
            />
            <button
              onClick={() => setActiveTab('pickup')}
              className={`relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 z-10 ${
                activeTab === 'pickup'
                  ? 'text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Pickup
            </button>
            <button
              onClick={() => setActiveTab('auto-pickup')}
              className={`relative px-6 py-2 text-sm font-medium rounded-md transition-all duration-300 z-10 ${
                activeTab === 'auto-pickup'
                  ? 'text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Auto Pickup
            </button>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="bg-white rounded-xs shadow-sm border border-gray-200 p-6 ">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          {/* Left Controls */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative">
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
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full">
                <option>--- Select Merchant ---</option>
              </select>
              <FiChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
            </div>
            <button
              onClick={() => fetchData(activeTab)}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium flex items-center gap-2 justify-center"
            >
              <FiRefreshCcw size={16} />
              Load Data
            </button>
            <div className="relative flex-1 lg:flex-none">
              <FiSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search orders..."
                className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full lg:w-64"
              />
            </div>

            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button className="p-2 rounded-md hover:bg-white hover:shadow-sm transition-all duration-300">
                <FiRefreshCcw size={16} className="text-gray-600" />
              </button>
              <button className="p-2 rounded-md bg-white shadow-sm transition-all duration-300">
                <FiList size={16} className="text-blue-600" />
              </button>
              <button className="p-2 rounded-md hover:bg-white hover:shadow-sm transition-all duration-300">
                <FiGrid size={16} className="text-gray-600" />
              </button>
              <button className="p-2 rounded-md hover:bg-white hover:shadow-sm transition-all duration-300">
                <FiFilter size={16} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white rounded-xs shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            {activeTab === 'auto-pickup' ? (
              <>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                Auto Pickup Order List
              </>
            ) : (
              <>
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                Pickup Order List
              </>
            )}
          </h2>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <Spinier></Spinier>
          ) : activeTab === 'pickup' ? (
            <>
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      SL.
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Create Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Tracking ID
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedData.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center py-6 text-gray-500"
                      >
                        No data found
                      </td>
                    </tr>
                  ) : (
                    paginatedData.map((item, i) => (
                      <tr
                        key={item.tracking_id}
                        className="hover:bg-gray-50 transition"
                      >
                        <td className="px-6 py-4 text-sm">
                          {(currentPage - 1) * ITEMS_PER_PAGE + i + 1}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {item.created_at?.slice(0, 10)}
                        </td>
                        <td className="px-6 py-4 text-sm text-blue-600">
                          {item.tracking_id}
                        </td>

                        <td className="px-6 py-4 text-sm">
                          {item.customer_name}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {item.mobile || '-'}
                        </td>
                        <td className="px-6 py-4 text-sm">{item.address}</td>
                        <td className="px-6 py-4 text-sm">
                          <button className="text-blue-600 hover:underline">
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-gray-200 bg-gray-50/50">
                  {/* Page info */}
                  <div className="text-sm text-gray-600">
                    Page{' '}
                    <span className="font-semibold text-gray-900">
                      {currentPage}
                    </span>{' '}
                    of{' '}
                    <span className="font-semibold text-gray-900">
                      {totalPages}
                    </span>
                  </div>

                  {/* Pagination controls */}
                  <div className="flex items-center gap-2">
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
                      {Array.from({ length: totalPages }, (_, i) => {
                        const pageNum = i + 1;
                        const isCurrent = pageNum === currentPage;

                        const shouldShow =
                          pageNum === 1 ||
                          pageNum === totalPages ||
                          Math.abs(pageNum - currentPage) <= 1;

                        if (!shouldShow) {
                          if (
                            pageNum === currentPage - 2 ||
                            pageNum === currentPage + 2
                          ) {
                            return (
                              <span
                                key={`dots-${i}`}
                                className="flex items-center justify-center h-10 px-3 text-gray-400 select-none"
                              >
                                •••
                              </span>
                            );
                          }
                          return null;
                        }

                        return (
                          <button
                            key={pageNum}
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
              )}
            </>
          ) : (
            <>
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      SL.
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Tracking ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Pickup Date
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedData.length === 0 ? (
                    <tr>
                      <td
                        colSpan={8}
                        className="text-center py-6 text-gray-500"
                      >
                        No data found
                      </td>
                    </tr>
                  ) : (
                    paginatedData.map((item, i) => (
                      <tr
                        key={item.tracking_id}
                        className="hover:bg-gray-50 transition"
                      >
                        <td className="px-6 py-4 text-sm">
                          {(currentPage - 1) * ITEMS_PER_PAGE + i + 1}
                        </td>
                        <td className="px-6 py-4 text-sm text-blue-600">
                          {item.tracking_id}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {item.pickup_date || '-'}
                        </td>

                        <td className="px-6 py-4 text-sm">
                          {item.customer_name}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {item.mobile || '-'}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {item.customer_address || '-'}
                        </td>

                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              item.status === 'Completed'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <button className="text-blue-600 hover:underline">
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-gray-200 bg-gray-50/50">
                  {/* Page info */}
                  <div className="text-sm text-gray-600">
                    Page{' '}
                    <span className="font-semibold text-gray-900">
                      {currentPage}
                    </span>{' '}
                    of{' '}
                    <span className="font-semibold text-gray-900">
                      {totalPages}
                    </span>
                  </div>

                  {/* Pagination controls */}
                  <div className="flex items-center gap-2">
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
                        const isNearCurrent =
                          Math.abs(currentPage - pageNum) <= 1;
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
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pickup;
