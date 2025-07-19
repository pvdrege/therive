'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, User, Bell, Shield, Eye, Lock, Mail, 
  Settings, Star, CreditCard, HelpCircle, LogOut,
  Save, X, Check, AlertTriangle, Trash2
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface SettingsData {
  profile: {
    displayName: string
    email: string
    phone: string
    bio: string
    location: string
    website: string
  }
  privacy: {
    profileVisibility: boolean
    showOnlineStatus: boolean
    allowMessageRequests: boolean
    showEmail: boolean
    showPhone: boolean
  }
  notifications: {
    emailNotifications: boolean
    pushNotifications: boolean
    messageNotifications: boolean
    connectionNotifications: boolean
    marketingEmails: boolean
  }
  security: {
    twoFactorEnabled: boolean
    loginAlerts: boolean
    sessionTimeout: number
  }
}

const mockSettings: SettingsData = {
  profile: {
    displayName: 'Demo Kullanıcı',
    email: 'demo@example.com',
    phone: '+90 555 123 4567',
    bio: 'Demo hesabı için test kullanıcısı',
    location: 'İstanbul, Türkiye',
    website: 'https://example.com'
  },
  privacy: {
    profileVisibility: true,
    showOnlineStatus: true,
    allowMessageRequests: true,
    showEmail: false,
    showPhone: false
  },
  notifications: {
    emailNotifications: true,
    pushNotifications: true,
    messageNotifications: true,
    connectionNotifications: true,
    marketingEmails: false
  },
  security: {
    twoFactorEnabled: false,
    loginAlerts: true,
    sessionTimeout: 30
  }
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsData>(mockSettings)
  const [activeSection, setActiveSection] = useState('profile')
  const [hasChanges, setHasChanges] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleSave = () => {
    // TODO: Save to API
    console.log('Saving settings:', settings)
    setHasChanges(false)
  }

  const updateSettings = (section: keyof SettingsData, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }))
    setHasChanges(true)
  }

  const sections = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'privacy', label: 'Gizlilik', icon: Eye },
    { id: 'notifications', label: 'Bildirimler', icon: Bell },
    { id: 'security', label: 'Güvenlik', icon: Shield },
    { id: 'subscription', label: 'Abonelik', icon: Star },
    { id: 'account', label: 'Hesap', icon: Settings }
  ]

  const DeleteAccountModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-800 border border-red-500/50 rounded-xl p-6 w-full max-w-md"
      >
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-8 h-8 text-red-400" />
          <div>
            <h3 className="text-xl font-semibold text-therive-text">Hesabı Sil</h3>
            <p className="text-sm text-gray-400">Bu işlem geri alınamaz</p>
          </div>
        </div>
        
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
          <h4 className="text-red-400 font-medium mb-2">Dikkat!</h4>
          <ul className="text-sm text-red-300/80 space-y-1">
            <li>• Tüm profil bilgileriniz silinecek</li>
            <li>• Mesaj geçmişiniz kaybolacak</li>
            <li>• Bağlantılarınız kesilecek</li>
            <li>• Bu işlem geri alınamaz</li>
          </ul>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Onaylamak için "HESABI SİL" yazın:
          </label>
          <input
            type="text"
            placeholder="HESABI SİL"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-therive-text mb-4"
          />
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setShowDeleteModal(false)}
            className="flex-1"
          >
            İptal
          </Button>
          <Button
            onClick={() => {
              setShowDeleteModal(false)
              // TODO: Delete account
            }}
            className="flex-1 bg-red-600 hover:bg-red-700"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Hesabı Sil
          </Button>
        </div>
      </motion.div>
    </div>
  )

  return (
    <main className="min-h-screen bg-therive-dark">
      {/* Header */}
      <header className="border-b border-gray-700/50 bg-gray-900/50 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <Link 
                href="/dashboard"
                className="text-therive-accent hover:text-therive-accent-hover"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-lg sm:text-xl font-bold text-therive-text">
                Hesap Ayarları
              </h1>
            </div>
            {hasChanges && (
              <Button onClick={handleSave} size="sm">
                <Save className="w-4 h-4 mr-2" />
                Değişiklikleri Kaydet
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur border border-gray-700/50 rounded-2xl p-4 sticky top-24">
              <nav className="space-y-2">
                {sections.map(section => {
                  const Icon = section.icon
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeSection === section.id
                          ? 'bg-therive-accent text-therive-dark'
                          : 'text-gray-300 hover:text-therive-text hover:bg-gray-700/30'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{section.label}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {activeSection === 'profile' && (
                  <>
                    <div className="bg-gray-800/50 backdrop-blur border border-gray-700/50 rounded-2xl p-6">
                      <h2 className="text-xl font-semibold text-therive-text mb-6">Profil Bilgileri</h2>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Görünen Ad
                            </label>
                            <input
                              type="text"
                              value={settings.profile.displayName}
                              onChange={(e) => updateSettings('profile', 'displayName', e.target.value)}
                              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-therive-text focus:border-therive-accent focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              E-posta
                            </label>
                            <input
                              type="email"
                              value={settings.profile.email}
                              onChange={(e) => updateSettings('profile', 'email', e.target.value)}
                              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-therive-text focus:border-therive-accent focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Telefon
                            </label>
                            <input
                              type="tel"
                              value={settings.profile.phone}
                              onChange={(e) => updateSettings('profile', 'phone', e.target.value)}
                              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-therive-text focus:border-therive-accent focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Konum
                            </label>
                            <input
                              type="text"
                              value={settings.profile.location}
                              onChange={(e) => updateSettings('profile', 'location', e.target.value)}
                              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-therive-text focus:border-therive-accent focus:outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Bio
                          </label>
                          <textarea
                            value={settings.profile.bio}
                            onChange={(e) => updateSettings('profile', 'bio', e.target.value)}
                            rows={4}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-therive-text focus:border-therive-accent focus:outline-none resize-none"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Website
                          </label>
                          <input
                            type="url"
                            value={settings.profile.website}
                            onChange={(e) => updateSettings('profile', 'website', e.target.value)}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-therive-text focus:border-therive-accent focus:outline-none"
                            placeholder="https://example.com"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {activeSection === 'privacy' && (
                  <div className="bg-gray-800/50 backdrop-blur border border-gray-700/50 rounded-2xl p-6">
                    <h2 className="text-xl font-semibold text-therive-text mb-6">Gizlilik Ayarları</h2>
                    <div className="space-y-6">
                      {[
                        { key: 'profileVisibility', label: 'Profil Görünürlüğü', desc: 'Profiliniz keşfet sayfasında görünsün' },
                        { key: 'showOnlineStatus', label: 'Çevrimiçi Durum', desc: 'Online olduğunuzda diğer kullanıcılara gösterilsin' },
                        { key: 'allowMessageRequests', label: 'Mesaj İstekleri', desc: 'Bağlantınız olmayan kişilerden mesaj alın' },
                        { key: 'showEmail', label: 'E-posta Göster', desc: 'Bağlantılarınıza e-posta adresinizi gösterin' },
                        { key: 'showPhone', label: 'Telefon Göster', desc: 'Bağlantılarınıza telefon numaranızı gösterin' }
                      ].map(setting => (
                        <div key={setting.key} className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium text-therive-text">{setting.label}</h3>
                            <p className="text-xs text-gray-400">{setting.desc}</p>
                          </div>
                          <button
                            onClick={() => updateSettings('privacy', setting.key, !settings.privacy[setting.key as keyof typeof settings.privacy])}
                            className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                              settings.privacy[setting.key as keyof typeof settings.privacy] ? 'bg-therive-accent' : 'bg-gray-600'
                            }`}
                          >
                            <div className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                              settings.privacy[setting.key as keyof typeof settings.privacy] ? 'translate-x-6' : 'translate-x-0'
                            }`}></div>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSection === 'notifications' && (
                  <div className="bg-gray-800/50 backdrop-blur border border-gray-700/50 rounded-2xl p-6">
                    <h2 className="text-xl font-semibold text-therive-text mb-6">Bildirim Ayarları</h2>
                    <div className="space-y-6">
                      {[
                        { key: 'emailNotifications', label: 'E-posta Bildirimleri', desc: 'Önemli güncellemeler için e-posta alın' },
                        { key: 'pushNotifications', label: 'Push Bildirimleri', desc: 'Tarayıcı bildirimleri gönderin' },
                        { key: 'messageNotifications', label: 'Mesaj Bildirimleri', desc: 'Yeni mesajlar için bildirim' },
                        { key: 'connectionNotifications', label: 'Bağlantı Bildirimleri', desc: 'Yeni bağlantı istekleri için bildirim' },
                        { key: 'marketingEmails', label: 'Pazarlama E-postaları', desc: 'Özellikler ve güncellemeler hakkında e-posta' }
                      ].map(setting => (
                        <div key={setting.key} className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium text-therive-text">{setting.label}</h3>
                            <p className="text-xs text-gray-400">{setting.desc}</p>
                          </div>
                          <button
                            onClick={() => updateSettings('notifications', setting.key, !settings.notifications[setting.key as keyof typeof settings.notifications])}
                            className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                              settings.notifications[setting.key as keyof typeof settings.notifications] ? 'bg-therive-accent' : 'bg-gray-600'
                            }`}
                          >
                            <div className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                              settings.notifications[setting.key as keyof typeof settings.notifications] ? 'translate-x-6' : 'translate-x-0'
                            }`}></div>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSection === 'security' && (
                  <div className="space-y-6">
                    <div className="bg-gray-800/50 backdrop-blur border border-gray-700/50 rounded-2xl p-6">
                      <h2 className="text-xl font-semibold text-therive-text mb-6">Güvenlik Ayarları</h2>
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium text-therive-text">İki Faktörlü Kimlik Doğrulama</h3>
                            <p className="text-xs text-gray-400">Hesabınız için ekstra güvenlik katmanı</p>
                          </div>
                          <Button 
                            variant={settings.security.twoFactorEnabled ? "outline" : "default"}
                            size="sm"
                            onClick={() => updateSettings('security', 'twoFactorEnabled', !settings.security.twoFactorEnabled)}
                          >
                            {settings.security.twoFactorEnabled ? 'Devre Dışı Bırak' : 'Etkinleştir'}
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium text-therive-text">Giriş Uyarıları</h3>
                            <p className="text-xs text-gray-400">Yeni cihaz girişlerinde e-posta gönder</p>
                          </div>
                          <button
                            onClick={() => updateSettings('security', 'loginAlerts', !settings.security.loginAlerts)}
                            className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                              settings.security.loginAlerts ? 'bg-therive-accent' : 'bg-gray-600'
                            }`}
                          >
                            <div className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                              settings.security.loginAlerts ? 'translate-x-6' : 'translate-x-0'
                            }`}></div>
                          </button>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Oturum Zaman Aşımı (dakika)
                          </label>
                          <select
                            value={settings.security.sessionTimeout}
                            onChange={(e) => updateSettings('security', 'sessionTimeout', parseInt(e.target.value))}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-therive-text focus:border-therive-accent focus:outline-none"
                          >
                            <option value={15}>15 dakika</option>
                            <option value={30}>30 dakika</option>
                            <option value={60}>1 saat</option>
                            <option value={120}>2 saat</option>
                            <option value={0}>Asla</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-800/50 backdrop-blur border border-gray-700/50 rounded-2xl p-6">
                      <h2 className="text-xl font-semibold text-therive-text mb-4">Şifre Değişikliği</h2>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Mevcut Şifre
                          </label>
                          <input
                            type="password"
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-therive-text focus:border-therive-accent focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Yeni Şifre
                          </label>
                          <input
                            type="password"
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-therive-text focus:border-therive-accent focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Yeni Şifre (Tekrar)
                          </label>
                          <input
                            type="password"
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-therive-text focus:border-therive-accent focus:outline-none"
                          />
                        </div>
                        <Button>
                          <Lock className="w-4 h-4 mr-2" />
                          Şifreyi Güncelle
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'subscription' && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 rounded-2xl p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <Star className="w-8 h-8 text-yellow-400" />
                        <div>
                          <h2 className="text-xl font-semibold text-therive-text">Premium Üyelik</h2>
                          <p className="text-sm text-gray-400">Tüm özelliklerin kilidini açın</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h3 className="font-medium text-therive-text mb-3">Premium Özellikler:</h3>
                          <ul className="space-y-2 text-sm text-gray-300">
                            <li className="flex items-center gap-2">
                              <Check className="w-4 h-4 text-green-400" />
                              Sınırsız hashtag sabitleme
                            </li>
                            <li className="flex items-center gap-2">
                              <Check className="w-4 h-4 text-green-400" />
                              Gelişmiş filtreleme
                            </li>
                            <li className="flex items-center gap-2">
                              <Check className="w-4 h-4 text-green-400" />
                              Öncelikli görünürlük
                            </li>
                            <li className="flex items-center gap-2">
                              <Check className="w-4 h-4 text-green-400" />
                              Detaylı istatistikler
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-medium text-therive-text mb-3">Mevcut Plan:</h3>
                          <div className="bg-gray-700/50 rounded-lg p-4">
                            <div className="text-lg font-semibold text-therive-text">Ücretsiz Plan</div>
                            <div className="text-sm text-gray-400">Temel özellikler</div>
                          </div>
                        </div>
                      </div>
                      
                      <Button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 hover:from-yellow-500 hover:to-yellow-600">
                        <Star className="w-4 h-4 mr-2" />
                        Premium'a Yükselt
                      </Button>
                    </div>
                  </div>
                )}

                {activeSection === 'account' && (
                  <div className="space-y-6">
                    <div className="bg-gray-800/50 backdrop-blur border border-gray-700/50 rounded-2xl p-6">
                      <h2 className="text-xl font-semibold text-therive-text mb-6">Hesap İşlemleri</h2>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                          <div>
                            <h3 className="text-sm font-medium text-therive-text">Verileri Dışa Aktar</h3>
                            <p className="text-xs text-gray-400">Tüm hesap verilerinizi indirin</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Mail className="w-4 h-4 mr-2" />
                            Dışa Aktar
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg">
                          <div>
                            <h3 className="text-sm font-medium text-therive-text">Hesabı Devre Dışı Bırak</h3>
                            <p className="text-xs text-gray-400">Hesabınızı geçici olarak gizleyin</p>
                          </div>
                          <Button variant="outline" size="sm" className="border-amber-500/30 text-amber-400">
                            Devre Dışı Bırak
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                          <div>
                            <h3 className="text-sm font-medium text-red-400">Hesabı Kalıcı Olarak Sil</h3>
                            <p className="text-xs text-red-300/80">Bu işlem geri alınamaz</p>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setShowDeleteModal(true)}
                            className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Hesabı Sil
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-800/50 backdrop-blur border border-gray-700/50 rounded-2xl p-6">
                      <h2 className="text-xl font-semibold text-therive-text mb-4">Yardım & Destek</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link href="/help">
                          <Button variant="outline" className="w-full justify-start">
                            <HelpCircle className="w-4 h-4 mr-2" />
                            Yardım Merkezi
                          </Button>
                        </Link>
                        <Link href="/contact">
                          <Button variant="outline" className="w-full justify-start">
                            <Mail className="w-4 h-4 mr-2" />
                            İletişim
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && <DeleteAccountModal />}
    </main>
  )
} 