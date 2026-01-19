import React from 'react';

const AutoPickupTable = ({ data }) => {
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
        {data.map((item, i) => (
          <tr key={item.tracking_id} className="hover:bg-gray-50 transition">
            <td className="px-6 py-4 text-sm">{i + 1}</td>
            <td className="px-6 py-4 text-sm text-blue-600">
              {item.tracking_id}
            </td>
            <td className="px-6 py-4 text-sm">{item.pickup_date || '-'}</td>
            <td className="px-6 py-4 text-sm">{item.customer_name}</td>
            <td className="px-6 py-4 text-sm">{item.mobile || '-'}</td>
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
              <button className="text-blue-600 hover:underline">View</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AutoPickupTable;
