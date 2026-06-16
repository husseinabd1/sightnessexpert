'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Search, Save, X, ImageIcon } from 'lucide-react';
import { useProductStore, StoreProduct } from '@/stores/productStore';

export default function ProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useProductStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<StoreProduct | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    originalPrice: '',
    stock: '',
    category: '',
    image: '',
    description: '',
    featured: false,
    active: true,
  });

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      originalPrice: '',
      stock: '',
      category: '',
      image: '',
      description: '',
      featured: false,
      active: true,
    });
    setEditingProduct(null);
  };

  const handleEdit = (product: StoreProduct) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || '',
      stock: product.stock.toString(),
      category: product.category,
      image: product.image,
      description: product.description,
      featured: product.featured,
      active: product.active,
    });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.stock || !formData.category || !formData.image) {
      alert('Please fill in all required fields');
      return;
    }

    const productData = {
      name: formData.name,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : undefined,
      stock: parseInt(formData.stock),
      category: formData.category,
      image: formData.image,
      description: formData.description,
      featured: formData.featured,
      active: formData.active,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }

    resetForm();
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
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
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
          className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {/* Add/Edit Product Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-light tracking-wide">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={() => {
                  resetForm();
                  setShowForm(false);
                }}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Product Name *"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-white outline-none transition-colors"
                  required
                />
                <input
                  type="number"
                  placeholder="Price *"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-white outline-none transition-colors"
                  required
                />
                <input
                  type="number"
                  placeholder="Original Price (optional)"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-white outline-none transition-colors"
                />
                <input
                  type="number"
                  placeholder="Stock Quantity *"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-white outline-none transition-colors"
                  required
                />
                <input
                  type="text"
                  placeholder="Category *"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-white outline-none transition-colors"
                  required
                />
                <input
                  type="text"
                  placeholder="Image URL *"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-white outline-none transition-colors"
                  required
                />
              </div>
              <textarea
                placeholder="Product Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:border-white outline-none transition-colors resize-none"
              />
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Featured</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Active</span>
                </label>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Save size={18} />
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setShowForm(false);
                  }}
                  className="flex-1 bg-white/10 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-3 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-3 focus:border-white outline-none transition-colors"
        />
      </div>

      {/* Products Table */}
      <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
        {filteredProducts.length > 0 ? (
          <table className="w-full text-sm">
            <thead className="bg-white/10 border-b border-white/10">
              <tr>
                <th className="text-left py-4 px-6 font-light">Image</th>
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
                  <td className="py-4 px-6">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/5">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon size={16} className="text-gray-600" />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6 font-light">
                    <div className="flex items-center gap-2">
                      {product.name}
                      {product.featured && (
                        <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-0.5 rounded-full">Featured</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-400">{product.category}</td>
                  <td className="py-4 px-6 font-semibold">
                    ${product.price.toFixed(2)}
                    {product.originalPrice && (
                      <span className="text-gray-500 line-through ml-2 text-xs">${product.originalPrice.toFixed(2)}</span>
                    )}
                  </td>
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
                        product.active
                          ? 'bg-green-400/20 text-green-400'
                          : 'bg-gray-400/20 text-gray-400'
                      }`}
                    >
                      {product.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 hover:bg-red-400/10 text-red-400 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <h3 className="text-lg font-light mb-2">No products found</h3>
            <p className="font-light">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </div>
  );
}
