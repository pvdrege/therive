# Railway Environment Variables

Railway PostgreSQL database'i ekledikten sonra bu variables'ları ekleyin:

## Variables sekmesinde eklenecek değerler:

**JWT_SECRET**
```
NewJWTSecret2024SecureKey!
```

**NEXTAUTH_SECRET** 
```
new-super-secret-nextauth-key-2024
```

**NEXTAUTH_URL**
```
${{RAILWAY_PUBLIC_DOMAIN}}
```

**NODE_ENV**
```
production
```

⚠️ **NOT:** DATABASE_URL otomatik olarak Railway tarafından sağlanır, eklemenize gerek yok!

## Deploy Sonrası:
Railway'de yeni bir deployment otomatik başlayacak ve bu sefer başarılı olacak! 🚀 