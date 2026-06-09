# Sightness Expert - Ultra-Premium E-Commerce & Portfolio Platform

A production-grade, ultra-luxury e-commerce and portfolio platform built with cutting-edge technologies and premium design principles.

## 🌟 Features

### Public Website
- **Cinematic Hero Section**: Animated luxury homepage with smooth transitions
- **Premium Product Catalog**: Showcase featured products with discount badges
- **Portfolio Section**: Display creative work and projects
- **Responsive Design**: Mobile-first approach with perfect responsiveness
- **Dark Luxury UI**: Matte black backgrounds with elegant white typography
- **Advanced Animations**: Framer Motion smooth transitions and interactions
- **SEO Optimized**: Complete meta tags and structured data
- **Accessibility**: WCAG compliant with proper semantic HTML

### Admin Dashboard
- **Professional Dashboard**: Shopify-like interface for business management
- **Analytics & Metrics**: Real-time revenue, orders, and customer statistics
- **Product Management**: Full CRUD operations for products
- **Inventory Management**: Stock tracking and management
- **Order Management**: Complete order lifecycle management
- **Customer Management**: Customer profiles and order history
- **Discount Management**: Coupon and discount system
- **Portfolio Manager**: Manage creative portfolio items
- **Content Editor**: Edit homepage and dynamic content
- **Dark Mode Dashboard**: Luxury dark interface for admin panel

### Authentication & Security
- **Supabase Auth**: Secure user authentication
- **Role-Based Access**: Admin and customer roles
- **JWT Tokens**: Secure session management
- **Password Security**: Hashed passwords with Supabase
- **Protected Routes**: Admin-only pages with authentication

### Database
- **Supabase PostgreSQL**: Scalable, reliable database
- **Complete Schema**: Properly designed relational database
- **Row Level Security**: Data protection at database level
- **Automatic Timestamps**: Created/updated tracking
- **Indexed Queries**: Optimized performance

### Deployment
- **Vercel Ready**: One-click deployment
- **GitHub Integration**: Automatic deployments on push
- **Environment Variables**: Secure configuration management
- **Production Build**: Optimized for performance

## 🚀 Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 15 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| State Management | Zustand |
| UI Icons | Lucide React |
| Charts | Recharts |
| Deployment | Vercel |

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (free tier available)
- Vercel account (for deployment)
- GitHub account (for version control)

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/sightness-expert.git
cd sightness-expert
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Set Up Supabase

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Project Settings > API Keys
4. Copy your `URL` and `anon key`
5. Create a new file `.env.local` in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 4. Set Up Database

1. In Supabase, go to SQL Editor
2. Create a new query
3. Copy the entire contents of `database.sql`
4. Paste and run the query
5. Wait for all tables and functions to be created

### 5. Create Admin User

In Supabase Auth:
1. Go to Authentication > Users
2. Click "Add user" 
3. Create an admin user with email and password
4. Update the user's role in the `users` table to `admin`

### 6. Start Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the website.

## 📖 Project Structure

```
sightness-expert/
├── src/
│   ├── app/
│   │   ├── admin/              # Admin dashboard pages
│   │   │   ├── components/     # Admin-specific components
│   │   │   ├── products/       # Product management
│   │   │   ├── customers/      # Customer management
│   │   │   ├── orders/         # Order management
│   │   │   ├── discounts/      # Discount management
│   │   │   ├── portfolio/      # Portfolio management
│   │   │   ├── settings/       # Settings page
│   │   │   └── page.tsx        # Dashboard home
│   │   ├── auth/
│   │   │   ├── login/          # Login page
│   │   │   ├── signup/         # Sign up page
│   │   │   └── forgot-password/ # Password reset
│   │   ├── shop/               # Shop pages
│   │   ├── products/           # Product detail pages
│   │   ├── portfolio/          # Portfolio section
│   │   ├── about/              # About page
│   │   ├── contact/            # Contact page
│   │   ├── cart/               # Shopping cart
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   ├── components/
│   │   ├── Navbar.tsx          # Navigation bar
│   │   ├── Footer.tsx          # Footer
│   │   ├── Hero.tsx            # Hero section
│   │   └── FeaturedProducts.tsx # Featured products grid
│   ├── lib/
│   │   └── supabase.ts         # Supabase client config
│   ├── types/
│   │   └── index.ts            # TypeScript type definitions
│   ├── hooks/
│   │   └── index.ts            # Custom React hooks
│   ├── stores/
│   │   └── cartStore.ts        # Zustand cart store
│   ├── utils/
│   │   └── helpers.ts          # Utility functions
│   └── globals.css             # Global styles
├── public/                     # Static assets
├── database.sql               # Database schema
├── next.config.js             # Next.js configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Dependencies
└── README.md                  # This file
```

