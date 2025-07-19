# Therive.io

Profesyonel networking platformu - Drive'ını fırsatlara dönüştür.

## 🚀 Özellikler

- **Hedef Odaklı Networking**: Niyet etiketleri ile eşleşme
- **Gerçek Zamanlı Sohbet**: WebSocket tabanlı iletişim
- **Gizlilik Odaklı**: Karşılıklı onay sistemi
- **Modern Arayüz**: Cursor editör hissiyatında dark theme
- **Responsive Tasarım**: Tüm cihazlarda mükemmel deneyim

## 🛠 Teknoloji Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (Prisma ORM)
- **Real-time**: Socket.IO
- **Authentication**: NextAuth.js
- **State Management**: Zustand
- **Styling**: Tailwind CSS + Framer Motion

## 🎨 Tasarım Sistemi

- **Ana Renk**: #101010 (Koyu arka plan)
- **Metin**: #E0E0E0 (Açık gri)
- **Vurgu**: #2DD4BF (Canlı turkuaz)
- **Font**: Inter

## 🏃‍♂️ Hızlı Başlangıç

```bash
# Bağımlılıkları yükle
npm install

# Veritabanını hazırla
npm run db:push

# Geliştirme sunucusunu başlat
npm run dev
```

## 📱 MVP Sayfalar

1. **Ana Sayfa**: Değer önerisi ve kayıt butonu
2. **Kayıt**: Hızlı kayıt + niyet etiketleri
3. **Keşfet**: Kart tabanlı kullanıcı listesi
4. **Profil**: Minimalist kullanıcı detayları
5. **Sohbet**: Gerçek zamanlı mesajlaşma

## 🔐 Çevre Değişkenleri

Kopyalayın `.env.example` -> `.env.local` ve değerlerinizi girin.

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret"
JWT_SECRET="your-jwt-secret"
``` 