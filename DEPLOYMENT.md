# Therive - Supabase & Vercel Deployment Guide

## 🚀 Hızlı Deployment Checklist

### ✅ Supabase Kurulumu TAMAMLANDI!
- Proje ID: `ehdmadmwgefgciwuvoab`
- URL: https://ehdmadmwgefgciwuvoab.supabase.co
- Dashboard: https://supabase.com/dashboard/project/ehdmadmwgefgciwuvoab

### 1. Supabase Kurulumu
- [x] Supabase projesi oluşturuldu
- [x] Veritabanı şeması push edildi
- [x] Environment variables hazır

### 2. Vercel Deployment

1. **GitHub'a Push**
```bash
git add .
git commit -m "Ready for deployment with Supabase"
git push origin main
```

2. **Vercel Environment Variables**
Vercel'de şu değişkenleri ekleyin:
```
DATABASE_URL=postgresql://postgres.ehdmadmwgefgciwuvoab:SecurePassword123@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.ehdmadmwgefgciwuvoab:SecurePassword123@aws-0-us-west-1.pooler.supabase.com:5432/postgres
NEXT_PUBLIC_SUPABASE_URL=https://ehdmadmwgefgciwuvoab.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoZG1hZG13Z2VmZ2Npd3V2b2FiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMDY5MDAsImV4cCI6MjA2ODU4MjkwMH0.R2eAvrSUkPoQ9JxMMowNZNqb_1CceI9eWcFBj_TqtRI
JWT_SECRET=K1ppLpLZpWoyoEu0E7dWR+ANi/2bJgtFHKnggTewSPU=
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=production-secret-key
```

3. **Vercel Setup**
- [Vercel](https://vercel.com) hesabınıza giriş yapın
- "New Project" → GitHub repo seçin
- Environment Variables ekleyin (yukarıdaki değişkenler)
- Deploy!

### 3. Local Test
```bash
npm run dev
```
Uygulama http://localhost:3000 adresinde çalışacak

## 🔧 Sorun Giderme

### Database Connection Error
- Supabase dashboard'dan şifrenizi sıfırlayın
- Connection pooler ayarlarını kontrol edin

### Build Errors
```bash
# Local test
npm run build
```

## 📝 Notlar

- JWT_SECRET production'da farklı olmalı
- Supabase free tier: 500MB database, 2GB bandwidth
- Vercel free tier: 100GB bandwidth, serverless functions

## 🔗 Faydalı Linkler

- [Supabase Dashboard](https://supabase.com/dashboard/project/ehdmadmwgefgciwuvoab)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Prisma + Supabase Guide](https://www.prisma.io/docs/guides/database/supabase) 