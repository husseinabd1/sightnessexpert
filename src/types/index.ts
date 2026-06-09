// User types
export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  role: 'admin' | 'customer';
  created_at: string;
  updated_at: string;
}

// Product types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  category_id: string;
  image_url: string;
  images: string[];
  stock: number;
  sku: string;
  slug: string;
  featured: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
}

// Category types
export interface Category {
  id: string;
  name: string;
  description?: string;
  slug: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

// Order types
export interface Order {
  id: string;
  user_id: string;
  total_price: number;
  discount_amount?: number;
  coupon_code?: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shipping_address: Address;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  total: number;
}

// Address type
export interface Address {
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone: string;
}

// Coupon types
export interface Coupon {
  id: string;
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  valid_from: string;
  valid_until: string;
  max_uses?: number;
  current_uses: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

// Portfolio Item types
export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image_url: string;
  images: string[];
  category: string;
  created_at: string;
  updated_at: string;
}

// Homepage Content types
export interface HomepageContent {
  id: string;
  hero_title: string;
  hero_subtitle: string;
  hero_image_url: string;
  about_title: string;
  about_description: string;
  features: Feature[];
  updated_at: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

// Newsletter subscription
export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribed_at: string;
  active: boolean;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
