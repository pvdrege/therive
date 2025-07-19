'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Target, Users, Heart, Zap, Star } from 'lucide-react'
import Link from 'next/link'
import Footer from '@/components/Footer'

export default function AboutPage() {
  const milestones = [
    {
      year: '2023',
      title: 'Başlangıç',
      description: 'therive.io fikri Türkiye\'de networking sorunu yaşayan profesyoneller için doğdu.'
    },
    {
      year: '2024',
      title: 'Beta Lansmanı', 
      description: '1000+ erken kullanıcı ile beta testlerine başladık ve ilk bağlantıları kurduk.'
    },
    {
      year: '2024',
      title: '10K+ Kullanıcı',
      description: 'Topluluk hızla büyüdü, günlük aktif kullanıcı sayımız 2000\'e ulaştı.'
    },
    {
      year: '2024',
      title: 'Premium Özellikler',
      description: 'Gelişmiş filtreler, öncelikli görünürlük ve özel mentoring seçenekleri eklendi.'
    }
  ]

  const values = [
    {
      icon: Target,
      title: 'Hedef Odaklılık',
      description: 'Her bağlantı bir hedefe hizmet etmeli. Rastgele networking değil, amaçlı eşleşme.'
    },
    {
      icon: Heart, 
      title: 'Güven & Gizlilik',
      description: 'Kişisel verileriniz bizim için kutsal. Güvenli ve gizli networking ortamı sağlıyoruz.'
    },
    {
      icon: Users,
      title: 'Topluluk',
      description: 'Bireysel başarı kadar toplumsal değer de yaratıyoruz. Birlikte büyüyoruz.'
    },
    {
      icon: Zap,
      title: 'Hız & Etkinlik', 
      description: 'Zaman değerli. Hızlı eşleşme, anlık iletişim, etkili sonuçlar.'
    }
  ]

  const team = [
    {
      name: 'Ahmet Yılmaz',
      role: 'Kurucu & CEO',
      bio: '10 yıl startup ekosisteminde. Ex-Google, Stanford MBA.'
    },
    {
      name: 'Elif Kaya',
      role: 'CTO & Co-Founder', 
      bio: 'Full-stack geliştirici. AI/ML uzmanı, Berkeley Computer Science.'
    },
    {
      name: 'Mehmet Demir',
      role: 'Head of Community',
      bio: 'Networking uzmanı. 500+ startup mentor, angel investor.'
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
            <nav className="flex items-center gap-3 sm:gap-6">
              <Link href="/discover" className="text-therive-text hover:text-therive-accent transition-colors text-sm sm:text-base">
                Keşfet
              </Link>
              <Link href="/auth/signin" className="text-therive-text hover:text-therive-accent transition-colors text-sm sm:text-base">
                Giriş Yap
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-therive-text">Hikaye</span>
            <span className="gradient-text">miz</span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Türkiye'de profesyonel networking'i yeniden tanımlama hikayemiz
          </p>
        </motion.div>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg prose-gray max-w-none mb-16"
        >
          <div className="bg-gray-800/30 backdrop-blur border border-gray-700/50 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-therive-text mb-6">Problem</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Türkiye'de profesyonel networking büyük bir sorun. LinkedIn benzeri platformlarda kayboluyoruz, 
              etkinliklerde yüzeysel tanışmalar yapıyoruz, ama gerçek anlamda <strong className="text-therive-accent">hedeflerimize uygun</strong> bağlantıları kuramıyoruz.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Yatırım arayan startup kurucusu ile angel investor buluşmuyor. İş arayan yetenekli developer ile 
              işveren karşılaşmıyor. Co-founder arayan girişimci, uyumlu ortağını bulmuyor.
            </p>
          </div>

          <div className="bg-gradient-to-r from-therive-accent/10 to-therive-accent-hover/10 border border-therive-accent/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-therive-text mb-6">Çözümümüz</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              <strong className="text-therive-accent">therive.io</strong> bu soruna köklü bir çözüm getiriyor. 
              Niyet etiketleri (#yatırımarıyorum, #işarıyorum, #cofounderarıyorum) ile tam olarak ne aradığınızı belirtiyorsunuz.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Algoritmamız bu etiketlere göre size en uygun kişileri gösteriyor. Sadece networking değil, 
              <strong className="text-therive-accent"> hedef odaklı networking</strong> yapıyorsunuz.
            </p>
          </div>
        </motion.div>

        {/* Milestones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-therive-text mb-8 text-center">Yolculuğumuz</h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className="flex gap-6 items-start">
                <div className="w-20 h-20 bg-gradient-to-br from-therive-accent to-therive-accent-hover rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-therive-dark font-bold">{milestone.year}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-therive-text mb-2">{milestone.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-therive-text mb-8 text-center">Değerlerimiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={value.title} className="bg-gray-800/30 backdrop-blur border border-gray-700/50 rounded-xl p-6">
                  <div className="w-12 h-12 bg-therive-accent/20 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-therive-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-therive-text mb-3">{value.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-therive-text mb-8 text-center">Ekibimiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <div key={member.name} className="bg-gray-800/30 backdrop-blur border border-gray-700/50 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-therive-accent to-therive-accent-hover rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-therive-dark font-bold text-lg">{member.name.charAt(0)}</span>
                </div>
                <h3 className="text-lg font-semibold text-therive-text mb-1">{member.name}</h3>
                <p className="text-therive-accent text-sm font-medium mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center bg-gradient-to-r from-therive-accent/10 to-therive-accent-hover/10 border border-therive-accent/20 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-therive-text mb-4">Sen de Hikayenin Parçası Ol</h2>
          <p className="text-gray-400 mb-6 leading-relaxed">
            Türkiye'nin profesyonel networking'ini birlikte dönüştürelim. Hedeflerine ulaşmak için 
            doğru bağlantıları kur, değer yarat, büyü.
          </p>
          <Link 
            href="/auth/signup"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-therive-accent to-therive-accent-hover text-therive-dark font-semibold px-8 py-4 rounded-xl shadow-lg shadow-therive-accent/25 hover:shadow-xl hover:shadow-therive-accent/30 transition-all"
          >
            <Star className="w-5 h-5" />
            Topluluğa Katıl
          </Link>
        </motion.div>
      </div>

      <Footer />
    </main>
  )
} 