'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface StoreProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  stock: number;
  category: string;
  image: string;
  slug: string;
  description: string;
  featured: boolean;
  active: boolean;
}

interface ProductStore {
  products: StoreProduct[];
  addProduct: (product: Omit<StoreProduct, 'id' | 'slug'>) => void;
  updateProduct: (id: string, updates: Partial<StoreProduct>) => void;
  deleteProduct: (id: string) => void;
  getProductBySlug: (slug: string) => StoreProduct | undefined;
  getFeaturedProducts: () => StoreProduct[];
  getActiveProducts: () => StoreProduct[];
}

const defaultProducts: StoreProduct[] = [
  {
    id: '1',
    name: 'Premium Visual Experience',
    price: 299,
    originalPrice: 399,
    stock: 15,
    category: 'Visual',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=500&h=500&fit=crop',
    slug: 'premium-visual-experience',
    description: 'Experience premium visual clarity with our flagship product.',
    featured: true,
    active: true,
  },
  {
    id: '2',
    name: 'Luxury Design Collection',
    price: 199,
    stock: 20,
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1598930113854-38c6a72d0e0f?w=500&h=500&fit=crop',
    slug: 'luxury-design-collection',
    description: 'A curated collection of luxury designs.',
    featured: false,
    active: true,
  },
  {
    id: '3',
    name: 'Exclusive Portfolio Set',
    price: 249,
    originalPrice: 349,
    stock: 10,
    category: 'Portfolio',
    image: 'https://images.unsplash.com/photo-1606115915156-f7e3f0d3c7ba?w=500&h=500&fit=crop',
    slug: 'exclusive-portfolio-set',
    description: 'Our exclusive portfolio set featuring limited edition pieces.',
    featured: true,
    active: true,
  },
  {
    id: '4',
    name: 'Creative Master Edition',
    price: 349,
    stock: 8,
    category: 'Creative',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&h=500&fit=crop',
    slug: 'creative-master-edition',
    description: 'The master edition for creative professionals.',
    featured: false,
    active: true,
  },
  {
    id: '5',
    name: 'Premium Collection Vol 2',
    price: 279,
    originalPrice: 399,
    stock: 12,
    category: 'Collection',
    image: 'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=500&h=500&fit=crop',
    slug: 'premium-collection-vol-2',
    description: 'Volume 2 of our premium collection with enhanced features.',
    featured: false,
    active: true,
  },
  {
    id: '6',
    name: 'Signature Series',
    price: 229,
    stock: 18,
    category: 'Series',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop',
    slug: 'signature-series',
    description: 'Our signature series representing the pinnacle of craftsmanship.',
    featured: false,
    active: true,
  },
  {
    id: '7',
    name: 'Elite Luxury Pack',
    price: 449,
    stock: 5,
    category: 'Elite',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
    slug: 'elite-luxury-pack',
    description: 'The elite pack for those who accept nothing but the finest.',
    featured: false,
    active: true,
  },
  {
    id: '8',
    name: 'Premium Essentials',
    price: 179,
    stock: 25,
    category: 'Essentials',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
    slug: 'premium-essentials',
    description: 'Essential premium products for everyday luxury.',
    featured: false,
    active: true,
  },
];

const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: defaultProducts,

      addProduct: (product) => {
        const newProduct: StoreProduct = {
          ...product,
          id: Date.now().toString(),
          slug: slugify(product.name),
        };
        set((state) => ({ products: [...state.products, newProduct] }));
      },

      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updates, slug: updates.name ? slugify(updates.name) : p.slug } : p
          ),
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));
      },

      getProductBySlug: (slug) => {
        return get().products.find((p) => p.slug === slug);
      },

      getFeaturedProducts: () => {
        return get().products.filter((p) => p.featured && p.active);
      },

      getActiveProducts: () => {
        return get().products.filter((p) => p.active);
      },
    }),
    {
      name: 'product-store',
    }
  )
);
