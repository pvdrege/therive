'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, HelpCircle, Search, ChevronDown, ChevronUp, MessageSquare, Mail, Users, Settings, Shield, CreditCard } from 'lucide-react'
import Link from 'next/link'
import Footer from '@/components/Footer'

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0)

  const categories = [
    {
      icon: Users,
      title: 'Platform Kullanımı',
      description: 'Profil oluşturma, eşleşme, bağlantı kurma'
    },
    {
      icon: MessageSquare,
      title: 'Mesajlaşma',
      description: 'Mesaj gönderme, bildirimler, engelleme'
    },
    {
      icon: CreditCard,
      title: 'Premium & Ödemeler',
      description: 'Abonelik, faturalama, ücret iadesi'
    },
    {
      icon: Shield,
      title: 'Güvenlik & Gizlilik',
      description: 'Hesap güvenliği, veri korunması'
    },
    {
      icon: Settings,
      title: 'Hesap Ayarları',
      description: 'Profil düzenleme, bildirim ayarları'
    }
  ]

  const faqs = [
    {
      category: 'Platform Kullanımı',
      question: 'therive.io nasıl çalışır?',
      answer: 'therive.io niyet tabanlı networking platformudur. Profilinizde #yatırımarıyorum, #işarıyorum gibi etiketlerle ne aradığınızı belirtirsiniz. Algoritmamız bu etiketlere göre size en uygun kişileri gösterir ve doğru eşleşmeleri yapmanızı sağlar.'
    },
    {
      category: 'Platform Kullanımı', 
      question: 'Profil nasıl oluşturulur?',
      answer: 'Kayıt olduktan sonra profil ayarlarından ad, soyad, bio ve profil fotoğrafınızı ekleyin. En önemli kısmı ise niyet etiketlerinizi seçmek. Bu etiketler sayesinde doğru kişilerle eşleşeceksiniz.'
    },
    {
      category: 'Platform Kullanımı',
      question: 'Niyet etiketleri nedir ve nasıl kullanılır?',
      answer: 'Niyet etiketleri ne aradığınızı gösterir. #yatırımarıyorum (yatırım arıyorum), #cofounderarıyorum gibi. Bu etiketleri seçerek benzer hedeflere sahip kişilerle eşleşirsiniz. Birden fazla etiket seçebilirsiniz.'
    },
    {
      category: 'Mesajlaşma',
      question: 'Nasıl mesaj gönderebilirim?',
      answer: 'Bir profilde "Bağlantı Kur" butonuna tıklayarak bağlantı talebi gönderirsiniz. Karşı taraf onaylarsa mesajlaşabilirsiniz. Premium üyelerde sınırsız bağlantı talebi hakkı vardır.'
    },
    {
      category: 'Mesajlaşma',
      question: 'Mesajlarım diğer kullanıcılar tarafından görülebilir mi?',
      answer: 'Hayır, mesajlarınız tamamen özel ve güvenlidir. Sadece mesajlaştığınız kişi görebilir. End-to-end şifreleme ile korunmaktadır.'
    },
    {
      category: 'Premium & Ödemeler',
      question: 'Premium üyelik avantajları nelerdir?',
      answer: 'Premium üyelikle sınırsız bağlantı talebi, gelişmiş filtreler, öncelikli görünürlük, kimliği onaylanmış rozet ve premium destek alırsınız. Ayrıca profiliniz arama sonuçlarında daha üstte çıkar.'
    },
    {
      category: 'Premium & Ödemeler',
      question: 'Premium aboneliği nasıl iptal edilir?',
      answer: 'Ayarlar > Abonelik bölümünden istediğiniz zaman iptal edebilirsiniz. İptal sonrası mevcut dönem sonuna kadar hizmet devam eder. 14 gün içinde koşulsuz iade hakkınız vardır.'
    },
    {
      category: 'Güvenlik & Gizlilik',
      question: 'Verilerim güvende mi?',
      answer: 'Evet, tüm verileriniz SSL/TLS ile şifrelenir. KVKK uyumlu olarak sadece hizmet sunumu için kullanılır. Üçüncü taraflarla kesinlikle paylaşılmaz. İstediğiniz zaman verilerinizi indirebilir veya silebilirsiniz.'
    },
    {
      category: 'Güvenlik & Gizlilik',
      question: 'Sahte profillere karşı ne yapılıyor?',
      answer: 'Profilleri AI ve insan moderatörlerin kombinasyonuyla kontrol ediyoruz. Kimlik doğrulama sistemi, fotoğraf doğrulama ve davranış analizi ile sahte profilleri tespit edip kaldırıyoruz.'
    },
    {
      category: 'Hesap Ayarları',
      question: 'Hesabımı nasıl silebilirim?',
      answer: 'Ayarlar > Hesap > "Hesabımı Sil" seçeneğinden hesabınızı kalıcı olarak silebilirsiniz. Bu işlem geri alınamaz ve tüm verileriniz 30 gün içinde tamamen silinir.'
    },
    {
      category: 'Hesap Ayarları',
      question: 'Bildirim ayarlarımı nasıl değiştirebilirim?',
      answer: 'Ayarlar > Bildirimler bölümünden e-posta ve push bildirimlerini ayrı ayrı kontrol edebilirsiniz. Mesaj, bağlantı talebi, eşleşme gibi bildirim türlerini özelleştirebilirsiniz.'
    }
  ]

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )

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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-therive-accent to-therive-accent-hover rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8 text-therive-dark" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="gradient-text">Yardım</span> <span className="text-therive-text">Merkezi</span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
            therive.io'yu en iyi şekilde kullanmanız için size yardımcı oluyoruz
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto mt-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Soru veya konu arayın..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-12 pr-4 py-4 text-therive-text focus:border-therive-accent focus:outline-none"
              />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <h2 className="text-2xl font-bold text-therive-text mb-6">Kategoriler</h2>
            <div className="space-y-3">
              {categories.map((category, index) => {
                const Icon = category.icon
                return (
                  <motion.div
                    key={category.title}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-800/30 backdrop-blur border border-gray-700/50 rounded-xl p-4 hover:border-therive-accent/30 transition-all cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-therive-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-therive-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-therive-text mb-1">{category.title}</h3>
                        <p className="text-sm text-gray-400">{category.description}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Contact Support */}
            <div className="mt-8 bg-gradient-to-r from-therive-accent/10 to-therive-accent-hover/10 border border-therive-accent/20 rounded-2xl p-6">
              <h3 className="font-bold text-therive-text mb-3">Yardıma mı ihtiyacınız var?</h3>
              <p className="text-sm text-gray-300 mb-4">
                Aradığınız cevabı bulamadıysanız, destek ekibimizle iletişime geçin.
              </p>
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 bg-therive-accent text-therive-dark rounded-lg text-sm font-semibold hover:bg-therive-accent-hover transition-colors"
              >
                <Mail className="w-4 h-4" />
                İletişime Geç
              </Link>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-therive-text">Sık Sorulan Sorular</h2>
              <span className="text-sm text-gray-400">
                {filteredFaqs.length} soru bulundu
              </span>
            </div>

            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  layout
                  className="bg-gray-800/30 backdrop-blur border border-gray-700/50 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left hover:bg-gray-700/30 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs text-therive-accent font-medium mb-1 block">
                        {faq.category}
                      </span>
                      <h3 className="font-semibold text-therive-text">{faq.question}</h3>
                    </div>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-4 pt-0">
                          <div className="h-px bg-gray-700/50 mb-4" />
                          <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {filteredFaqs.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-therive-text mb-2">Sonuç bulunamadı</h3>
                <p className="text-gray-400 mb-4">
                  "{searchQuery}" için sonuç bulunamadı. Farklı terimler deneyin.
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-therive-accent hover:text-therive-accent-hover"
                >
                  Aramayı temizle
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-therive-text mb-6 text-center">Hızlı İşlemler</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800/30 backdrop-blur border border-gray-700/50 rounded-xl p-6 text-center">
              <MessageSquare className="w-8 h-8 text-therive-accent mx-auto mb-4" />
              <h3 className="font-semibold text-therive-text mb-2">Canlı Destek</h3>
              <p className="text-sm text-gray-400 mb-4">
                Anında yardım almak için canlı destek ile konuşun
              </p>
              <button className="px-4 py-2 bg-therive-accent/20 text-therive-accent rounded-lg text-sm font-medium hover:bg-therive-accent/30 transition-colors">
                Sohbet Başlat
              </button>
            </div>

            <div className="bg-gray-800/30 backdrop-blur border border-gray-700/50 rounded-xl p-6 text-center">
              <Mail className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <h3 className="font-semibold text-therive-text mb-2">E-posta Desteği</h3>
              <p className="text-sm text-gray-400 mb-4">
                Detaylı sorularınız için e-posta gönderin
              </p>
              <Link 
                href="/contact"
                className="inline-block px-4 py-2 bg-blue-400/20 text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-400/30 transition-colors"
              >
                E-posta Gönder
              </Link>
            </div>

            <div className="bg-gray-800/30 backdrop-blur border border-gray-700/50 rounded-xl p-6 text-center">
              <Users className="w-8 h-8 text-green-400 mx-auto mb-4" />
              <h3 className="font-semibold text-therive-text mb-2">Topluluk</h3>
              <p className="text-sm text-gray-400 mb-4">
                Diğer kullanıcılarla deneyim paylaşın
              </p>
              <button className="px-4 py-2 bg-green-400/20 text-green-400 rounded-lg text-sm font-medium hover:bg-green-400/30 transition-colors">
                Topluluğa Katıl
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  )
} 