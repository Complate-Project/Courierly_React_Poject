export const PickupCardView = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pb-2">
      {data.map(item => (
        <div
          key={item._id}
          className="group bg-white rounded-md border border-gray-200 p-6 shadow-sm transition-all duration-300 hover:border-blue-100 "
        >
          {/* Header Section */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {item.customer_name}
              </h3>
              <div className="flex items-center mt-1">
                <svg
                  className="w-4 h-4 text-gray-400 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                  />
                </svg>
                <span className="text-sm font-medium text-gray-600">
                  Tracking:{' '}
                  <span className="text-blue-600">{item.tracking_id}</span>
                </span>
              </div>
            </div>
            <div className="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">
              {item.created_at?.slice(0, 10)}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="bg-gray-100 p-2 rounded-lg mr-3">
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500">Phone Number</p>
                <p className="font-medium text-gray-900">
                  {item.customer_phone}
                </p>
              </div>
            </div>

            {/* Optional Address Field - Add if available in data */}
            {item.address && (
              <div className="flex items-center">
                <div className="bg-gray-100 p-2 rounded-lg mr-3">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Pickup Location</p>
                  <p className="text-sm text-gray-900 line-clamp-1">
                    {item.address}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer with Action Buttons */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
            <span className="text-xs text-gray-500">Ready for pickup</span>
            <div className="flex space-x-2">
              <button className="text-xs text-gray-600 hover:text-blue-600 font-medium px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
                View Details
              </button>
              <button className="text-xs bg-blue-600 text-white hover:bg-blue-700 font-medium px-3 py-1.5 rounded-lg transition-colors">
                Schedule
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
