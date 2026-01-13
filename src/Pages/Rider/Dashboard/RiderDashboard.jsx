import React, { useEffect, useState } from 'react';
import {
  FiPackage,
  FiCheckCircle,
  FiClock,
  FiTruck,
  FiAlertCircle,
  FiMap,
  FiUser,
  FiRefreshCcw,
  FiRepeat,
  FiCalendar,
  FiTrendingUp,
  FiPercent,
} from 'react-icons/fi';
import useTitle from '../../../Hooks/useTitle';
import axios from 'axios';
import Spinier from '../../../Shared/Spinier/Spinier';
import RiderProfile from '../../../Components/Rider/Model/Profile/RiderProfile';

const RiderDashboard = () => {
  useTitle('Rider Dashboard');
  const [timeRange, setTimeRange] = useState('today');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState({});

  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');

      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/rider-dashboard`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(res.data);
    } catch (error) {
      console.error('Dashboard fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const stats = [
    {
      title: 'Today Pickup Request',
      value: data?.today_pickup_request ?? 0,
      icon: <FiPackage className="w-6 h-6" />,
      color: 'bg-blue-500',
      description: 'Total pickup requests today',
    },
    {
      title: 'Today Delivery Request',
      value: data?.today_delivery_request ?? 0,
      icon: <FiTruck className="w-6 h-6" />,
      color: 'bg-green-500',
      description: 'Delivery requests for today',
    },
    {
      title: 'Today Return Request',
      value: data?.today_return_requset ?? 0,
      icon: <FiRefreshCcw className="w-6 h-6" />,
      color: 'bg-red-500',
      description: 'Return requests today',
    },
    {
      title: 'Today Transfer Request',
      value: data?.today_transfer_request ?? 0,
      icon: <FiRepeat className="w-6 h-6" />,
      color: 'bg-purple-500',
      description: 'Transfer requests today',
    },
    {
      title: 'Today Delivery',
      value: data?.today_delivery ?? 0,
      icon: <FiCheckCircle className="w-6 h-6" />,
      color: 'bg-teal-500',
      description: 'Completed deliveries today',
    },
    {
      title: 'Monthly Delivery',
      value: data?.monthly_delivered ?? 0,
      icon: <FiCalendar className="w-6 h-6" />,
      color: 'bg-indigo-500',
      description: 'Deliveries this month',
    },
    {
      title: 'Total Pickup Request',
      value: data?.total_pickup_request ?? 0,
      icon: <FiPackage className="w-6 h-6" />,
      color: 'bg-blue-600',
      description: 'All pickup requests',
    },
    {
      title: 'Total Delivery Request',
      value: data?.total_delivery_request ?? 0,
      icon: <FiTruck className="w-6 h-6" />,
      color: 'bg-green-600',
      description: 'All delivery requests',
    },
    {
      title: 'Total Return Request',
      value: data?.total_return ?? 0,
      icon: <FiAlertCircle className="w-6 h-6" />,
      color: 'bg-red-600',
      description: 'All return requests',
    },
    {
      title: 'Total Transfer Request',
      value: data?.total_transfer_request ?? 0,
      icon: <FiRepeat className="w-6 h-6" />,
      color: 'bg-purple-600',
      description: 'All transfer requests',
    },
    {
      title: 'Pickup Collect Ratio',
      value: data?.pickUp_collect_ratio
        ? `${data.pickUp_collect_ratio}%`
        : '0%',
      icon: <FiTrendingUp className="w-6 h-6" />,
      color: 'bg-orange-500',
      description: 'Pickup success ratio',
    },
    {
      title: 'Success Delivery Ratio',
      value: data?.success_delivery_ratio
        ? `${data.success_delivery_ratio}%`
        : '0%',
      icon: <FiPercent className="w-6 h-6" />,
      color: 'bg-gray-500',
      description: 'Delivery success ratio',
    },
  ];

  if (loading) {
    return <Spinier></Spinier>;
  }

  return (
    <div className="min-h-[calc(100vh-220px)] ">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-main">
              Rider Dashboard
            </h1>
            <p className="text-text-muted">
              Welcome back! Here's what's happening today.
            </p>
          </div>
          {/*  */}
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              {['Today', 'Weekly', 'Monthly', 'Yearly'].map(period => (
                <button
                  key={period}
                  onClick={() => setTimeRange(period.toLowerCase())}
                  className={`px-4 py-2 text-sm font-medium border-r border-gray-300 last:border-r-0 transition-colors ${
                    timeRange === period.toLowerCase()
                      ? 'bg-btn-secondary hover:bg-btn-secondary-hover text-text-button'
                      : 'bg-bg text-text-muted hover:bg-gray-50'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-bg rounded-md shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-muted">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-text-main mt-1">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500 mt-2">{stat.description}</p>
              </div>
              <div className={`${stat.color} rounded-md p-3 text-white`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Quick Actions */}
      <div className="bg-bg rounded-md shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-text-main mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="flex items-center justify-center space-x-2 p-4 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors">
            <FiMap className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-700">View Routes</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
            <FiPackage className="w-5 h-5 text-green-600" />
            <span className="font-medium text-green-700">Start Delivery</span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center space-x-2 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
          >
            <FiUser className="w-5 h-5 text-purple-600" />
            <span className="font-medium text-purple-700">My Profile</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
            <FiClock className="w-5 h-5 text-orange-600" />
            <span className="font-medium text-orange-700">
              Delivery History
            </span>
          </button>
        </div>
      </div>
      {/* Modal */}
      <RiderProfile
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="My Profile"
      ></RiderProfile>
    </div>
  );
};

export default RiderDashboard;
