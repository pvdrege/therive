# Therive - Supabase & Vercel Deployment Guide

## 🚀 Hızlı Deployment Checklist

### 1. Supabase Kurulumu
- [ ] [Supabase](https://app.supabase.com) hesabı oluşturun
- [ ] Yeni proje oluşturun
- [ ] Settings → Database → Connection string'den DATABASE_URL kopyalayın
- [ ] .env dosyasındaki DATABASE_URL'yi güncelleyin

### 2. Veritabanı Migration
```bash
# Migration'ları çalıştırın
npx prisma migrate deploy

# Veritabanını kontrol edin
npx prisma studio
```

### 3. Environment Variables
Production için gereken değişkenler:
```
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
JWT_SECRET=K1ppLpLZpWoyoEu0E7dWR+ANi/2bJgtFHKnggTewSPU=
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=production-secret-key
```

### 4. Vercel Deployment

1. **GitHub'a Push**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Vercel Setup**
- [Vercel](https://vercel.com) hesabınıza giriş yapın
- "New Project" → GitHub repo seçin
- Environment Variables ekleyin (yukarıdaki 4 değişken)
- Deploy!

### 5. Post-Deployment

1. **Domain Ayarları**
- Vercel'de custom domain ekleyin
- NEXTAUTH_URL'yi yeni domain ile güncelleyin

2. **Supabase Güvenlik**
- Row Level Security (RLS) policies ekleyin
- API anahtarlarını kontrol edin

## 🔧 Sorun Giderme

### Database Connection Error
```
Error: P1001: Can't reach database server
```
**Çözüm:** 
- Supabase dashboard'dan connection string'i tekrar kopyalayın
- Şifrede özel karakterler varsa URL encode edildiğinden emin olun

### Build Errors
```bash
# Local test
npm run build
```

### Migration Errors
```bash
# Reset database (dikkatli!)
npx prisma migrate reset

# Yeni migration
npx prisma migrate dev --name init
```

## 📝 Notlar

- JWT_SECRET production'da farklı olmalı
- Supabase free tier: 500MB database, 2GB bandwidth
- Vercel free tier: 100GB bandwidth, serverless functions

## 🔗 Faydalı Linkler

- [Supabase Docs](https://supabase.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Prisma + Supabase Guide](https://www.prisma.io/docs/guides/database/supabase) 