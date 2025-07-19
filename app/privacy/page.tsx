'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Shield, Eye, Users, Bell, Cookie, Globe } from 'lucide-react'
import Link from 'next/link'
import Footer from '@/components/Footer'

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-therive-dark">
      {/* Header */}
      <header className="border-b border-gray-700/50 bg-gray-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <Link 
                href="/"
                className="text-therive-accent hover:text-therive-accent-hover"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-xl sm:text-2xl font-bold gradient-text truncate">therive.io</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="gradient-text">Gizlilik</span> <span className="text-therive-text">Politikası</span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Verilerinizi nasıl koruduğumuz ve kullandığımız hakkında şeffaf bilgi
          </p>
          <p className="text-sm text-gray-500 mt-2">Son güncellenme: 15 Aralık 2024</p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <section className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-therive-text mb-6 flex items-center gap-3">
              <Eye className="w-6 h-6 text-blue-400" />
              Hangi Verileri Topluyoruz?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-400">Profil Bilgileri</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                  <li>Ad, soyad, e-posta</li>
                  <li>Profil fotoğrafı (isteğe bağlı)</li>
                  <li>Bio ve kişisel açıklama</li>
                  <li>Telefon numarası (onayladığınızda)</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-400">Platform Aktivitesi</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                  <li>Arama ve filtre tercihleri</li>
                  <li>Mesajlaşma geçmişi</li>
                  <li>Bağlantı talepleri ve onaylar</li>
                  <li>Platform kullanım süreleri</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-gray-800/30 backdrop-blur border border-gray-700/50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-therive-text mb-6 flex items-center gap-3">
              <Users className="w-6 h-6 text-therive-accent" />
              Verilerinizi Nasıl Kullanıyoruz?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-therive-accent/5 border border-therive-accent/20 rounded-lg p-4">
                <h3 className="text-therive-accent font-semibold mb-2">🎯 Eşleşme Algoritması</h3>
                <p className="text-gray-300 text-sm">
                  Niyet etiketlerinize göre size en uygun profesyonelleri göstermek için
                </p>
              </div>
              
              <div className="bg-therive-accent/5 border border-therive-accent/20 rounded-lg p-4">
                <h3 className="text-therive-accent font-semibold mb-2">💬 İletişim</h3>
                <p className="text-gray-300 text-sm">
                  Güvenli mesajlaşma ve bağlantı kurma hizmetleri için
                </p>
              </div>

              <div className="bg-therive-accent/5 border border-therive-accent/20 rounded-lg p-4">
                <h3 className="text-therive-accent font-semibold mb-2">🔒 Güvenlik</h3>
                <p className="text-gray-300 text-sm">
                  Sahte hesapları tespit etmek ve platform güvenliğini sağlamak için
                </p>
              </div>

              <div className="bg-therive-accent/5 border border-therive-accent/20 rounded-lg p-4">
                <h3 className="text-therive-accent font-semibold mb-2">📊 İyileştirme</h3>
                <p className="text-gray-300 text-sm">
                  Platform deneyimini geliştirmek ve yeni özellikler eklemek için
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gray-800/30 backdrop-blur border border-gray-700/50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-therive-text mb-6 flex items-center gap-3">
              <Bell className="w-6 h-6 text-yellow-400" />
              Verilerinizi Kimle Paylaşıyoruz?
            </h2>
            
            <div className="space-y-6">
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <h3 className="text-green-400 font-semibold mb-2">✅ Platformda Diğer Kullanıcılarla</h3>
                <p className="text-gray-300 text-sm mb-2">Sadece profilinizde paylaşmayı seçtiğiniz bilgiler:</p>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>Ad, profil fotoğrafı, bio</li>
                  <li>Seçtiğiniz niyet etiketleri</li>
                  <li>Halka açık olarak işaretlediğiniz bilgiler</li>
                </ul>
              </div>

              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <h3 className="text-red-400 font-semibold mb-2">❌ Asla Paylaşmadığımız Bilgiler</h3>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
                  <li>E-posta adresiniz ve telefon numaranız</li>
                  <li>Özel mesajlarınızın içeriği</li>
                  <li>Arama ve gezinme geçmişiniz</li>
                  <li>Kişisel iletişim bilgileriniz</li>
                </ul>
              </div>

              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <h3 className="text-yellow-400 font-semibold mb-2">⚖️ Yasal Zorunluluklar</h3>
                <p className="text-gray-300 text-sm">
                  Sadece yasal mercilerin resmi talebi ve mahkeme kararı ile sınırlı bilgi paylaşımı yapabiliriz.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gray-800/30 backdrop-blur border border-gray-700/50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-therive-text mb-6 flex items-center gap-3">
              <Cookie className="w-6 h-6 text-orange-400" />
              Çerezler (Cookies)
            </h2>
            <div className="space-y-4">
              <div className="bg-orange-500/5 border border-orange-500/20 rounded-lg p-4">
                <h3 className="text-orange-400 font-semibold mb-2">Gerekli Çerezler</h3>
                <p className="text-gray-300 text-sm">
                  Platform'un çalışması için zorunlu olan çerezler. Oturum bilgileri ve güvenlik için kullanılır.
                </p>
              </div>
              
              <div className="bg-orange-500/5 border border-orange-500/20 rounded-lg p-4">
                <h3 className="text-orange-400 font-semibold mb-2">Analitik Çerezler</h3>
                <p className="text-gray-300 text-sm">
                  Platform kullanımını anlamamıza yardımcı olan anonim istatistikler (Google Analytics).
                  Ayarlardan kapatabilirsiniz.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gray-800/30 backdrop-blur border border-gray-700/50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-therive-text mb-6 flex items-center gap-3">
              <Globe className="w-6 h-6 text-green-400" />
              Veri Güvenliği
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                <h3 className="text-green-400 font-semibold mb-2">🔐 Şifreleme</h3>
                <p className="text-gray-300 text-sm">
                  Tüm veriler SSL/TLS ile şifrelenir ve güvenli sunucularda saklanır
                </p>
              </div>
              
              <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                <h3 className="text-green-400 font-semibold mb-2">🛡️ Erişim Kontrolü</h3>
                <p className="text-gray-300 text-sm">
                  Sadece yetkili personel sınırlı erişime sahiptir
                </p>
              </div>

              <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                <h3 className="text-green-400 font-semibold mb-2">💾 Yedekleme</h3>
                <p className="text-gray-300 text-sm">
                  Düzenli yedekleme ile veri kaybı korunması
                </p>
              </div>

              <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                <h3 className="text-green-400 font-semibold mb-2">🔍 İzleme</h3>
                <p className="text-gray-300 text-sm">
                  7/24 güvenlik izleme ve anormal aktivite tespiti
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-therive-accent/10 to-therive-accent-hover/10 border border-therive-accent/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-therive-text mb-6">Haklarınız</h2>
            <div className="space-y-4">
              <div className="bg-therive-accent/5 rounded-lg p-4">
                <h3 className="text-therive-accent font-semibold mb-2">📋 Verilerinizi Görüntüleme</h3>
                <p className="text-gray-300 text-sm">
                  Hesap ayarlarından tüm verilerinizi indirebilirsiniz.
                </p>
              </div>
              
              <div className="bg-therive-accent/5 rounded-lg p-4">
                <h3 className="text-therive-accent font-semibold mb-2">✏️ Düzenleme & Güncelleme</h3>
                <p className="text-gray-300 text-sm">
                  Profil ayarlarından bilgilerinizi istediğiniz zaman güncelleyebilirsiniz.
                </p>
              </div>

              <div className="bg-therive-accent/5 rounded-lg p-4">
                <h3 className="text-therive-accent font-semibold mb-2">🗑️ Hesap Silme</h3>
                <p className="text-gray-300 text-sm">
                  Hesabınızı sildiğinizde tüm verileriniz 30 gün içinde kalıcı olarak silinir.
                </p>
              </div>

              <div className="bg-therive-accent/5 rounded-lg p-4">
                <h3 className="text-therive-accent font-semibold mb-2">📧 İletişim</h3>
                <p className="text-gray-300 text-sm">
                  Gizlilik ile ilgili sorularınız için: privacy@therive.io
                </p>
              </div>
            </div>
          </section>

          <section className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-therive-text mb-4">Değişiklikler</h2>
            <p className="text-gray-300 mb-4">
              Bu gizlilik politikası güncellendiğinde, size e-posta ve platform bildirimi ile haber vereceğiz.
              Önemli değişiklikler için 30 gün önceden bilgilendirme yapacağız.
            </p>
            <div className="bg-therive-accent/5 border border-therive-accent/20 rounded-lg p-4">
              <p className="text-sm text-gray-300">
                <strong>Son güncelleme:</strong> 15 Aralık 2024 <br />
                <strong>Yürürlük tarihi:</strong> 1 Ocak 2025
              </p>
            </div>
          </section>
        </motion.div>
      </div>

      <Footer />
    </main>
  )
} 