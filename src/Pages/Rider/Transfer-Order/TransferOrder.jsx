import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  FiRefreshCcw,
  FiList,
  FiGrid,
  FiFilter,
  FiSearch,
  FiChevronDown,
  FiEye,
  FiEdit,
  FiTruck,
  FiMapPin,
  FiSend,
} from 'react-icons/fi';
import Spinner from '../../../Shared/Spinier/Spinier';

const TransferOrder = () => {
  const [isGridView, setIsGridView] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8); // dynamic items per page

  const token = localStorage.getItem('token'); // token from localStorage

  // Load data
  useEffect(() => {
    setLoading(true);
    axios
      .get('https://courierly.demo-bd.com/api/transfer-parcel-list', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const mappedData = res.data.map((item) => ({
          id: item.id,
          date: item.created_at ? item.created_at.split('T')[0] : '',
          invoiceId: item.invoice_id,
          pickupAddress: item.sender?.address || 'N/A',
          deliveryAddress: item.receiver?.address || 'N/A',
          type: item.type === 'return' ? 'Inter-City' : 'Intra-City',
        }));

        setTableData(mappedData);
      })
      .catch((error) => {
        console.error('Transfer Parcel API Error:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  // Reset current page when itemsPerPage changes
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = tableData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(tableData.length / itemsPerPage);



  // Type badge component
  const TypeBadge = ({ type }) => {
    const typeConfig = {
      'Inter-City': { color: 'bg-purple-100 text-purple-800', icon: FiSend },
      'Intra-City': { color: 'bg-orange-100 text-orange-800', icon: FiTruck },
    };

    const config = typeConfig[type] || typeConfig['Intra-City'];
    const IconComponent = config.icon;

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
      >
        <IconComponent size={12} className="mr-1" />
        {type}
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
          <p className="text-gray-900">{item.date}</p>
        </div>
        <div>
          <span className="font-medium text-gray-500">Invoice ID:</span>
          <p className="text-blue-600 font-medium">{item.invoiceId}</p>
        </div>
        <div>
          <span className="font-medium text-gray-500">Type:</span>
          <TypeBadge type={item.type} />
        </div>
        <div className="col-span-2">
          <span className="font-medium text-gray-500 flex items-center gap-1">
            <FiMapPin size={12} />
            Pickup:
          </span>
          <p className="text-gray-900 text-sm mt-1">{item.pickupAddress}</p>
        </div>
        <div className="col-span-2">
          <span className="font-medium text-gray-500 flex items-center gap-1">
            <FiMapPin size={12} />
            Delivery:
          </span>
          <p className="text-gray-900 text-sm mt-1">{item.deliveryAddress}</p>
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
          Edit
        </button>
        <button className="flex-1 min-w-[100px] bg-purple-600 text-white px-2 py-2 rounded text-xs hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center gap-1">
          <FiSend size={12} />
          Transfer
        </button>
      </div>
    </div>
  );

  return (
    <div>
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
          Transfer Order Management
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Manage and track transfer orders efficiently
        </p>
      </div>

      {/* Control Panel */}
      <div className="bg-white rounded-t-lg shadow-sm border border-gray-200 p-4 md:p-6 ">
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
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-64">
              <FiSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search transfer orders..."
                className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
            </div>

            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setIsGridView(false)}
                className={`p-2 rounded-md transition-all duration-300 ${
                  !isGridView ? 'bg-white shadow-sm' : 'hover:bg-white hover:shadow-sm'
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
                  isGridView ? 'bg-white shadow-sm' : 'hover:bg-white hover:shadow-sm'
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
              Transfer Orders ({tableData.length})
            </h2>
          </div>
          {currentData.map((item, index) => (
            <MobileCard key={item.id} item={item} index={index} />
          ))}
        </div>
      )}

      {/* Tablet and Desktop Table View */}
      <div className={`${isGridView ? 'hidden md:block' : 'block'}`}>
        <div className="bg-white rounded-b-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="px-4 md:px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              Transfer Order List
              <span className="text-sm font-normal text-gray-500">
                ({tableData.length} orders)
              </span>
            </h2>
          </div>

          {loading ? (
            <Spinner />
          ) : (
            <>
              {/* Table Container */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] lg:min-w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        SL.
                      </th>
                      <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Invoice ID
                      </th>
                      <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Pickup Address
                      </th>
                      <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Delivery Address
                      </th>
                      <th className="px-4 md:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Type
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
                          {indexOfFirstItem + index + 1}
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.date}
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                          {item.invoiceId}
                        </td>
                        <td className="px-4 md:px-6 py-4 text-sm text-gray-900 max-w-xs">
                          <div className="flex items-start gap-2">
                            <FiMapPin
                              size={14}
                              className="text-gray-400 mt-0.5 flex-shrink-0"
                            />
                            <span className="truncate" title={item.pickupAddress}>
                              {item.pickupAddress}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 md:px-6 py-4 text-sm text-gray-900 max-w-xs">
                          <div className="flex items-start gap-2">
                            <FiMapPin
                              size={14}
                              className="text-gray-400 mt-0.5 flex-shrink-0"
                            />
                            <span className="truncate" title={item.deliveryAddress}>
                              {item.deliveryAddress}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                          <TypeBadge type={item.type} />
                        </td>
                        <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-wrap gap-1">
                            <button className="bg-blue-600 text-white px-3 py-1.5 rounded text-xs hover:bg-blue-700 transition-colors duration-200 flex items-center gap-1">
                              <FiEye size={12} />
                              <span className="hidden sm:inline">View</span>
                            </button>
                            <button className="bg-green-600 text-white px-3 py-1.5 rounded text-xs hover:bg-green-700 transition-colors duration-200 flex items-center gap-1">
                              <FiEdit size={12} />
                              <span className="hidden sm:inline">Edit</span>
                            </button>
                            <button className="bg-purple-600 text-white px-3 py-1.5 rounded text-xs hover:bg-purple-700 transition-colors duration-200 flex items-center gap-1">
                              <FiSend size={12} />
                              <span className="hidden sm:inline">Transfer</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              <div className="flex justify-between items-center py-4 px-4 md:px-6 text-sm text-gray-600">
                <div>Page {currentPage} of {totalPages}</div>
              
                <div className="flex gap-2">
                  
         <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative w-32">
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              >
                <option value={8}>8 per page</option>
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
                <option value={tableData.length}>All</option>
              </select>
              <FiChevronDown
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
            </div>
          </div>
                    <div className="flex items-center gap-2">
                  {/* Previous */}
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => p - 1)}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </button>

                  {/* First Page */}
                  <button
                    onClick={() => setCurrentPage(1)}
                    className={`w-9 h-9 flex items-center justify-center text-sm font-medium rounded-lg border transition-all duration-200 ${currentPage === 1 ? 'bg-blue-600 text-white' : 'border-gray-300'}`}
                  >
                    1
                  </button>

                  {/* Dots before current */}
                  {currentPage > 2 && <span className="px-2">...</span>}

                  {/* Current Page */}
                  {currentPage !== 1 && currentPage !== totalPages && (
                    <button className="w-9 h-9 flex items-center justify-center text-sm font-medium rounded-lg border transition-all duration-200 bg-blue-600 text-white">
                      {currentPage}
                    </button>
                  )}

                  {/* Dots after current */}
                  {currentPage < totalPages - 1 && <span className="px-2">...</span>}

                  {/* Last Page */}
                  {totalPages > 1 && (
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      className={`w-9 h-9 flex items-center justify-center text-sm font-medium rounded-lg border transition-all duration-200 ${currentPage === totalPages ? 'bg-blue-600 text-white' : ' border-gray-300'}`}
                    >
                      {totalPages}
                    </button>
                  )}

                  {/* Next */}
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => p + 1)}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
                  >
                    Next
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
  );
};

export default TransferOrder;
