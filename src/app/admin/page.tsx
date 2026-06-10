'use client';

import { motion } from 'framer-motion';
import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
} from 'lucide-react';
import { formatCurrency } from '@/utils/helpers';
import { format } from 'date-fns';

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  trend?: number;
}

const StatCard = ({ label, value, icon, trend }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5 }}
    className="bg-white/5 border border-white/10 rounded-lg p-6 hover:border-white/20 transition-colors"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      {trend && (
        <span className={`text-sm font-semibold ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      )}
    </div>
    <p className="text-gray-400 text-sm font-light mb-1">{label}</p>
    <p className="text-2xl font-light">{value}</p>
  </motion.div>
);

export default function AdminDashboard() {
  // Get today's date
  const today = new Date();
  const formattedDate = format(today, 'EEEE, MMMM d, yyyy');

  // Mock data - replace with real data from Supabase
  const stats = [
    {
      label: 'Total Revenue',
      value: formatCurrency(0),
      icon: <DollarSign size={24} />,
      trend: 0,
    },
    {
      label: 'Total Orders',
      value: '0',
      icon: <ShoppingCart size={24} />,
      trend: 0,
    },
    {
      label: 'Total Customers',
      value: '0',
      icon: <Users size={24} />,
      trend: 0,
    },
    {
      label: 'Growth',
      value: '0%',
      icon: <TrendingUp size={24} />,
      trend: 0,
    },
  ];

  const recentOrders = [
    { id: '#1001', customer: 'No orders yet', amount: 0, status: 'pending' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className="text-3xl font-light tracking-wide mb-2">Dashboard</h1>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <p className="text-gray-400">Welcome back! Here's your business overview.</p>
          <p className="text-gray-500 text-sm font-light mt-2 sm:mt-0">{formattedDate}</p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white/5 border border-white/10 rounded-lg p-6"
        >
          <h2 className="text-lg font-light mb-6 tracking-wide">Sales Overview</h2>
          <div className="h-64 flex items-center justify-center text-gray-400">
            <p className="font-light">No sales data yet</p>
          </div>
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 border border-white/10 rounded-lg p-6"
        >
          <h2 className="text-lg font-light mb-6 tracking-wide">Top Products</h2>
          <div className="space-y-4 text-gray-400 font-light">
            <p>No products yet. Add products from the Products page.</p>
          </div>
        </motion.div>
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/5 border border-white/10 rounded-lg p-6"
      >
        <h2 className="text-lg font-light mb-6 tracking-wide">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 font-light">Order ID</th>
                <th className="text-left py-3 px-4 font-light">Customer</th>
                <th className="text-left py-3 px-4 font-light">Amount</th>
                <th className="text-left py-3 px-4 font-light">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="py-3 px-4 font-light text-white/80">{order.id}</td>
                  <td className="py-3 px-4 font-light text-white/80">{order.customer}</td>
                  <td className="py-3 px-4 font-light text-white/80">
                    {formatCurrency(order.amount)}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-3 py-1 text-xs rounded-full font-semibold ${
                        order.status === 'completed'
                          ? 'bg-green-400/20 text-green-400'
                          : order.status === 'processing'
                          ? 'bg-blue-400/20 text-blue-400'
                          : 'bg-yellow-400/20 text-yellow-400'
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
