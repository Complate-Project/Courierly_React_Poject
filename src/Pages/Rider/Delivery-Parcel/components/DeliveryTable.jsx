import { FiTruck, FiCalendar, FiPackage, FiCornerUpLeft } from 'react-icons/fi';

const DeliveryTable = ({ data, currentPage, rowsPerPage }) => (
  <table className="w-full">
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
      {data.map((item, index) => (
        <tr
          key={item.id}
          className="hover:bg-gray-50 transition-colors duration-200"
        >
          <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {(currentPage - 1) * rowsPerPage + index + 1}
          </td>
          <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
            {item.trackingId}
          </td>
          <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            <div>
              <div className="font-medium">{item.merchantName}</div>
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
              <div className="font-medium">{item.customerName}</div>
              <div className="text-gray-500 text-xs xl:hidden">
                {item.customerNumber}
              </div>
            </div>
          </td>
          <td className="hidden xl:table-cell px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {item.customerNumber}
          </td>
          <td className="hidden 2xl:table-cell px-4 md:px-6 py-4 text-sm text-gray-900">
            <div className="max-w-xs truncate" title={item.customerAddress}>
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
                <span className="hidden sm:inline">Reschedule</span>
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
);

export default DeliveryTable;
