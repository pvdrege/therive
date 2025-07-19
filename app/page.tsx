'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Users, Target, Zap } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-therive-dark relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-therive-accent/5 via-transparent to-therive-accent-hover/5" />
      
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-4 sm:p-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl sm:text-2xl font-bold gradient-text"
        >
          therive.io
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Link 
            href="/auth/signin" 
            className="text-therive-text hover:text-therive-accent transition-colors text-sm sm:text-base"
          >
            Giriş Yap
          </Link>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center">
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
            Profesyonel hedeflerini gerçek fırsatlarla buluşturan networking platformu. 
            Doğru kişilerle, doğru zamanda bağlan.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
          >
            <Link 
              href="/auth/signup"
              className="group bg-therive-accent hover:bg-therive-accent-hover text-therive-dark font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg btn-hover flex items-center gap-2 text-base sm:text-lg w-full sm:w-auto justify-center"
            >
              Ağımıza Katıl
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/discover"
              className="text-therive-text hover:text-therive-accent font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg border border-gray-700 hover:border-therive-accent transition-colors w-full sm:w-auto text-center"
            >
              Keşfet
            </Link>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-16 sm:mt-24"
        >
          <div className="text-center p-4 sm:p-6 rounded-xl bg-gray-800/30 backdrop-blur border border-gray-700/30">
            <Target className="w-10 h-10 sm:w-12 sm:h-12 text-therive-accent mx-auto mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Hedef Odaklı Eşleşme</h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Niyet etiketleriyle istediğin alanda bağlantı kur. #yatırımarıyorum, #işarıyorum gibi.
            </p>
          </div>
          
          <div className="text-center p-4 sm:p-6 rounded-xl bg-gray-800/30 backdrop-blur border border-gray-700/30">
            <Users className="w-10 h-10 sm:w-12 sm:h-12 text-therive-accent mx-auto mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Gizlilik Odaklı</h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              İletişim bilgilerin karşılıklı onay olmadan paylaşılmaz. Güvenli networking.
            </p>
          </div>
          
          <div className="text-center p-4 sm:p-6 rounded-xl bg-gray-800/30 backdrop-blur border border-gray-700/30">
            <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-therive-accent mx-auto mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Anlık Bağlantı</h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Gerçek zamanlı sohbet ile hemen iletişime geç. Fırsatları kaçırma.
            </p>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 bg-gradient-to-r from-therive-accent/10 to-therive-accent-hover/10 border-y border-therive-accent/20 py-12 sm:py-16 mt-16 sm:mt-24">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4"
          >
            Kariyerinde bir sonraki adımını at
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base"
          >
            Binlerce profesyonel zaten therive.io'da kariyerini geliştiriyor.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link 
              href="/auth/signup"
              className="bg-therive-accent hover:bg-therive-accent-hover text-therive-dark font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg btn-hover inline-flex items-center gap-2 text-base sm:text-lg"
            >
              Ücretsiz Başla
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-700/30 py-6 sm:py-8 mt-12 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-gray-500 text-sm sm:text-base">
            © 2024 therive.io. Profesyonel networking'de yeni dönem.
          </p>
        </div>
      </footer>
    </main>
  )
} 