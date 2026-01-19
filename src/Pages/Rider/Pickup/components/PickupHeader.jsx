import React from 'react';

const PickupHeader = () => {
  return (
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
    </div>
  );
};

export default PickupHeader;
