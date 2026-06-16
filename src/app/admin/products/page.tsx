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
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
  });

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.stock || !formData.category) {
      alert('Please fill in all fields');
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      category: formData.category,
      status: 'active',
    };

    setProducts([...products, newProduct]);
    setFormData({
      name: '',
      price: '',
      stock: '',
      category: '',
    });
    setShowForm(false);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light tracking-wide mb-2">Products</h1>
          <p className="text-gray-400">Manage your product inventory and catalog</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {/* Add Product Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4"
        >
          <h2 className="text-xl font-light tracking-wide mb-4">Add New Product</h2>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-white outline-none transition-colors"
              />
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-white outline-none transition-colors"
              />
              <input
                type="number"
                placeholder="Stock Quantity"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-white outline-none transition-colors"
              />
              <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-white outline-none transition-colors"
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Add Product
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 bg-white/10 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

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

      {/* Products Table or Empty State */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 border border-white/10 rounded-lg overflow-hidden"
      >
        {filteredProducts.length > 0 ? (
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
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="p-2 hover:bg-red-400/10 text-red-400 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            {products.length === 0 ? (
              <>
                <h3 className="text-lg font-light mb-2">No products yet</h3>
                <p className="font-light">Start by adding your first product using the form above</p>
              </>
            ) : (
              <>
                <h3 className="text-lg font-light mb-2">No results found</h3>
                <p className="font-light">Try adjusting your search terms</p>
              </>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
