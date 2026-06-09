'use client';

import { motion } from 'framer-motion';
import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
} from 'lucide-react';
import { formatCurrency } from '@/utils/helpers';

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
  // Mock data - replace with real data from Supabase
  const stats = [
    {
      label: 'Total Revenue',
      value: formatCurrency(45230),
      icon: <DollarSign size={24} />,
      trend: 12,
    },
    {
      label: 'Total Orders',
      value: '328',
      icon: <ShoppingCart size={24} />,
      trend: 8,
    },
    {
      label: 'Total Customers',
      value: '1,247',
      icon: <Users size={24} />,
      trend: 15,
    },
    {
      label: 'Growth',
      value: '+23%',
      icon: <TrendingUp size={24} />,
      trend: 23,
    },
  ];

  const recentOrders = [
    { id: '#1001', customer: 'John Doe', amount: 299.99, status: 'completed' },
    { id: '#1002', customer: 'Jane Smith', amount: 199.99, status: 'processing' },
    { id: '#1003', customer: 'Mike Johnson', amount: 449.99, status: 'pending' },
    { id: '#1004', customer: 'Sarah Williams', amount: 349.99, status: 'completed' },
    { id: '#1005', customer: 'Tom Brown', amount: 249.99, status: 'processing' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1 className="text-3xl font-light tracking-wide mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back! Here's your business overview.</p>
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
          <div className="h-64 flex items-end justify-around">
            {[65, 78, 90, 81, 70, 85, 95, 88, 92, 86, 79, 95].map((value, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${value}%` }}
                transition={{ delay: i * 0.05, duration: 0.8 }}
                className="w-6 bg-gradient-to-t from-white/50 to-white/20 rounded-t-sm hover:from-white hover:to-white/50 transition-colors"
              />
            ))}
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
          <div className="space-y-4">
            {['Premium Visual Experience', 'Luxury Design', 'Portfolio Set', 'Master Edition'].map(
              (product, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <span className="text-sm font-light">{product}</span>
                  <span className="text-xs bg-white/10 px-2 py-1 rounded-full">
                    {Math.floor(Math.random() * 100) + 20} sales
                  </span>
                </div>
              )
            )}
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
