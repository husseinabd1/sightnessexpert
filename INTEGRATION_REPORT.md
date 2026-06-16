# تقرير فحص الترابط: GitHub ↔ Vercel ↔ Supabase

## 📊 ملخص الحالة العامة

| الخدمة | الحالة | التفاصيل |
|--------|--------|----------|
| **GitHub** | ✅ جاهز | Repo موجود، Code مرفوع، Actions مُهيّأة |
| **Vercel** | ⚠️ ناقص | Config موجود بس Project لسه مو مُنشأ |
| **Supabase** | ❌ غير مربوط | Schema موجود بس placeholder values |
| **Environment Variables** | ❌ مفقودة | ما موجودة لا محلياً ولا على GitHub |

---

## 1️⃣ GitHub (✅ جاهز)

### ✅ ما يشتغل:
- **Repository:** `github.com/husseinabd1/sightnessexpert`
- **SSH Key:** مُضاف ومُفعّل
- **GitHub Actions Workflow:** `.github/workflows/deploy.yml` موجودة ومُهيّأة
- **Push:** يشتغل بدون مشاكل

### 📋 الـ Workflow يشتغل على:
- كل `push` لـ `main` branch
- كل `pull_request` لـ `main`

### ⚠️ النقص:
- **GitHub Secrets** لسه مو مُضافة (VERCEL_TOKEN, ORG_ID, PROJECT_ID, Supabase keys)
- الـ Workflow راح يفشل لأنها تشتغل بس الـ Secrets موجودة

---

## 2️⃣ Vercel (⚠️ ناقص)

### ✅ ما يشتغل:
- **Config file:** `vercel.json` موجود بـ build commands صحيحة
- **GitHub Actions:** workflow مُهيّأ لـ auto-deploy
- **Framework:** Next.js (مُعرف صح)

### ❌ ما يحتاجه:
1. **إنشاء Vercel Project** من [vercel.com](https://vercel.com)
2. **ربط GitHub repo** بالـ Vercel
3. **إضافة GitHub Secrets**:
   ```
   VERCEL_TOKEN
   VERCEL_ORG_ID
   VERCEL_PROJECT_ID
   ```
4. **أو** تستخدم Vercel CLI أبسط:
   ```bash
   npx vercel --prod
   ```

### 🔧 الخطوات المطلوبة:

#### Option A: Vercel Dashboard (أسهل)
1. روح لـ [vercel.com](https://vercel.com)
2. Sign up بـ GitHub
3. Click "Add New Project"
4. اختار `sightnessexpert` repo
5. Vercel يربط GitHub + يسوي deploy أوتوماتيكي

#### Option B: GitHub Actions (متقدم)
1. إنشاء Vercel Project من Dashboard
2. إنشاء Vercel Token من Settings
3. إضافة Secrets لـ GitHub:
   - `Settings → Secrets and variables → Actions → New repository secret`
4. كل push لـ main يشتغل auto-deploy

---

## 3️⃣ Supabase (❌ غير مربوط)

### ✅ ما يشتغل:
- **Database Schema:** `database.sql` كامل وجاهز (197 سطر)
- **Client Code:** `src/lib/supabase.ts` مُهيّأ
- **Tables:** users, products, categories, orders, coupons, portfolio, newsletter

### ❌ ما يحتاجه:
1. **إنشاء Supabase Project** من [supabase.com](https://supabase.com)
2. **تشغيل Schema** على Supabase SQL Editor
3. **إضافة Environment Variables**:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-key
   ```

### 🔧 الخطوات:

1. **إنشاء Project:**
   - روح لـ [supabase.com](https://supabase.com)
   - Click "New Project"
   - اختار name و password
   - انتظر 2-3 دقايق

2. **تشغيل SQL Schema:**
   - من Dashboard → SQL Editor
   - انسخ محتوى `database.sql`
   - Click "Run"

3. **جمع المفاتيح:**
   - Project Settings → API
   - `URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role secret` → `SUPABASE_SERVICE_ROLE_KEY`

4. **إضافة للمشروع:**
   - محلياً: `cp .env.example .env.local` واضف القيم
   - على Vercel: Project Settings → Environment Variables
   - على GitHub: Settings → Secrets (لـ GitHub Actions)

---

## 4️⃣ Environment Variables (❌ مفقودة)

### ❌ الحالة الحالية:
- `src/lib/supabase.ts` يستخدم `placeholder` values
- لا `.env.local` محلي
- لا GitHub Secrets
- لا Vercel Env Variables

### ✅ المطلوب:

```bash
# .env.local (محلياً - ما ترفع لـ GitHub)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIs...
```

### 🔧 هل تريد أسوي لك template؟
قدر أسوي `.env.example` و`.env.local` بس placeholder وشرح.

---

## 5️⃣ GitHub Actions Workflow (تفصيل)

```yaml
# .github/workflows/deploy.yml
Trigger: push/pull_request to main
Steps:
  1. Checkout code
  2. Setup Node.js 18
  3. npm install
  4. npm run type-check (tsc --noEmit)
  5. npm run lint
  6. npm run build (مع Supabase env vars)
  7. Deploy to Vercel (prod)
```

### ⚠️ الأخطاء المحتملة:
- إذا `NEXT_PUBLIC_SUPABASE_URL` placeholder → Build راح يفشل
- إذا `VERCEL_TOKEN` missing → Deploy راح يفشل
- إذا Supabase لسه مو مُنشأ → Login/Admin ما يشتغل

---

## 🎯 خطة العمل المقترحة (3 خطوات)

### المرحلة 1: Supabase (30 دقيقة)
- [ ] إنشاء Supabase Project
- [ ] تشغيل `database.sql`
- [ ] جمع المفاتيح (URL, anon, service_role)
- [ ] إنشاء admin user بـ `role = 'admin'`

### المرحلة 2: Vercel (15 دقيقة)
- [ ] إنشاء Vercel Project
- [ ] ربط GitHub repo
- [ ] إضافة Supabase env vars
- [ ] أول deploy

### المرحلة 3: GitHub Secrets (5 دقايق)
- [ ] إضافة Supabase keys (إذا تستخدم GitHub Actions)
- [ ] إضافة Vercel keys (إذا تستخدم GitHub Actions)
- [ ] أو: تستخدم Vercel auto-deploy (أسهل)

---

## 🔗 الروابط المطلوبة

| الخطوة | الرابط |
|--------|--------|
| GitHub Repo | https://github.com/husseinabd1/sightnessexpert |
| Supabase Dashboard | https://supabase.com/dashboard |
| Vercel Dashboard | https://vercel.com/dashboard |
| GitHub Secrets | https://github.com/husseinabd1/sightnessexpert/settings/secrets/actions |

---

## 💡 نصائح

### الخيار الأسرع (مُقترح):
1. **Supabase** → إنشاء project + تشغيل SQL
2. **Vercel** → Import GitHub repo + إضافة env vars
3. **Vercel** راح يسوي auto-deploy كل push
4. **GitHub Actions** optional (تقدر تتركها أو تحذفها إذا Vercel auto-deploy يكفي)

### هل تريد:
- 🔵 **أساعدك بإنشاء Supabase project؟** (أحتاج credentials)
- 🟢 **أساعدك بإنشاء Vercel project؟** (أحتاج login)
- 🟡 **أسوي `.env.example` file؟** (قدر أسوي الحين)
- 🟠 **أعدّل GitHub Actions** لتشتغل بس Vercel auto-deploy؟
