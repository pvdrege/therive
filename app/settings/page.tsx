'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, User, Lock, Mail, 
  Save, X, Check, AlertTriangle, Eye, EyeOff
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/lib/store'
import AuthWrapper from '@/components/AuthWrapper'

interface ProfileData {
  name: string
  bio: string
  intentTags: string[]
  isPublic: boolean
  profileLink: string
}

interface PasswordData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

interface Notification {
  type: 'success' | 'error'
  message: string
  id: number
}

function SettingsContent() {
  const { user, token, setUser } = useAppStore()
  
  // Profile form state
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    bio: '',
    intentTags: [],
    isPublic: true,
    profileLink: ''
  })

  // Password form state
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  // UI state
  const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile')
  const [loading, setLoading] = useState({
    profile: false,
    password: false
  })
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })

  // Initialize form data from user
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        bio: user.bio || '',
        intentTags: user.intentTags || [],
        isPublic: user.isPublic !== undefined ? user.isPublic : true,
        profileLink: user.profileLink || ''
      })
    }
  }, [user])

  // Add notification
  const addNotification = (type: 'success' | 'error', message: string) => {
    const id = Date.now()
    setNotifications(prev => [...prev, { type, message, id }])
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id))
    }, 5000)
  }

  // Remove notification
  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  // Handle profile update
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!profileData.name.trim()) {
      addNotification('error', 'Ad alanı zorunludur')
      return
    }

    try {
      setLoading(prev => ({ ...prev, profile: true }))

      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Profil güncellenemedi')
      }

      // Update user in store
      setUser(data.user)
      addNotification('success', 'Profil başarıyla güncellendi')
      
    } catch (error: any) {
      console.error('Profile update error:', error)
      addNotification('error', error.message || 'Profil güncellenirken hata oluştu')
    } finally {
      setLoading(prev => ({ ...prev, profile: false }))
    }
  }

  // Handle password change
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      addNotification('error', 'Tüm şifre alanları zorunludur')
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      addNotification('error', 'Yeni şifreler eşleşmiyor')
      return
    }

    if (passwordData.newPassword.length < 8) {
      addNotification('error', 'Yeni şifre en az 8 karakter olmalıdır')
      return
    }

    try {
      setLoading(prev => ({ ...prev, password: true }))

      const response = await fetch('/api/user/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(passwordData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Şifre değiştirilemedi')
      }

      // Clear password form
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })

      addNotification('success', 'Şifre başarıyla güncellendi')
      
    } catch (error: any) {
      console.error('Password change error:', error)
      addNotification('error', error.message || 'Şifre değiştirilirken hata oluştu')
    } finally {
      setLoading(prev => ({ ...prev, password: false }))
    }
  }

  // Handle intent tag changes
  const handleTagAdd = (tag: string) => {
    if (tag && !profileData.intentTags.includes(tag)) {
      setProfileData(prev => ({
        ...prev,
        intentTags: [...prev.intentTags, tag]
      }))
    }
  }

  const handleTagRemove = (tag: string) => {
    setProfileData(prev => ({
      ...prev,
      intentTags: prev.intentTags.filter(t => t !== tag)
    }))
  }

  const availableTags = [
    'yatirim-ariyorum',
    'yatirimci-ariyorum', 
    'partner-ariyorum',
    'mentor-ariyorum',
    'is-ariyorum',
    'calisan-ariyorum',
    'freelance',
    'startup',
    'teknoloji',
    'fintech'
  ]

  return (
    <main className="min-h-screen bg-therive-dark text-therive-text">
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className={`p-4 rounded-lg shadow-lg flex items-center gap-3 max-w-sm ${
                notification.type === 'success' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-red-600 text-white'
              }`}
            >
              {notification.type === 'success' ? (
                <Check className="w-5 h-5" />
              ) : (
                <AlertTriangle className="w-5 h-5" />
              )}
              <p className="flex-1 text-sm">{notification.message}</p>
              <button 
                onClick={() => removeNotification(notification.id)}
                className="text-white/70 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Header */}
      <div className="bg-gray-800/50 border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/dashboard"
                className="inline-flex items-center gap-2 text-therive-accent hover:text-therive-accent-hover"
              >
                <ArrowLeft className="w-4 h-4" />
                Dashboard
              </Link>
              <h1 className="text-2xl font-bold">Hesap Ayarları</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex gap-1 mb-8 bg-gray-800/30 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 rounded-md transition-colors flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'bg-therive-accent text-therive-dark'
                : 'text-gray-400 hover:text-therive-text'
            }`}
          >
            <User className="w-4 h-4" />
            Profil Bilgileri
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`px-6 py-3 rounded-md transition-colors flex items-center gap-2 ${
              activeTab === 'password'
                ? 'bg-therive-accent text-therive-dark'
                : 'text-gray-400 hover:text-therive-text'
            }`}
          >
            <Lock className="w-4 h-4" />
            Şifre Değiştir
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 border border-gray-700 rounded-lg p-6"
          >
            <h2 className="text-xl font-bold mb-6">Profil Bilgileri</h2>
            
            <form onSubmit={handleProfileUpdate} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Ad Soyad *
                </label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-therive-text placeholder-gray-400 focus:ring-2 focus:ring-therive-accent focus:border-transparent"
                  placeholder="Adınız ve soyadınız"
                  required
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Hakkında
                </label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  rows={4}
                  maxLength={500}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-therive-text placeholder-gray-400 focus:ring-2 focus:ring-therive-accent focus:border-transparent resize-none"
                  placeholder="Kendinizden kısaca bahsedin..."
                />
                <p className="text-xs text-gray-400 mt-1">
                  {profileData.bio.length}/500 karakter
                </p>
              </div>

              {/* Profile Link */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Profil Linki
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 bg-gray-600 border border-r-0 border-gray-600 rounded-l-lg text-gray-300 text-sm">
                    therive.com/
                  </span>
                  <input
                    type="text"
                    value={profileData.profileLink}
                    onChange={(e) => setProfileData(prev => ({ ...prev, profileLink: e.target.value }))}
                    className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-r-lg text-therive-text placeholder-gray-400 focus:ring-2 focus:ring-therive-accent focus:border-transparent"
                    placeholder="kendi-linkiniz"
                  />
                </div>
              </div>

              {/* Intent Tags */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  İlgi Alanları
                </label>
                
                {/* Selected Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {profileData.intentTags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-therive-accent/20 text-therive-accent px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      #{tag}
                      <button
                        type="button"
                        onClick={() => handleTagRemove(tag)}
                        className="text-therive-accent hover:text-red-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>

                {/* Available Tags */}
                <div className="space-y-2">
                  <p className="text-xs text-gray-400">Eklemek için tıklayın:</p>
                  <div className="flex flex-wrap gap-2">
                    {availableTags
                      .filter(tag => !profileData.intentTags.includes(tag))
                      .map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => handleTagAdd(tag)}
                          className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1 rounded-full text-sm transition-colors"
                        >
                          #{tag}
                        </button>
                      ))}
                  </div>
                </div>
              </div>

              {/* Visibility */}
              <div>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={profileData.isPublic}
                    onChange={(e) => setProfileData(prev => ({ ...prev, isPublic: e.target.checked }))}
                    className="rounded border-gray-600 text-therive-accent focus:ring-therive-accent focus:ring-offset-0 bg-gray-700"
                  />
                  <span className="text-sm">Profilim herkese açık olsun</span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  disabled={loading.profile}
                  loading={loading.profile}
                  className="flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {loading.profile ? 'Kaydediliyor...' : 'Profili Kaydet'}
                </Button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Password Tab */}
        {activeTab === 'password' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 border border-gray-700 rounded-lg p-6"
          >
            <h2 className="text-xl font-bold mb-6">Şifre Değiştir</h2>
            
            <form onSubmit={handlePasswordChange} className="space-y-6">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Mevcut Şifre *
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? 'text' : 'password'}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                    className="w-full px-4 py-3 pr-12 bg-gray-700 border border-gray-600 rounded-lg text-therive-text placeholder-gray-400 focus:ring-2 focus:ring-therive-accent focus:border-transparent"
                    placeholder="Mevcut şifreniz"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-therive-text"
                  >
                    {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Yeni Şifre *
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="w-full px-4 py-3 pr-12 bg-gray-700 border border-gray-600 rounded-lg text-therive-text placeholder-gray-400 focus:ring-2 focus:ring-therive-accent focus:border-transparent"
                    placeholder="Yeni şifreniz"
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-therive-text"
                  >
                    {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  En az 8 karakter olmalıdır
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Yeni Şifre Tekrar *
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className={`w-full px-4 py-3 pr-12 bg-gray-700 border rounded-lg text-therive-text placeholder-gray-400 focus:ring-2 focus:ring-therive-accent focus:border-transparent ${
                      passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword
                        ? 'border-red-500' 
                        : 'border-gray-600'
                    }`}
                    placeholder="Yeni şifrenizi tekrar girin"
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-therive-text"
                  >
                    {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword && (
                  <p className="text-xs text-red-400 mt-1">
                    Şifreler eşleşmiyor
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  disabled={loading.password}
                  loading={loading.password}
                  className="flex items-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  {loading.password ? 'Değiştiriliyor...' : 'Şifreyi Değiştir'}
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </div>
    </main>
  )
}

export default function SettingsPage() {
  return (
    <AuthWrapper requireAuth={true}>
      <SettingsContent />
    </AuthWrapper>
  )
} 