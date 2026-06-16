# Sightness Expert Development Instructions

## Project Overview

**Name:** Sightness Expert  
**Type:** Ultra-premium e-commerce and portfolio platform  
**Stack:** Next.js 15, TypeScript, Tailwind CSS, Supabase, Vercel  
**Status:** Production-ready  

## Development Guidelines

### Code Style
- Use TypeScript for all files
- Follow React 19+ best practices
- Use functional components with hooks
- Implement proper error handling
- Add proper JSDoc comments for functions

### Component Structure
- Keep components in `src/components/`
- One component per file when possible
- Use Framer Motion for animations
- Implement proper prop typing
- Use Tailwind CSS utility classes

### Page Organization
- Public pages in `src/app/`
- Admin pages in `src/app/admin/`
- Protected routes with authentication
- Use Next.js 15 app directory structure
- Include proper metadata for SEO

### Database
- Use Supabase client in `src/lib/supabase.ts`
- Implement proper RLS policies
- Use TypeScript types from `src/types/`
- Cache queries when appropriate
- Log queries during development

### State Management
- Use Zustand for global state
- Keep stores in `src/stores/`
- Use localStorage for cart persistence
- Implement proper TypeScript typing

### Styling
- Primary styles in `src/globals.css`
- Component-level CSS via Tailwind
- Follow dark luxury aesthetic
- Use consistent spacing and typography
- Implement smooth transitions

## Naming Conventions

- **Components:** PascalCase (e.g., `ProductCard.tsx`)
- **Functions:** camelCase (e.g., `formatCurrency()`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `API_URL`)
- **Types:** PascalCase (e.g., `Product`, `Order`)
- **Files:** kebab-case for utilities (e.g., `format-helpers.ts`)

## Important Files

- `src/app/layout.tsx` - Root layout and metadata
- `src/lib/supabase.ts` - Database client configuration
- `src/types/index.ts` - All TypeScript type definitions
- `database.sql` - Database schema
- `tailwind.config.js` - Design system configuration
- `.env.example` - Environment variable template

## Before Committing

```bash
npm run type-check  # TypeScript validation
npm run lint        # ESLint check
npm run build       # Production build test
```

## Deployment

- Push to `main` branch triggers automatic Vercel deployment
- Preview deployments on pull requests
- Environment variables configured in Vercel dashboard
- Monitor builds in Vercel → Deployments

## Common Tasks

### Add New Product
1. Add to Supabase `products` table
2. Component displays automatically from database
3. Update admin dashboard if needed

### Create New Page
1. Create file in `src/app/[route]/page.tsx`
2. Add to navigation if public
3. Include proper metadata
4. Test on mobile

### Modify Admin Dashboard
1. Edit files in `src/app/admin/`
2. Add sidebar nav item
3. Create new page in subdirectory
4. Maintain consistent styling

### Update Database Schema
1. Write migration SQL
2. Test in Supabase SQL editor first
3. Run in production database
4. Update `database.sql` reference

## Performance Best Practices

- Use Next.js Image component
- Lazy load components with dynamic imports
- Implement proper caching headers
- Use database indexes (already configured)
- Monitor Core Web Vitals
- Keep bundle size optimal

## Security Practices

- Never commit `.env.local`
- Use environment variables for secrets
- Validate all user inputs
- Implement proper CORS
- Regular dependency audits
- Keep secrets in Vercel dashboard only

## Debugging

- Use browser DevTools for client-side issues
- Check Vercel logs for build/server errors
- Test locally first with `npm run dev`
- Use Supabase dashboard for database issues
- Enable React strict mode for development

## Documentation

- Update README.md for major changes
- Document new environment variables
- Add JSDoc comments to functions
- Include setup instructions for features
- Keep DEPLOYMENT_GUIDE.md current

## Testing Checklist

Before pushing to production:
- [ ] Test all pages load correctly
- [ ] Test authentication flows
- [ ] Test mobile responsiveness
- [ ] Check performance metrics
- [ ] Verify database queries work
- [ ] Test admin dashboard functions
- [ ] Check error handling
- [ ] Test payment flow (if applicable)

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes
# ... edit files ...

# Test locally
npm run dev

# Commit changes
git add .
git commit -m "feature: Description of changes"

# Push to GitHub
git push origin feature/new-feature

# Create pull request on GitHub
# Vercel creates preview deployment
# Merge after approval
# Main branch auto-deploys
```

## Useful Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run type-check   # Check TypeScript types
```

## Resources

- [Next.js 15 Docs](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Supabase Guide](https://supabase.com/docs)
- [Framer Motion](https://www.framer.com/motion)

## Project Architecture

```
sightness-expert/
├── src/
│   ├── app/                 # Next.js 15 app directory
│   │   ├── admin/          # Admin dashboard (protected)
│   │   ├── auth/           # Authentication pages
│   │   ├── shop/           # Product catalog
│   │   └── page.tsx        # Homepage
│   ├── components/         # Reusable React components
│   ├── lib/               # Utilities and clients
│   ├── types/             # TypeScript type definitions
│   ├── hooks/             # Custom React hooks
│   ├── stores/            # Zustand state stores
│   ├── utils/             # Helper functions
│   └── globals.css        # Global styles
├── public/                # Static assets
├── database.sql          # Database schema
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS theme
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## Questions or Issues?

Refer to:
1. README.md - Project overview
2. DEPLOYMENT_GUIDE.md - Deployment help
3. QUICK_START.md - Quick reference
4. Documentation links above
