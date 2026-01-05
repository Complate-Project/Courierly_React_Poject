import React from 'react';
import { useAuth } from '../../../../Hooks/useAuth';

const RiderProfile = ({ isOpen, onClose, rider, title = 'Rider Profile' }) => {
  if (!isOpen) return null;
   const { user, userRole } = useAuth();
   console.log(user,userRole)

  // Sample rider data - in real app, this would come from props
  const riderData = rider || {
    name: 'Monir Ahamed',
    email: 'rider@.com',
    phone: '01770406534',
    rating: 4.8,
    totalDelivery: 342,
    memberSince: 'Jan 2022',
    vehicleType: 'Motorcycle',
    vehicleNumber: 'ABC-123',
    status: 'Available',
    profileImage:
      '',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 relative">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-white">{title}</h2>
              <p className="text-blue-100">Driver Information</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            >
              <span className="text-2xl">×</span>
            </button>
          </div>

          {/* Profile Avatar */}
          <div className="flex items-center mt-6">
            <div className="relative">
              <img
                src={user.photo || 'https://img.freepik.com/premium-vector/cheerful-delivery-rider-scootera-playful-vector-cartoon-illustration-food-service_1318202-55.jpg'}
                alt={riderData.name}
                className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
              />
              <div
                className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${
                  riderData.status === 'Available'
                    ? 'bg-green-500'
                    : 'bg-gray-400'
                }`}
              />
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-bold text-white">{user.name}</h3>
              <div className="flex items-center mt-1">
                <span className="text-yellow-300 text-lg">★</span>
                <span className="text-white ml-1 font-semibold">
                  {riderData.rating}
                </span>
                <span className="text-blue-200 ml-2">
                  ({riderData.totalRides} rides)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-3 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-700">
                {riderData.totalDelivery}
              </div>
              <div className="text-sm text-gray-600">Total Delivery</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-xl">
              <div className="text-2xl font-bold text-green-700">
                {riderData.rating}
              </div>
              <div className="text-sm text-gray-600">Rating</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-xl">
              <div className="text-2xl font-bold text-purple-700">
                {riderData.memberSince}
              </div>
              <div className="text-sm text-gray-600">Member Since</div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800 border-b border-gray-200  pb-2">
              Contact Information
            </h4>

            <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-blue-600">📧</span>
              </div>
              <div>
                <div className="text-sm text-gray-500">Email</div>
                <div className="font-medium">{user.email}</div>
              </div>
            </div>

            <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-green-600">📱</span>
              </div>
              <div>
                <div className="text-sm text-gray-500">Phone</div>
                <div className="font-medium">{user.phone}</div>
              </div>
            </div>

            <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-purple-600">🏍️</span>
              </div>
              <div>
                <div className="text-sm text-gray-500">Vehicle</div>
                <div className="font-medium">
                  {riderData.vehicleType} • {riderData.vehicleNumber}
                </div>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold">Current Status</div>
                <div className="text-sm text-gray-600">
                  Rider is currently {riderData.status.toLowerCase()}
                </div>
              </div>
              <div
                className={`px-4 py-2 rounded-full font-medium ${
                  riderData.status === 'Available'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {riderData.status}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200  flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-5 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RiderProfile;
