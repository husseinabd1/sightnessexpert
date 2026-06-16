# Sightness Expert - GitHub & Deployment Setup Guide

## Table of Contents
1. [GitHub Repository Setup](#github-repository-setup)
2. [Vercel Deployment Setup](#vercel-deployment-setup)
3. [Automatic Deployment Configuration](#automatic-deployment-configuration)
4. [Environment Variables](#environment-variables)
5. [Monitoring & Troubleshooting](#monitoring--troubleshooting)

## GitHub Repository Setup

### Step 1: Create Repository on GitHub

1. Go to [github.com](https://github.com) and login
2. Click the "+" icon in the top right
3. Select "New repository"
4. Repository name: `sightness-expert`
5. Description: `Ultra-premium luxury e-commerce and portfolio platform`
6. Choose: **Private** (recommended for business project)
7. Do NOT initialize with README (we have one)
8. Click "Create repository"

### Step 2: Push Code to GitHub

Open your terminal in the project directory and run:

```bash
# Initialize git (if not already done)
git init

# Configure git (optional, first time only)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Sightness Expert premium e-commerce platform

- Ultra-luxury dark theme with Tailwind CSS
- Next.js 15 with TypeScript
- Supabase database and authentication
- Professional admin dashboard
- Complete product management system
- Responsive design with Framer Motion animations
- Production-ready with SEO optimization"

# Add remote origin (replace with your GitHub repo URL)
git remote add origin https://github.com/yourusername/sightness-expert.git

# Rename branch to main (if on master)
git branch -M main

# Push to GitHub
git push -u origin main
```

### Step 3: Verify Upload

1. Go to your GitHub repository page
2. Verify all files are uploaded
3. Check that `.env.local` is in `.gitignore` (not uploaded)

## Vercel Deployment Setup

### Step 1: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub account
5. Follow the setup wizard

### Step 2: Import Repository

1. In Vercel Dashboard, click "Add New..." → "Project"
2. Select "Import Git Repository"
3. Search for `sightness-expert`
4. Click "Import"

### Step 3: Configure Project Settings

1. **Project Name**: `sightness-expert`
2. **Framework**: Select "Next.js"
3. **Root Directory**: `.` (current directory)
4. **Build Command**: `npm run build`
5. **Output Directory**: `.next`
6. **Install Command**: `npm install`

### Step 4: Add Environment Variables

In the "Environment Variables" section, add:

```
NEXT_PUBLIC_SUPABASE_URL = your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY = your_anon_key
SUPABASE_SERVICE_ROLE_KEY = your_service_role_key
```

**Important**: These are available in your Supabase project settings

### Step 5: Deploy

1. Click "Deploy"
2. Wait for build to complete (2-3 minutes)
3. Get your production URL

## Automatic Deployment Configuration

### How It Works

Every time you push to the `main` branch, Vercel automatically:
1. Pulls the latest code from GitHub
2. Installs dependencies
3. Runs build process
4. Deploys to production
5. Makes live website instantly available

### Push Deployment Workflow

```bash
# Make changes to your code
# ... edit files ...

# Stage changes
git add .

# Commit with descriptive message
git commit -m "feature: Add new product categories

- Added category filter to shop page
- Updated database schema
- Improved admin product interface"

# Push to main branch
git push origin main

# Vercel automatically deploys! Check vercel.com dashboard
```

### Pull Request Preview Deployments

When you create a pull request:
1. Vercel creates a preview deployment
2. Get a unique URL to test changes
3. Review before merging to main
4. Helps catch issues before production

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "feature: Describe what you added"

# Push feature branch
git push origin feature/new-feature

# Create pull request on GitHub
# Vercel creates preview deployment automatically
```

## Environment Variables

### Production (Vercel)

Set in Vercel Project Settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### Development (Local)

In `.env.local` (NOT committed to git):
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_key_here
```

### Safe Environment Variables

Variables starting with `NEXT_PUBLIC_` are exposed to browser (use only for public values).
Variables without prefix are server-only (more secure).

## Monitoring & Troubleshooting

### View Deployment Logs

1. Go to Vercel Dashboard
2. Select your project
3. Click "Deployments" tab
4. Select a deployment
5. Click "Logs" to see build output

### Common Issues & Solutions

#### Deployment Fails - Check Logs
```
✗ Build Failed: Command failed
→ Click on deployment to see what went wrong
→ Usually missing env variables or dependency issues
```

#### Env Variables Not Working
```
✓ Make sure NEXT_PUBLIC_ prefix for public vars
✓ Redeploy after adding env vars (settings don't auto-redeploy)
✓ Check spelling matches exactly
```

#### Database Connection Issues
```
✓ Verify NEXT_PUBLIC_SUPABASE_URL is correct
✓ Check SUPABASE_SERVICE_ROLE_KEY is valid
✓ Ensure Supabase project is active
```

#### Build Timeout
```
✓ Usually from large dependencies
✓ Check package.json for unnecessary packages
✓ Clean build: Vercel → More → Redeploy
```

### Rollback to Previous Version

In Vercel Dashboard:
1. Go to Deployments
2. Find working previous deployment
3. Click "..." → "Promote to Production"
4. Instant rollback

### Monitor Performance

1. Vercel Dashboard → "Analytics"
2. View:
   - Page Load Times
   - Core Web Vitals
   - Traffic Patterns
3. Optimize slow pages

## Git Commands Reference

```bash
# Check status
git status

# View commit history
git log --oneline -10

# View what changed
git diff

# Undo last commit (before push)
git reset --soft HEAD~1

# View branch
git branch -v

# Switch branch
git checkout branch-name

# Delete branch (after merge)
git branch -d branch-name

# Stash changes (save for later)
git stash

# Apply stashed changes
git stash pop
```

## Continuous Integration

### Automatic Checks Before Deployment

GitHub Actions runs these checks:
1. ✓ Dependencies install correctly
2. ✓ TypeScript types check out
3. ✓ ESLint passes
4. ✓ Build succeeds
5. ✓ Then deploys to Vercel

### View CI/CD Status

On GitHub:
1. Go to repository
2. Click "Actions" tab
3. See all workflows
4. Click to see detailed logs

## Production Checklist

- [ ] All environment variables set in Vercel
- [ ] Supabase database running
- [ ] Database schema created
- [ ] Admin user created
- [ ] First deployment successful
- [ ] Test website loads on production URL
- [ ] Test admin login works
- [ ] Test products display
- [ ] Test shopping cart
- [ ] Monitor error logs in Vercel

## Next Steps

1. ✓ Repository created and pushed
2. ✓ Deployed to Vercel
3. Next: Set up custom domain (optional)
4. Next: Enable analytics
5. Next: Set up email notifications
6. Next: Configure backup strategy

## Support & Resources

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- GitHub Docs: https://docs.github.com
- Supabase Docs: https://supabase.com/docs

---

**Congratulations!** Your Sightness Expert platform is now live and automatically deployed!

Every time you push code, the world sees your updates instantly. 🚀
