# Therive - Professional Networking Platform

Modern, güvenli ve kullanıcı dostu bir networking platformu. Next.js 14, TypeScript, Prisma ve PostgreSQL ile geliştirilmiştir.

## 🚀 Özellikler

- **Güvenli Kimlik Doğrulama**: JWT tabanlı authentication sistemi
- **Kullanıcı Yönetimi**: Profil oluşturma ve düzenleme
- **Niyet Etiketleri**: Networking hedeflerinizi belirleyin
- **Gerçek Zamanlı Mesajlaşma**: Socket.io ile canlı sohbet
- **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm
- **Modern UI**: Tailwind CSS ile özel tasarım

## 🛠️ Teknoloji Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Veritabanı**: PostgreSQL + Prisma ORM
- **Authentication**: JWT + bcryptjs
- **State Management**: Zustand
- **Animations**: Framer Motion

## 📋 Kurulum

### Gereksinimler

- Node.js 18+ 
- PostgreSQL veritabanı
- Git

### Adım 1: Projeyi Klonlayın

```bash
git clone [repository-url]
cd therive
```

### Adım 2: Bağımlılıkları Yükleyin

```bash
npm install
```

### Adım 3: Environment Variables

`.env.local` dosyasını oluşturun ve aşağıdaki değerleri ekleyin:

```env
# Veritabanı bağlantısı - Kendi PostgreSQL bilgilerinizi girin
DATABASE_URL="postgresql://username:password@localhost:5432/therive?schema=public"

# JWT Secret - Güvenli bir secret key oluşturun
JWT_SECRET="your-super-secret-jwt-key-change-in-production"

# NextAuth (future use)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-change-in-production"
```

### Adım 4: Veritabanı Kurulumu

```bash
# Prisma client'ı generate edin
npx prisma generate

# Migration'ları çalıştırın
npx prisma migrate dev --name init

# (Opsiyonel) Prisma Studio ile veritabanını görüntüleyin
npx prisma studio
```

### Adım 5: Geliştirme Sunucusunu Başlatın

```bash
npm run dev
```

Uygulama `http://localhost:3000` adresinde çalışacaktır.

## 🚢 Deployment

### Vercel ile Deploy

1. Projeyi GitHub'a push edin
2. [Vercel Dashboard](https://vercel.com/dashboard)'a gidin
3. "New Project" tıklayın ve GitHub repo'nuzu seçin
4. Environment variables'ları ekleyin:
   - `DATABASE_URL`: PostgreSQL connection string
   - `JWT_SECRET`: Güvenli secret key
   - `NEXTAUTH_URL`: Production domain
   - `NEXTAUTH_SECRET`: NextAuth secret

5. Deploy'u tamamlayın

### Veritabanı (Production)

Production için aşağıdaki veritabanı sağlayıcılarını kullanabilirsiniz:
- [Supabase](https://supabase.com/) (Önerilen)
- [Railway](https://railway.app/)
- [PlanetScale](https://planetscale.com/)
- [Neon](https://neon.tech/)

## 📁 Proje Yapısı

```
therive/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   │   └── auth/          # Authentication endpoints
│   ├── auth/              # Auth pages (signin, signup)
│   ├── dashboard/         # Protected dashboard
│   └── ...
├── components/            # Reusable components
│   ├── ui/               # UI components
│   └── AuthWrapper.tsx   # Auth protection wrapper
├── lib/                  # Utility functions
│   ├── auth.ts          # JWT utilities
│   ├── prisma.ts        # Prisma client
│   └── store.ts         # Zustand store
├── prisma/              # Database schema & migrations
│   └── schema.prisma    # Prisma schema
└── ...
```

## 🔐 Authentication Sistemi

### API Endpoints

- `POST /api/auth/signup` - Kullanıcı kaydı
- `POST /api/auth/signin` - Kullanıcı girişi
- `GET /api/auth/me` - Kullanıcı bilgileri
- `POST /api/auth/logout` - Çıkış

### Protected Routes

- `/dashboard` - Ana panel
- `/profile/*` - Profil sayfaları
- `/messages/*` - Mesajlaşma
- `/settings` - Ayarlar

### State Management

Zustand kullanarak global state yönetimi:
- User authentication state
- Loading states
- Error handling

## 🎨 UI/UX

- **Dark Theme**: Modern dark tema
- **Responsive**: Mobile-first tasarım
- **Accessible**: WCAG 2.1 standartları
- **Animations**: Smooth geçişler
- **Custom Colors**: Therive brand renkleri

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun: `git checkout -b feature/amazing-feature`
3. Commit yapın: `git commit -m 'Add amazing feature'`
4. Push edin: `git push origin feature/amazing-feature`
5. Pull Request açın

## 📝 License

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

Sorular için: [therive.io](https://therive.io)

---

**Not**: Bu proje henüz geliştirme aşamasındadır. Production kullanımı için ek güvenlik önlemleri alınmalıdır. 