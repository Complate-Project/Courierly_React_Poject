import React from 'react';

const PickupTabs = ({ activeTab, setActiveTab }) => (
  <div className="mb-6">
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
);

export default PickupTabs;
