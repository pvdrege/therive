# TheRive - Professional Networking Platform

A modern networking platform built with Next.js 14, TypeScript, Prisma, and Railway.

## 🚀 Quick Deploy on Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app)

### 1. One-Click Deploy:
- Click "Deploy on Railway" 
- Connect your GitHub account
- Select this repository
- Railway will automatically provision PostgreSQL

### 2. Set Environment Variables in Railway Dashboard:
```
JWT_SECRET=your-super-secure-jwt-secret-32-chars-min
NEXTAUTH_SECRET=your-super-secure-nextauth-secret
NEXTAUTH_URL=${{RAILWAY_PUBLIC_DOMAIN}}
```

### 3. Railway Auto-Configuration:
- ✅ PostgreSQL Database (automatically connected)
- ✅ Build & Deploy (Nixpacks)
- ✅ SSL Certificate
- ✅ Custom Domain Support

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Setup database
npx prisma db push
npx prisma generate

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL (Railway)
- **ORM**: Prisma
- **Authentication**: NextAuth.js + JWT
- **Styling**: Tailwind CSS
- **Deployment**: Railway

## 🔧 Environment Variables

Create `.env` file:
```env
DATABASE_URL="postgresql://user:pass@host:port/db"
JWT_SECRET="your-jwt-secret"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"
```

---

## 📄 License

This project is licensed under the MIT License.