## 🔧 Configuration

### Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# App Settings
NEXT_PUBLIC_APP_NAME=Sightness Expert
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 📱 Pages & Routes

### Public Routes
- `/` - Home page
- `/shop` - Product catalog
- `/products/[slug]` - Product detail page
- `/portfolio` - Portfolio showcase
- `/about` - About page
- `/contact` - Contact form
- `/cart` - Shopping cart

### Authentication Routes
- `/auth/login` - Admin login
- `/auth/signup` - User registration
- `/auth/forgot-password` - Password reset

### Admin Routes (Protected)
- `/admin` - Dashboard
- `/admin/products` - Product management
- `/admin/customers` - Customer management
- `/admin/orders` - Order management
- `/admin/discounts` - Discount management
- `/admin/portfolio` - Portfolio management
- `/admin/settings` - Settings

## 🎨 Design System

### Color Palette
- **Primary**: Black (#000000)
- **Secondary**: White (#FFFFFF)
- **Accent**: White with opacity
- **Background**: Matte black with subtle gradients

### Typography
- **Display Font**: Playfair Display (headings)
- **Body Font**: Inter (body text)
- **Weight**: Light to Bold for hierarchy

### Spacing
- Based on 4px grid system
- Generous padding for luxury feel
- Premium whitespace usage

## 🚀 Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

### API Endpoints (To Be Implemented)

```
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/products
GET    /api/products/:id
GET    /api/categories
POST   /api/orders
GET    /api/orders/:id
GET    /api/cart
```

## 🔐 Security Best Practices

1. **Never commit `.env.local`** - It's in `.gitignore`
2. **Use environment variables** for all sensitive data
3. **Enable Row Level Security** in Supabase
4. **Validate input** on both client and server
5. **Use HTTPS** in production
6. **Regular security audits** recommended

## 📊 Database Schema Overview

### Tables
- **users** - User accounts and profiles
- **categories** - Product categories
- **products** - Product inventory
- **orders** - Customer orders
- **order_items** - Order line items
- **coupons** - Discount coupons
- **portfolio_items** - Portfolio projects
- **homepage_content** - Dynamic homepage content
- **newsletter_subscribers** - Email subscribers

### Key Features
- Automatic timestamps (created_at, updated_at)
- Foreign key relationships
- Row Level Security (RLS)
- Optimized indexes
- Computed columns

## 🌐 Deployment on Vercel

### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Sightness Expert premium e-commerce platform"

# Add remote origin
git remote add origin https://github.com/yourusername/sightness-expert.git

# Push to main branch
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Connect your GitHub repository
4. Select the project
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
6. Click "Deploy"

### Step 3: Automatic Deployments

- Every push to `main` branch triggers automatic deployment
- Preview deployments for pull requests
- Instant updates to live website

## 📈 Performance Optimizations

- Image optimization with Next.js Image component
- Code splitting and lazy loading
- CSS-in-JS optimization
- Database query indexing
- Caching strategies
- CDN integration via Vercel

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check .env.local is set correctly
# Verify Supabase project is active
# Test connection with: npm run type-check
```

### Auth Issues
- Ensure user exists in `users` table
- Check user role is set to `admin`
- Verify Supabase Auth is enabled

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Supabase Guide](https://supabase.com/docs)
- [Framer Motion](https://www.framer.com/motion)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Commit with clear messages
5. Push and create a pull request

## 📄 License

This project is proprietary software for Sightness Expert.

## 📞 Support

For support, contact: support@sightnessexpert.com

## 🎯 Roadmap

- [ ] Payment gateway integration (Stripe)
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Mobile app
- [ ] AI-powered recommendations
- [ ] Social commerce integration
- [ ] Advanced search with filters

---

**Made with ❤️ for Sightness Expert**

*Premium by design. Luxury by default. Excellence always.*
