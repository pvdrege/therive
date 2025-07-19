'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Shield, Eye, Lock, FileText } from 'lucide-react'
import Link from 'next/link'
import Footer from '@/components/Footer'

export default function GDPRPage() {
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
          <div className="w-16 h-16 bg-gradient-to-br from-therive-accent to-therive-accent-hover rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-therive-dark" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="gradient-text">KVKK</span> <span className="text-therive-text">Aydınlatma Metni</span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Kişisel verilerinizin güvenliği bizim için önemli
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
          <section className="bg-gray-800/30 backdrop-blur border border-gray-700/50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-therive-text mb-6 flex items-center gap-3">
              <FileText className="w-6 h-6 text-therive-accent" />
              Veri Sorumlusu
            </h2>
            <div className="space-y-4 text-gray-300">
              <p><strong className="text-therive-accent">Şirket:</strong> therive.io Teknoloji A.Ş.</p>
              <p><strong className="text-therive-accent">Adres:</strong> Maslak Mah. Bilim Sok. No:5 Sarıyer/İstanbul</p>
              <p><strong className="text-therive-accent">E-posta:</strong> kvkk@therive.io</p>
              <p><strong className="text-therive-accent">Telefon:</strong> +90 212 555 0123</p>
            </div>
          </section>

          <section className="bg-gray-800/30 backdrop-blur border border-gray-700/50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-therive-text mb-6 flex items-center gap-3">
              <Eye className="w-6 h-6 text-therive-accent" />
              Toplanan Kişisel Veriler
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-therive-accent mb-3">Kimlik Bilgileri</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Ad, soyad</li>
                  <li>E-posta adresi</li>
                  <li>Telefon numarası</li>
                  <li>Profil fotoğrafı (isteğe bağlı)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-therive-accent mb-3">Profesyonel Bilgiler</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Şirket adı ve pozisyon</li>
                  <li>Sektör bilgisi</li>
                  <li>Deneyim ve beceriler</li>
                  <li>Hedef ve niyet etiketleri</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-therive-accent mb-3">İletişim Bilgileri</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Platform üzerindeki mesajlar</li>
                  <li>Bağlantı talepleri</li>
                  <li>Etkinlik katılım bilgileri</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-therive-accent mb-3">Teknik Bilgiler</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>IP adresi</li>
                  <li>Tarayıcı bilgisi</li>
                  <li>Cihaz bilgisi</li>
                  <li>Kullanım istatistikleri</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-gray-800/30 backdrop-blur border border-gray-700/50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-therive-text mb-6 flex items-center gap-3">
              <Lock className="w-6 h-6 text-therive-accent" />
              Veri İşleme Amaçları
            </h2>
            <div className="space-y-4">
              <div className="bg-therive-accent/5 border border-therive-accent/20 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-therive-accent mb-2">Platform Hizmetleri</h3>
                <p className="text-gray-300">
                  Profil oluşturma, eşleşme algoritması, mesajlaşma ve networking hizmetlerinin sunulması
                </p>
              </div>
              
              <div className="bg-therive-accent/5 border border-therive-accent/20 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-therive-accent mb-2">Güvenlik</h3>
                <p className="text-gray-300">
                  Platform güvenliğinin sağlanması, dolandırıcılık ve spam önleme
                </p>
              </div>

              <div className="bg-therive-accent/5 border border-therive-accent/20 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-therive-accent mb-2">İletişim</h3>
                <p className="text-gray-300">
                  Kullanıcı desteği, önemli duyurular ve hizmet güncellemeleri
                </p>
              </div>

              <div className="bg-therive-accent/5 border border-therive-accent/20 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-therive-accent mb-2">Analiz & İyileştirme</h3>
                <p className="text-gray-300">
                  Platform performansının ölçülmesi ve kullanıcı deneyiminin iyileştirilmesi
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gray-800/30 backdrop-blur border border-gray-700/50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-therive-text mb-6">Haklarınız</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-700/30 rounded-lg p-4">
                <h3 className="text-therive-accent font-semibold mb-2">Bilgi Talep Etme</h3>
                <p className="text-gray-300 text-sm">Hangi verilerinizi işlediğimizi öğrenme hakkı</p>
              </div>
              
              <div className="bg-gray-700/30 rounded-lg p-4">
                <h3 className="text-therive-accent font-semibold mb-2">Düzeltme</h3>
                <p className="text-gray-300 text-sm">Yanlış verilerin düzeltilmesini isteme hakkı</p>
              </div>

              <div className="bg-gray-700/30 rounded-lg p-4">
                <h3 className="text-therive-accent font-semibold mb-2">Silme</h3>
                <p className="text-gray-300 text-sm">Verilerinizin silinmesini talep etme hakkı</p>
              </div>

              <div className="bg-gray-700/30 rounded-lg p-4">
                <h3 className="text-therive-accent font-semibold mb-2">İtiraz Etme</h3>
                <p className="text-gray-300 text-sm">Veri işlemeye karşı itiraz etme hakkı</p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-therive-text mb-6">Güvenlik Önlemleri</h2>
            <div className="space-y-4 text-gray-300">
              <p>✅ SSL/TLS şifreleme ile güvenli veri aktarımı</p>
              <p>✅ Düzenli güvenlik testleri ve penetrasyon testleri</p>
              <p>✅ Çalışan erişim kontrolü ve yetkilendirme sistemi</p>
              <p>✅ Düzenli yedekleme ve felaket kurtarma planları</p>
              <p>✅ ISO 27001 standartlarına uygun güvenlik politikaları</p>
            </div>
          </section>

          <section className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-therive-text mb-6">İletişim</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                KVKK haklarınızla ilgili herhangi bir sorunuz varsa veya haklarınızı kullanmak istiyorsanız, 
                aşağıdaki kanallardan bize ulaşabilirsiniz:
              </p>
              <div className="bg-therive-accent/5 border border-therive-accent/20 rounded-lg p-6">
                <p><strong>E-posta:</strong> kvkk@therive.io</p>
                <p><strong>Adres:</strong> Maslak Mah. Bilim Sok. No:5 Sarıyer/İstanbul</p>
                <p><strong>Yanıt Süresi:</strong> En geç 30 gün içinde</p>
              </div>
            </div>
          </section>
        </motion.div>
      </div>

      <Footer />
    </main>
  )
} 