'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form gönderimi burada yapılacak
    console.log('Form submitted:', formData)
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'E-posta',
      value: 'hello@therive.io',
      description: 'Genel sorular için'
    },
    {
      icon: Mail,
      title: 'Destek',
      value: 'support@therive.io', 
      description: 'Teknik destek için'
    },
    {
      icon: Phone,
      title: 'Telefon',
      value: '+90 212 555 0123',
      description: 'İş saatleri içinde'
    },
    {
      icon: MapPin,
      title: 'Adres',
      value: 'Maslak Mah. Bilim Sok. No:5',
      description: 'Sarıyer, İstanbul'
    }
  ]

  const supportTopics = [
    {
      icon: '🚀',
      title: 'Platform Kullanımı',
      description: 'Profil oluşturma, eşleşme, mesajlaşma'
    },
    {
      icon: '🔒',
      title: 'Hesap & Güvenlik',
      description: 'Giriş sorunları, şifre sıfırlama, güvenlik'
    },
    {
      icon: '💳',
      title: 'Premium & Ödemeler',
      description: 'Abonelik, faturalama, ücret iadesi'
    },
    {
      icon: '🤝',
      title: 'İş Birliği',
      description: 'Partnerlik, entegrasyon, API'
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-therive-accent to-therive-accent-hover rounded-2xl flex items-center justify-center mx-auto mb-6">
            <MessageSquare className="w-8 h-8 text-therive-dark" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-therive-text">Bizimle</span> <span className="gradient-text">İletişime Geçin</span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Size nasıl yardımcı olabileceğimizi öğrenmek için bizimle iletişime geçin. 
            Sorularınızı yanıtlamaktan mutluluk duyarız.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-gray-800/30 backdrop-blur border border-gray-700/50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-therive-text mb-6">Mesaj Gönderin</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-therive-text focus:border-therive-accent focus:outline-none"
                      placeholder="Adınız ve soyadınız"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      E-posta *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-therive-text focus:border-therive-accent focus:outline-none"
                      placeholder="ornek@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Konu *
                  </label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-therive-text focus:border-therive-accent focus:outline-none"
                  >
                    <option value="">Konu seçiniz</option>
                    <option value="platform">Platform Kullanımı</option>
                    <option value="account">Hesap & Güvenlik</option>
                    <option value="premium">Premium & Ödemeler</option>
                    <option value="partnership">İş Birliği</option>
                    <option value="bug">Hata Bildirimi</option>
                    <option value="feature">Özellik Önerisi</option>
                    <option value="other">Diğer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Mesajınız *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-therive-text focus:border-therive-accent focus:outline-none resize-none"
                    placeholder="Mesajınızı detaylı olarak yazınız..."
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Mesajı Gönder
                </Button>
              </form>

              <div className="mt-6 p-4 bg-therive-accent/10 border border-therive-accent/20 rounded-lg">
                <p className="text-sm text-therive-accent">
                  💡 <strong>Hızlı yanıt için:</strong> Sorununuzu detaylı açıklayın ve mümkünse 
                  ekran görüntüsü ekleyin.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div className="bg-gray-800/30 backdrop-blur border border-gray-700/50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-therive-text mb-6">İletişim Bilgileri</h2>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <div key={info.title} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-therive-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-therive-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-therive-text mb-1">{info.title}</h3>
                        <p className="text-therive-accent font-medium">{info.value}</p>
                        <p className="text-sm text-gray-400">{info.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-8 p-4 bg-gray-700/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-therive-accent" />
                  <h4 className="font-semibold text-therive-text">Çalışma Saatleri</h4>
                </div>
                <div className="text-sm text-gray-300 space-y-1">
                  <p><strong>Pazartesi - Cuma:</strong> 09:00 - 18:00</p>
                  <p><strong>Hafta sonu:</strong> E-posta desteği</p>
                  <p className="text-therive-accent">Ortalama yanıt süresi: 2-4 saat</p>
                </div>
              </div>
            </div>

            {/* Support Topics */}
            <div className="bg-gray-800/30 backdrop-blur border border-gray-700/50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-therive-text mb-6">Destek Konuları</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {supportTopics.map((topic, index) => (
                  <div key={topic.title} className="bg-gray-700/30 rounded-lg p-4 hover:bg-gray-700/50 transition-colors">
                    <div className="text-2xl mb-2">{topic.icon}</div>
                    <h3 className="font-semibold text-therive-text mb-1">{topic.title}</h3>
                    <p className="text-xs text-gray-400">{topic.description}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <h4 className="font-semibold text-blue-400 mb-2">📚 Yardım Merkezi</h4>
                <p className="text-sm text-gray-300 mb-3">
                  Sık sorulan sorular ve detaylı kılavuzlar için yardım merkezimizi ziyaret edin.
                </p>
                <Link 
                  href="/help"
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                >
                  Yardım Merkezi →
                </Link>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-red-400 mb-3">🚨 Acil Destek</h3>
              <p className="text-sm text-gray-300 mb-3">
                Güvenlik endişesi, hesap güvenliği sorunu veya acil durumlar için:
              </p>
              <p className="text-red-400 font-medium">emergency@therive.io</p>
              <p className="text-xs text-gray-400 mt-2">
                24/7 monitörlenir, derhal yanıtlanır
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  )
} 