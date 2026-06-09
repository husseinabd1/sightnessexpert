'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  status: 'active' | 'inactive';
}

export default function ProductsPage() {
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Premium Visual Experience',
      price: 299.99,
      stock: 45,
      category: 'Visual',
      status: 'active',
    },
    {
      id: '2',
      name: 'Luxury Design Collection',
      price: 199.99,
      stock: 32,
      category: 'Design',
      status: 'active',
    },
    {
      id: '3',
      name: 'Exclusive Portfolio Set',
      price: 249.99,
      stock: 0,
      category: 'Portfolio',
      status: 'inactive',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light tracking-wide mb-2">Products</h1>
          <p className="text-gray-400">Manage your product inventory and catalog</p>
        </div>
        <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative"
      >
        <Search className="absolute left-4 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-3 focus:border-white outline-none transition-colors"
        />
      </motion.div>

      {/* Products Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 border border-white/10 rounded-lg overflow-hidden"
      >
        <table className="w-full text-sm">
          <thead className="bg-white/10 border-b border-white/10">
            <tr>
              <th className="text-left py-4 px-6 font-light">Product Name</th>
              <th className="text-left py-4 px-6 font-light">Category</th>
              <th className="text-left py-4 px-6 font-light">Price</th>
              <th className="text-left py-4 px-6 font-light">Stock</th>
              <th className="text-left py-4 px-6 font-light">Status</th>
              <th className="text-left py-4 px-6 font-light">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="py-4 px-6 font-light">{product.name}</td>
                <td className="py-4 px-6 text-gray-400">{product.category}</td>
                <td className="py-4 px-6 font-semibold">${product.price.toFixed(2)}</td>
                <td className="py-4 px-6">
                  <span
                    className={`text-sm font-light ${
                      product.stock > 0 ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {product.stock} units
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                      product.status === 'active'
                        ? 'bg-green-400/20 text-green-400'
                        : 'bg-gray-400/20 text-gray-400'
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
                <td className="py-4 px-6 flex gap-2">
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <Edit2 size={16} />
                  </button>
                  <button className="p-2 hover:bg-red-400/10 text-red-400 rounded-lg transition-colors">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
