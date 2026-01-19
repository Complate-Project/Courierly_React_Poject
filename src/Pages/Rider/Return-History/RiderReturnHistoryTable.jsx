import React from 'react';
import {
  FiEye,
  FiEdit,
  FiCheckCircle,
  FiXCircle,
  FiClock,
} from 'react-icons/fi';

// Status badge component
const StatusBadge = ({ status }) => {
  const statusConfig = {
    Pending: { color: 'bg-yellow-100 text-yellow-800', icon: FiClock },
    'In Progress': { color: 'bg-blue-100 text-blue-800', icon: FiClock },
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
const RiderReturnHistoryTable = ({ currentData, startIndex }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1000px]">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
              SL.
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
              Create Date
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
              Invoice No
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
              Merchant Name
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
              Rider Name
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
              Create By
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
              Update By
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
              Security Code
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider border-r border-gray-200">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>

        {/* Table Body with Data */}
        <tbody className="bg-white divide-y divide-gray-200">
          {currentData.map((item, index) => (
            <tr
              key={item.id}
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                {startIndex + index + 1}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                {new Date(item.created_at).toLocaleDateString()}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-blue-600 border-r border-gray-200">
                {item.invoice_id}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                {item.merchant?.name}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                {item.rider?.name}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                {item.creator?.name}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200">
                {item.updator?.name || '-'}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm font-mono text-gray-600 border-r border-gray-200">
                {item.security_code}
              </td>
              <td className="px-4 py-3 whitespace-nowrap border-r border-gray-200">
                <StatusBadge status={item.status} />
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center gap-1">
                  <button className="bg-blue-600 text-white px-2 py-1.5 rounded text-xs hover:bg-blue-700 transition-colors duration-200 flex items-center gap-1">
                    <FiEye size={10} />
                    View
                  </button>
                  <button className="bg-green-600 text-white px-2 py-1.5 rounded text-xs hover:bg-green-700 transition-colors duration-200 flex items-center gap-1">
                    <FiEdit size={10} />
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RiderReturnHistoryTable;
