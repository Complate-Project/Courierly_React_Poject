import axios from 'axios';
import { useEffect, useState } from 'react';

import {
  FiRefreshCcw,
  FiList,
  FiGrid,
  FiFilter,
  FiSearch,
  FiChevronDown,
  FiCheckCircle,
  FiXCircle,
  FiClock,
  FiEdit,
  FiEye,
  FiTruck,
  FiUser,
  FiMapPin,
  FiPhone,
} from 'react-icons/fi';
import Spinner from '../../../Shared/Spinier/Spinier';

const ReturnParcel = () => {
  const [isGridView, setIsGridView] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ loading state
  const token = localStorage.getItem('token');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true); // ✅ start loading
    try {
      const res = await axios.get(
        'https://courierly.demo-bd.com/api/return-parcel-list',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const apiData = res.data?.payments_data || [];

      const mappedData = apiData.map(item => ({
        id: item.id,
        createDate: item.created_at ? item.created_at.split('T')[0] : 'N/A',
        invoiceNo: item.invoice_id || 'N/A',
        merchantName: item.merchant?.name || 'N/A',
        merchantPhone: item.merchant?.mobile || 'N/A',
        merchantAddress: item.merchant?.address || 'N/A',
        riderName: item.rider?.name || 'N/A',
        createBy: item.creator?.name || 'N/A',
        status: item.status || 'Pending',
      }));

      setTableData(mappedData);
    } catch (error) {
      console.error('Return Parcel API Error:', error);
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  // 🔥 Pagination Logic
  const totalItems = tableData.length;

  const totalPages =
    itemsPerPage === 'all' ? 1 : Math.ceil(totalItems / itemsPerPage);

  const startIndex =
    itemsPerPage === 'all' ? 0 : (currentPage - 1) * itemsPerPage;

  const currentData =
    itemsPerPage === 'all'
      ? tableData
      : tableData.slice(startIndex, startIndex + itemsPerPage);

  const handlePerPageChange = e => {
    const value = e.target.value === 'all' ? 'all' : Number(e.target.value);
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const getPaginationNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      Pending: { color: 'bg-yellow-100 text-yellow-800', icon: FiClock },
      'In Transit': { color: 'bg-blue-100 text-blue-800', icon: FiTruck },
      Completed: { color: 'bg-green-100 text-green-800', icon: FiCheckCircle },
      Cancelled: { color: 'bg-red-100 text-red-800', icon: FiXCircle },
    };

    const config = statusConfig[status] || statusConfig.Pending;
    const IconComponent = config.icon;

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
      >
        <IconComponent size={12} className="mr-1" />
        {status}
      </span>
    );
  };

  // Mobile Card View
  const MobileCard = ({ item, index }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm">
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <span className="font-medium text-gray-500">SL:</span>
          <p className="text-gray-900">{index + 1}</p>
        </div>
        <div>
          <span className="font-medium text-gray-500">Date:</span>
          <p className="text-gray-900">{item.createDate}</p>
        </div>
        <div>
          <span className="font-medium text-gray-500">Invoice:</span>
          <p className="text-blue-600 font-medium">{item.invoiceNo}</p>
        </div>
        <div>
          <span className="font-medium text-gray-500">Status:</span>
          <StatusBadge status={item.status} />
        </div>
        <div className="col-span-2">
          <span className="font-medium text-gray-500 flex items-center gap-1">
            <FiUser size={12} />
            Merchant:
          </span>
          <p className="text-gray-900 text-sm mt-1">{item.merchantName}</p>
        </div>
        <div className="col-span-2">
          <span className="font-medium text-gray-500 flex items-center gap-1">
            <FiPhone size={12} />
            Phone:
          </span>
          <p className="text-gray-900 text-sm mt-1">{item.merchantPhone}</p>
        </div>
        <div className="col-span-2">
          <span className="font-medium text-gray-500 flex items-center gap-1">
            <FiUser size={12} />
            Rider:
          </span>
          <p className="text-gray-900 text-sm mt-1">{item.riderName}</p>
        </div>
        <div className="col-span-2">
          <span className="font-medium text-gray-500">Created By:</span>
          <p className="text-gray-900 text-sm">{item.createBy}</p>
        </div>
      </div>

      {/* Action Buttons for Mobile */}
      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
        <button className="flex-1 min-w-[100px] bg-blue-600 text-white px-2 py-2 rounded text-xs hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-1">
          <FiEye size={12} />
          View
        </button>
        <button className="flex-1 min-w-[100px] bg-green-600 text-white px-2 py-2 rounded text-xs hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-1">
          <FiEdit size={12} />
          Process
        </button>
        <button className="flex-1 min-w-[100px] bg-purple-600 text-white px-2 py-2 rounded text-xs hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center gap-1">
          <FiTruck size={12} />
          Track
        </button>
      </div>
    </div>
  );

  return (
    <div>
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
          Return Parcel Management
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Manage and track return parcels efficiently
        </p>
      </div>

      {/* Control Panel */}
      <div className="bg-white rounded-t-lg shadow-sm border border-gray-200 p-4 md:p-6">
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
                placeholder="Search return parcels..."
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
      {!loading && isGridView && (
        <div className="block md:hidden">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Return Parcels ({tableData.length})
            </h2>
          </div>
          {currentData.map((item, index) => (
            <MobileCard key={item.id} item={item} index={index} />
          ))}
        </div>
      )}

      {/* Tablet and Desktop Table View */}

      <div className={`${isGridView ? 'hidden md:block' : 'block'}`}>
        {/* Tablet and Desktop Table View */}
        <div className={`${isGridView ? 'hidden md:block' : 'block'}`}>
          <div className="bg-white rounded-b-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Table Header */}
            <div className="px-4 md:px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                Return Parcel List
                <span className="text-sm font-normal text-gray-500">
                  ({tableData.length} parcels)
                </span>
              </h2>
            </div>

            {loading ? (
              <Spinner></Spinner>
            ) : (
              <>
                {/* Table Container */}
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1000px] lg:min-w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          SL.
                        </th>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Create Date
                        </th>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Invoice No
                        </th>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Merchant Name
                        </th>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Merchant Phone
                        </th>
                        <th className="hidden lg:table-cell px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Merchant Address
                        </th>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Rider Name
                        </th>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Create By
                        </th>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentData.map((item, index) => (
                        <tr
                          key={item.id}
                          className="hover:bg-gray-50 transition-colors duration-200"
                        >
                          <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {index + 1}
                          </td>
                          <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.createDate}
                          </td>
                          <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                            {item.invoiceNo}
                          </td>
                          <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.merchantName}
                          </td>
                          <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex items-center gap-1">
                              <FiPhone size={14} className="text-gray-400" />
                              {item.merchantPhone}
                            </div>
                          </td>
                          <td className="hidden lg:table-cell px-4 md:px-6 py-4 text-sm text-gray-900 max-w-xs">
                            <div className="flex items-start gap-2">
                              <FiMapPin
                                size={14}
                                className="text-gray-400 mt-0.5 flex-shrink-0"
                              />
                              <span
                                className="truncate"
                                title={item.merchantAddress}
                              >
                                {item.merchantAddress}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex items-center gap-1">
                              <FiUser size={14} className="text-gray-400" />
                              {item.riderName}
                            </div>
                          </td>
                          <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.createBy}
                          </td>
                          <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={item.status} />
                          </td>
                          <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-wrap gap-1">
                              <button className="bg-blue-600 text-white px-3 py-1.5 rounded text-xs hover:bg-blue-700 transition-colors duration-200 flex items-center gap-1">
                                <FiEye size={12} />
                                <span className="hidden sm:inline">View</span>
                              </button>
                              <button className="bg-green-600 text-white px-3 py-1.5 rounded text-xs hover:bg-green-700 transition-colors duration-200 flex items-center gap-1">
                                <FiEdit size={12} />
                                <span className="hidden sm:inline">
                                  Process
                                </span>
                              </button>
                              <button className="bg-purple-600 text-white px-3 py-1.5 rounded text-xs hover:bg-purple-700 transition-colors duration-200 flex items-center gap-1">
                                <FiTruck size={12} />
                                <span className="hidden sm:inline">Track</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Table Footer */}
                <div className="px-4 md:px-6 py-4 border-t border-gray-200 bg-gray-50">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
                    {/* Showing info */}
                    <div>
                      Showing {currentData.length} of {totalItems} entries
                    </div>

                    {/* Per Page */}
                    <div className="flex items-center gap-2">
                      <span className="hidden sm:inline">Rows per page:</span>
                      <select
                        value={itemsPerPage}
                        onChange={handlePerPageChange}
                        className="bg-white border border-gray-300 rounded px-2 py-1 text-sm"
                      >
                        <option value={8}>8</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value="all">All</option>
                      </select>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center gap-2">
                      <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => p - 1)}
                        className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
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

                      {getPaginationNumbers().map((page, idx) =>
                        page === '...' ? (
                          <span key={idx} className="px-2">
                            …
                          </span>
                        ) : (
                          <button
                            key={idx}
                            onClick={() => setCurrentPage(page)}
                            className={`w-9 h-9 flex items-center justify-center text-sm font-medium rounded-lg border transition-all duration-200 ${
                              currentPage === page
                                ? 'bg-blue-600 text-white'
                                : 'border-gray-300'
                            }`}
                          >
                            {page}
                          </button>
                        )
                      )}

                      <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(p => p + 1)}
                        className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
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
        </div>
      </div>
    </div>
  );
};

export default ReturnParcel;
