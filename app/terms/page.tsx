'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, FileText, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'
import Footer from '@/components/Footer'

export default function TermsPage() {
  const sections = [
    {
      title: "Platform Kullanımı",
      icon: CheckCircle,
      content: [
        "therive.io'yu sadece profesyonel networking amacıyla kullanmalısınız",
        "18 yaşından büyük olmanız ve yasal ehliyet sahibi olmanız gereklidir",
        "Tek bir gerçek kişi için yalnızca bir hesap oluşturabilirsiniz",
        "Profil bilgilerinizin doğru ve güncel olmasından sorumlusunuz"
      ]
    },
    {
      title: "Yasak Davranışlar",
      icon: XCircle,
      content: [
        "Sahte profil oluşturmak veya kimliğinizi gizlemek",
        "Spam, taciz, tehdit veya uygunsuz içerik paylaşmak",
        "Ticari reklam veya dolandırıcılık amaçlı kullanım",
        "Diğer kullanıcıların kişisel bilgilerini izinsiz toplamak",
        "Platform güvenliğini tehdit edecek aktivitelerde bulunmak"
      ]
    }
  ]

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
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="gradient-text">Kullanım</span> <span className="text-therive-text">Koşulları</span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            therive.io platformunu kullanırken uymanız gereken kurallar
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
            <h2 className="text-2xl font-bold text-therive-text mb-6">Hizmet Sözleşmesi</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                therive.io platformunu kullanarak, aşağıdaki kullanım koşullarını kabul etmiş sayılırsınız. 
                Bu koşullar sizinle therive.io Teknoloji A.Ş. arasındaki yasal sözleşmeyi oluşturur.
              </p>
              <p>
                Platform üzerinde sunulan hizmetler <strong className="text-therive-accent">profesyonel networking</strong> amacıyla 
                sağlanmaktadır. Kişisel kullanım için ücretsiz, ticari kullanım için premium abonelik gereklidir.
              </p>
            </div>
          </section>

          {sections.map((section, index) => {
            const Icon = section.icon
            return (
              <section key={section.title} className="bg-gray-800/30 backdrop-blur border border-gray-700/50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-therive-text mb-6 flex items-center gap-3">
                  <Icon className={`w-6 h-6 ${section.title === 'Yasak Davranışlar' ? 'text-red-400' : 'text-green-400'}`} />
                  {section.title}
                </h2>
                <div className="space-y-3">
                  {section.content.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        section.title === 'Yasak Davranışlar' ? 'bg-red-400' : 'bg-green-400'
                      }`} />
                      <p className="text-gray-300">{item}</p>
                    </div>
                  ))}
                </div>
              </section>
            )
          })}

          <section className="bg-gray-800/30 backdrop-blur border border-gray-700/50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-therive-text mb-6">Premium Abonelik</h2>
            <div className="space-y-4">
              <div className="bg-therive-accent/10 border border-therive-accent/20 rounded-lg p-4">
                <h3 className="text-therive-accent font-semibold mb-2">⭐ Premium Özellikler</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                  <li>Sınırsız bağlantı talebi</li>
                  <li>Gelişmiş filtreler ve arama</li>
                  <li>Öncelikli görünürlük</li>
                  <li>Detaylı analitikler</li>
                  <li>Premium destek</li>
                </ul>
              </div>
              
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                <h3 className="text-amber-400 font-semibold mb-2">💳 Ödeme & İade</h3>
                <div className="text-gray-300 space-y-2 text-sm">
                  <p>• Abonelik ücreti aylık veya yıllık olarak otomatik tahsil edilir</p>
                  <p>• İlk 14 gün içinde koşulsuz iade hakkınız vardır</p>
                  <p>• Aboneliği istediğiniz zaman iptal edebilirsiniz</p>
                  <p>• İptal sonrası mevcut dönem sonuna kadar hizmet devam eder</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gray-800/30 backdrop-blur border border-gray-700/50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-therive-text mb-6">İçerik & Telif Hakları</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-therive-accent mb-3">Sizin İçerikleriniz</h3>
                <div className="text-gray-300 space-y-2">
                  <p>• Paylaştığınız içeriklerin (profil bilgileri, mesajlar, fotoğraflar) telif hakları size aittir</p>
                  <p>• Platforma bu içerikleri servis sunumu amacıyla kullanma lisansı vermiş olursunuz</p>
                  <p>• İçeriklerinizi istediğiniz zaman silebilir veya değiştirebilirsiniz</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-therive-accent mb-3">Platform İçeriği</h3>
                <div className="text-gray-300 space-y-2">
                  <p>• therive.io'nun tasarımı, logosu, kodu ve algoritması telif koruması altındadır</p>
                  <p>• Platform içeriğini izinsiz kopyalayamaz, dağıtamaz veya ticari amaçla kullanamazsınız</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gray-800/30 backdrop-blur border border-gray-700/50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-therive-text mb-6">Sorumluluk & Garanti</h2>
            <div className="space-y-4">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <h3 className="text-red-400 font-semibold mb-2">⚠️ Sorumluluk Sınırları</h3>
                <div className="text-gray-300 space-y-2 text-sm">
                  <p>• therive.io diğer kullanıcıların davranışlarından sorumlu değildir</p>
                  <p>• Platform üzerinden kurulan iş ilişkilerinin sonuçları kullanıcıya aittir</p>
                  <p>• Hizmet kesintileri için önceden bildirim yapılmaya çalışılır</p>
                  <p>• Teknik arızalar durumunda telafi edici çözüm sunulmaya çalışılır</p>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h3 className="text-blue-400 font-semibold mb-2">🛡️ Bizim Sorumluluklarımız</h3>
                <div className="text-gray-300 space-y-2 text-sm">
                  <p>• Verilerinizi güvenli şekilde saklamak</p>
                  <p>• Platform güvenliğini sürekli izlemek</p>
                  <p>• Bildirilen sorunları hızla çözmek</p>
                  <p>• KVKK ve gizlilik koşullarına uymak</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gray-800/30 backdrop-blur border border-gray-700/50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-therive-text mb-6">Hesap Askıya Alma & Sonlandırma</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-amber-400 mb-3">Uyarı Sistemi</h3>
                <div className="space-y-2 text-gray-300 text-sm">
                  <p><strong className="text-amber-400">1. Uyarı:</strong> E-posta ile uyarı + 24 saat geçici kısıtlama</p>
                  <p><strong className="text-amber-400">2. Uyarı:</strong> 7 gün hesap askıya alma</p>
                  <p><strong className="text-red-400">3. Uyarı:</strong> Hesap kalıcı olarak kapatılır</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-red-400 mb-3">Anında Kapatma Durumları</h3>
                <div className="text-gray-300 space-y-1 text-sm">
                  <p>• Sahte kimlik kullanımı</p>
                  <p>• Dolandırıcılık girişimi</p>
                  <p>• Cinsel taciz veya tehdit</p>
                  <p>• Platform güvenliğini tehdit eden aktiviteler</p>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <h3 className="text-green-400 font-semibold mb-2">🔄 İtiraz Süreci</h3>
                <p className="text-gray-300 text-sm">
                  Hesap kapatma veya askıya alma kararına itiraz etmek için <strong>appeal@therive.io</strong> 
                  adresine başvurabilirsiniz. İtirazınız 5 iş günü içinde değerlendirilir.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-therive-text mb-6 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-purple-400" />
              Yasal Hükümler
            </h2>
            <div className="space-y-4 text-gray-300">
              <p>
                <strong className="text-purple-400">Uygulanacak Hukuk:</strong> Bu sözleşme Türkiye Cumhuriyeti hukukuna tabidir.
              </p>
              <p>
                <strong className="text-purple-400">Yetki:</strong> İhtilaflar İstanbul Adliyesi mahkemelerinde çözülecektir.
              </p>
              <p>
                <strong className="text-purple-400">Değişiklikler:</strong> Kullanım koşulları değişikliklerinde 30 gün önceden bildirim yapılır.
              </p>
              <p>
                <strong className="text-purple-400">Dilsel Öncelik:</strong> Çeviri farklılıklarında Türkçe metin esas alınır.
              </p>
            </div>
          </section>

          <section className="bg-therive-accent/10 border border-therive-accent/20 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-therive-text mb-4">Sorularınız mı Var?</h2>
            <p className="text-gray-300 mb-6">
              Kullanım koşulları hakkında sorularınız için bizimle iletişime geçin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="px-6 py-3 bg-therive-accent text-therive-dark rounded-lg font-semibold hover:bg-therive-accent-hover transition-colors"
              >
                İletişime Geç
              </Link>
              <Link 
                href="/help"
                className="px-6 py-3 border border-therive-accent text-therive-accent rounded-lg font-semibold hover:bg-therive-accent/10 transition-colors"
              >
                Yardım Merkezi
              </Link>
            </div>
          </section>
        </motion.div>
      </div>

      <Footer />
    </main>
  )
} 