import { supabase } from '@/lib/supabase';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  image_url: string;
  stock: number;
  category_id: string;
  status: 'active' | 'inactive';
  featured: boolean;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
}

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  product: Product;
  quantity: number;
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  payment_status: 'unpaid' | 'paid' | 'refunded';
  stripe_payment_id?: string;
  shipping_address: string;
  created_at: string;
  updated_at: string;
}

// Product functions
export const getProducts = async (limit?: number) => {
  let query = supabase
    .from('products')
    .select('*')
    .eq('status', 'active');

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as Product[];
};

export const getFeaturedProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('status', 'active')
    .eq('featured', true)
    .limit(4);

  if (error) throw error;
  return data as Product[];
};

export const getProductBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data as Product;
};

export const getProductById = async (id: string) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data as Product;
};

export const createProduct = async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()
    .single();

  if (error) throw error;
  return data as Product;
};

export const updateProduct = async (id: string, updates: Partial<Product>) => {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Product;
};

export const deleteProduct = async (id: string) => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

// Category functions
export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*');

  if (error) throw error;
  return data as Category[];
};

// Cart functions
export const getCart = async (userId: string) => {
  const { data, error } = await supabase
    .from('carts')
    .select('*, product:product_id(*)')
    .eq('user_id', userId);

  if (error) throw error;
  return data as CartItem[];
};

export const addToCart = async (userId: string, productId: string, quantity: number = 1) => {
  const { data, error } = await supabase
    .from('carts')
    .upsert(
      {
        user_id: userId,
        product_id: productId,
        quantity,
      },
      { onConflict: 'user_id,product_id' }
    )
    .select()
    .single();

  if (error) throw error;
  return data as CartItem;
};

export const updateCartItem = async (userId: string, productId: string, quantity: number) => {
  const { data, error } = await supabase
    .from('carts')
    .update({ quantity })
    .eq('user_id', userId)
    .eq('product_id', productId)
    .select()
    .single();

  if (error) throw error;
  return data as CartItem;
};

export const removeFromCart = async (userId: string, productId: string) => {
  const { error } = await supabase
    .from('carts')
    .delete()
    .eq('user_id', userId)
    .eq('product_id', productId);

  if (error) throw error;
};

export const clearCart = async (userId: string) => {
  const { error } = await supabase
    .from('carts')
    .delete()
    .eq('user_id', userId);

  if (error) throw error;
};

// Order functions
export const createOrder = async (order: Omit<Order, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('orders')
    .insert([order])
    .select()
    .single();

  if (error) throw error;
  return data as Order;
};

export const getOrders = async (userId: string) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Order[];
};

export const getOrder = async (orderId: string) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single();

  if (error) throw error;
  return data as Order;
};

export const updateOrder = async (id: string, updates: Partial<Order>) => {
  const { data, error } = await supabase
    .from('orders')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Order;
};

// Wishlist functions
export const getWishlist = async (userId: string) => {
  const { data, error } = await supabase
    .from('wishlist')
    .select('*, product:product_id(*)')
    .eq('user_id', userId);

  if (error) throw error;
  return data;
};

export const addToWishlist = async (userId: string, productId: string) => {
  const { data, error } = await supabase
    .from('wishlist')
    .insert([{ user_id: userId, product_id: productId }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const removeFromWishlist = async (userId: string, productId: string) => {
  const { error } = await supabase
    .from('wishlist')
    .delete()
    .eq('user_id', userId)
    .eq('product_id', productId);

  if (error) throw error;
};

// Cart summary
export const getCartSummary = async (userId: string) => {
  const cartItems = await getCart(userId);
  
  const subtotal = cartItems.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity);
  }, 0);

  return {
    items: cartItems,
    itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    subtotal,
    tax: Math.round(subtotal * 0.1 * 100) / 100, // 10% tax
    total: Math.round((subtotal * 1.1) * 100) / 100,
  };
};
