import React from 'react';

const PickupTable = ({ data, currentPage, itemsPerPage }) => {
  if (!data || data.length === 0)
    return <div className="text-center py-6 text-gray-500">No data found</div>;

  return (
    <table className="w-full mb-4">
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
        {data.map((item, i) => (
          <tr key={item.tracking_id} className="hover:bg-gray-50 transition">
            <td className="px-6 py-4 text-sm">
              {(currentPage - 1) * itemsPerPage + i + 1}
            </td>
            <td className="px-6 py-4 text-sm">
              {item.created_at?.slice(0, 10)}
            </td>
            <td className="px-6 py-4 text-sm text-blue-600">
              {item.tracking_id}
            </td>
            <td className="px-6 py-4 text-sm">{item.customer_name}</td>
            <td className="px-6 py-4 text-sm">{item.mobile || '-'}</td>
            <td className="px-6 py-4 text-sm">{item.address}</td>
            <td className="px-6 py-4 text-sm">
              <button className="text-blue-600 hover:underline">View</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PickupTable;
