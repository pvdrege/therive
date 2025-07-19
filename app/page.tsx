'use client'

import { motion } from 'framer-motion'
import { 
  ArrowRight, Users, Target, Zap, Star, CheckCircle,
  TrendingUp, MessageSquare, Shield, Sparkles
} from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const stats = [
    { label: 'Aktif Kullanıcı', value: '12K+', icon: Users },
    { label: 'Başarılı Bağlantı', value: '8.5K+', icon: CheckCircle },
    { label: 'Ortalama Yanıt Süresi', value: '< 2 saat', icon: Zap },
    { label: 'Başarı Oranı', value: '%89', icon: TrendingUp }
  ]

  const testimonials = [
    {
      name: 'Ahmet Kaya',
      role: 'Startup Kurucusu',
      content: 'therive.io sayesinde ideal co-founder\'ımı buldum. 3 ay içinde 500K$ yatırım aldık!',
      rating: 5
    },
    {
      name: 'Elif Demir', 
      role: 'Senior Developer',
      content: 'İşsiz kaldığım dönemde burada networking yaptım. 1 hafta içinde 3 iş teklifi geldi.',
      rating: 5
    },
    {
      name: 'Mehmet Özkan',
      role: 'Angel Investor',
      content: 'En iyi early-stage startup\'ları burada keşfediyorum. Çok kaliteli bir topluluk.',
      rating: 5
    }
  ]

  const howItWorks = [
    {
      step: '01',
      title: 'Profilini Oluştur',
      description: 'Hedeflerini ve niyetlerini belirten niyet etiketlerini ekle.',
      icon: Target
    },
    {
      step: '02', 
      title: 'Keşfet & Bağlan',
      description: 'Aynı hedeflere sahip profesyonelleri keşfet ve bağlantı kur.',
      icon: Users
    },
    {
      step: '03',
      title: 'İletişime Geç',
      description: 'Güvenli mesajlaşma ile hemen iletişime başla.',
      icon: MessageSquare
    }
  ]

  return (
    <main className="min-h-screen bg-therive-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-therive-accent/5 via-transparent to-therive-accent-hover/5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-therive-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-therive-accent-hover/5 rounded-full blur-3xl" />
      
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-4 sm:p-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-therive-accent to-therive-accent-hover rounded-lg flex items-center justify-center">
            <span className="text-therive-dark font-bold text-sm">T</span>
          </div>
          <span className="text-xl sm:text-2xl font-bold gradient-text">therive.io</span>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-4"
        >
          <Link 
            href="/discover"
            className="hidden sm:inline text-therive-text hover:text-therive-accent transition-colors"
          >
            Keşfet
          </Link>
          <Link 
            href="/auth/signin" 
            className="text-therive-text hover:text-therive-accent transition-colors"
          >
            Giriş Yap
          </Link>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-therive-accent/10 border border-therive-accent/20 rounded-full px-4 py-2 mb-6"
          >
            <Sparkles className="w-4 h-4 text-therive-accent" />
            <span className="text-sm font-medium text-therive-accent">Beta'da 12K+ profesyonel</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
          >
            <span className="text-therive-text">Drive'ını</span><br />
            <span className="gradient-text">Fırsatlara Dönüştür</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg sm:text-xl text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4"
          >
            Türkiye'nin en hızlı büyüyen profesyonel networking platformu. 
            <span className="text-therive-accent font-medium">Yatırım, iş, partner ve mentor</span> arayışlarında doğru eşleşmeleri yakala.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link 
                href="/auth/signup"
                className="group bg-gradient-to-r from-therive-accent to-therive-accent-hover text-therive-dark font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg shadow-therive-accent/25 flex items-center gap-2 text-base sm:text-lg w-full sm:w-auto justify-center hover:shadow-xl hover:shadow-therive-accent/30 transition-all"
              >
                Ücretsiz Katıl
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <Link 
              href="/discover"
              className="text-therive-text hover:text-therive-accent font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl border border-gray-700/50 hover:border-therive-accent/50 hover:bg-therive-accent/5 transition-all backdrop-blur w-full sm:w-auto text-center"
            >
              Platformu Keşfet
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Icon className="w-6 h-6 text-therive-accent mr-2" />
                    <div className="text-2xl sm:text-3xl font-bold text-therive-text">{stat.value}</div>
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-therive-text">
              Nasıl <span className="gradient-text">Çalışır?</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              3 basit adımda profesyonel ağını genişlet ve hedeflerine ulaş
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {howItWorks.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative text-center"
                >
                  {/* Step Number */}
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-therive-accent to-therive-accent-hover rounded-2xl mb-6 shadow-lg shadow-therive-accent/25">
                    <span className="text-xl font-bold text-therive-dark">{item.step}</span>
                  </div>
                  
                  <div className="bg-gray-800/40 backdrop-blur border border-gray-700/50 rounded-2xl p-6 hover:border-therive-accent/30 transition-all duration-300">
                    <Icon className="w-8 h-8 text-therive-accent mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-3 text-therive-text">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{item.description}</p>
                  </div>

                  {/* Connector Line */}
                  {index < howItWorks.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-therive-accent to-therive-accent/30 transform -translate-y-1/2 translate-x-6 z-0" 
                         style={{ width: 'calc(100% - 3rem)' }} />
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 py-16 sm:py-24 bg-gray-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-therive-text">
              <span className="gradient-text">Başarı</span> Hikayeleri
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Gerçek kullanıcılarımızın therive.io ile elde ettikleri başarılar
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/60 backdrop-blur border border-gray-700/50 rounded-2xl p-6 hover:border-therive-accent/30 transition-all duration-300"
              >
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-therive-accent text-therive-accent" />
                  ))}
                </div>
                
                <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.content}"</p>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-therive-accent to-therive-accent-hover rounded-full flex items-center justify-center">
                    <span className="text-therive-dark font-semibold text-sm">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-therive-text">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-therive-text">
              Neden <span className="gradient-text">therive.io</span>?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Profesyonel networking'de fark yaratan özelliklerimiz
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-800/60 to-gray-800/30 backdrop-blur border border-gray-700/50 rounded-2xl p-8 hover:border-therive-accent/30 transition-all duration-300 text-center"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-therive-accent/20 to-therive-accent/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-therive-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-therive-text">Hedef Odaklı Eşleşme</h3>
              <p className="text-gray-400 leading-relaxed">
                Niyet etiketleriyle (<span className="text-therive-accent">#yatırımarıyorum</span>, <span className="text-therive-accent">#işarıyorum</span>) 
                tam istediğin alanda bağlantı kur. Zaman kaybı yok.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-gray-800/60 to-gray-800/30 backdrop-blur border border-gray-700/50 rounded-2xl p-8 hover:border-therive-accent/30 transition-all duration-300 text-center"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-therive-accent/20 to-therive-accent/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-therive-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-therive-text">Gizlilik & Güvenlik</h3>
              <p className="text-gray-400 leading-relaxed">
                İletişim bilgilerin karşılıklı onay olmadan paylaşılmaz. 
                KVKK uyumlu, end-to-end şifrelemeli güvenli ortam.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-gray-800/60 to-gray-800/30 backdrop-blur border border-gray-700/50 rounded-2xl p-8 hover:border-therive-accent/30 transition-all duration-300 text-center"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-therive-accent/20 to-therive-accent/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-therive-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-therive-text">Anlık Bağlantı</h3>
              <p className="text-gray-400 leading-relaxed">
                Real-time bildirimler ve mesajlaşma ile hızla networking yap. 
                Ortalama yanıt süresi <span className="text-therive-accent">2 saatten az</span>.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-16 sm:py-24 bg-gradient-to-r from-therive-accent/10 via-therive-accent/5 to-therive-accent-hover/10 border-y border-therive-accent/20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-therive-text">
              Kariyerinde <span className="gradient-text">Sıçrama</span> Yap
            </h2>
            <p className="text-gray-400 mb-8 text-lg leading-relaxed">
              12,000+ profesyonel zaten therive.io'da ağını genişletiyor. <br />
              Sen de dahil ol, hedeflerine ulaşmak için doğru bağlantıları kur.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  href="/auth/signup"
                  className="bg-gradient-to-r from-therive-accent to-therive-accent-hover text-therive-dark font-bold px-8 py-4 rounded-xl shadow-lg shadow-therive-accent/30 inline-flex items-center gap-2 text-lg hover:shadow-xl hover:shadow-therive-accent/40 transition-all"
                >
                  Hemen Katıl - Ücretsiz
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              <div className="text-sm text-gray-400">
                ✨ Kurulum yok • 💳 Kredi kartı gerekmez
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
} 