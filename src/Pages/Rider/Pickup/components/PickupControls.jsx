import React from 'react';
import {
  FiSearch,
  FiRefreshCcw,
  FiList,
  FiGrid,
  FiChevronDown,
} from 'react-icons/fi';
import SaveData from './SaveData';

const PickupControls = ({
  searchText,
  setSearchText,
  reload,
  paginatedData,
}) => {
  return (
    <div className="bg-white rounded-xs shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        {/* Left Controls */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full">
              <option>Export All</option>
              <option>Export Selected</option>
              <option>Export Basic</option>
            </select>
            <FiChevronDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 w-full lg:w-auto">
          <div className="relative">
            <select className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full">
              <option>--- Select Merchant ---</option>
              <option>--- Demo Shop ---</option>
              <option>--- Amar Shop Online ---</option>
            </select>
            <FiChevronDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
          </div>

          <button
            onClick={reload}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium flex items-center gap-2 justify-center"
          >
            <FiRefreshCcw size={16} />
            Load Data
          </button>

          <div className="relative flex-1 lg:flex-none">
            <FiSearch
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full lg:w-64"
            />
          </div>

          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button className="p-2 rounded-md hover:bg-white hover:shadow-sm transition-all duration-300">
              <FiRefreshCcw size={16} className="text-gray-600" />
            </button>
            <button className="p-2 rounded-md bg-white shadow-sm transition-all duration-300">
              <FiList size={16} className="text-blue-600" />
            </button>
            <button className="p-2 rounded-md hover:bg-white hover:shadow-sm transition-all duration-300">
              <FiGrid size={16} className="text-gray-600" />
            </button>

            <SaveData data={paginatedData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickupControls;
