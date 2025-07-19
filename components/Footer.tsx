'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Twitter, Linkedin, Instagram, Mail, Phone, 
  MapPin, Heart, ArrowUp, Github 
} from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerSections = [
    {
      title: 'Platform',
      links: [
        { name: 'Keşfet', href: '/discover' },
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Mesajlar', href: '/messages' },
        { name: 'Profil', href: '/profile' }
      ]
    },
    {
      title: 'Hakkımızda',
      links: [
        { name: 'Hikayemiz', href: '/about' },
        { name: 'Kariyer', href: '/careers' },
        { name: 'Blog', href: '/blog' },
        { name: 'Basın', href: '/press' }
      ]
    },
    {
      title: 'Destek',
      links: [
        { name: 'Yardım Merkezi', href: '/help' },
        { name: 'İletişim', href: '/contact' },
        { name: 'SSS', href: '/faq' },
        { name: 'Topluluk', href: '/community' }
      ]
    },
    {
      title: 'Yasal',
      links: [
        { name: 'Gizlilik Politikası', href: '/privacy' },
        { name: 'Kullanım Koşulları', href: '/terms' },
        { name: 'Çerez Politikası', href: '/cookies' },
        { name: 'KVKK', href: '/gdpr' }
      ]
    }
  ]

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#', color: '#1DA1F2' },
    { name: 'LinkedIn', icon: Linkedin, href: '#', color: '#0077B5' },
    { name: 'Instagram', icon: Instagram, href: '#', color: '#E4405F' },
    { name: 'GitHub', icon: Github, href: '#', color: '#333' }
  ]

  return (
    <footer className="bg-gray-900/80 backdrop-blur border-t border-gray-700/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-therive-accent to-therive-accent-hover rounded-lg flex items-center justify-center">
                  <span className="text-therive-dark font-bold text-sm">T</span>
                </div>
                <h3 className="text-xl font-bold gradient-text">therive.io</h3>
              </div>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Profesyonellerin hedeflerini gerçekleştirmek için bir araya geldiği platform. 
                Yatırım, iş, partner ve mentor arayışlarınızda doğru bağlantıları kurun.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>hello@therive.io</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+90 212 555 0123</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>İstanbul, Türkiye</span>
                </div>
              </div>
            </div>

            {/* Links Sections */}
            {footerSections.map((section, index) => (
              <div key={section.title} className="lg:col-span-1">
                <h4 className="text-therive-text font-semibold mb-4 text-sm uppercase tracking-wide">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href}
                        className="text-gray-400 hover:text-therive-accent transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="mt-12 pt-8 border-t border-gray-700/50">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="lg:max-w-md">
                <h4 className="text-therive-text font-semibold mb-2">Haberlerden haberdar olun</h4>
                <p className="text-gray-400 text-sm">
                  Yeni özellikler, başarı hikayeleri ve networking ipuçları için bültene abone olun.
                </p>
              </div>
              
              <div className="flex gap-3 lg:min-w-[320px]">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2.5 text-therive-text text-sm focus:border-therive-accent focus:outline-none"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-therive-accent to-therive-accent-hover text-therive-dark px-6 py-2.5 rounded-lg font-semibold text-sm hover:shadow-lg transition-all duration-300"
                >
                  Abone Ol
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-6 border-t border-gray-700/30">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-6">
              <p className="text-gray-400 text-sm">
                © 2024 therive.io. Tüm hakları saklıdır.
              </p>
              <div className="hidden sm:flex items-center gap-1 text-gray-400 text-sm">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500 fill-current" />
                <span>in İstanbul</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-8 h-8 bg-gray-800/60 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-all duration-300"
                      style={{ '--hover-color': social.color } as React.CSSProperties}
                    >
                      <Icon className="w-4 h-4 text-gray-400 hover:text-therive-accent transition-colors" />
                    </motion.a>
                  )
                })}
              </div>
              
              {/* Scroll to Top */}
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-8 h-8 bg-therive-accent/10 hover:bg-therive-accent/20 border border-therive-accent/30 rounded-lg flex items-center justify-center transition-all duration-300"
              >
                <ArrowUp className="w-4 h-4 text-therive-accent" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 