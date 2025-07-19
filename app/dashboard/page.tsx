'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  MessageCircle, 
  Users, 
  Target, 
  TrendingUp, 
  Bell,
  Settings,
  LogOut,
  Search,
  Plus,
  Activity,
  X,
  CheckCheck
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Mock data
const mockStats = {
  connections: 24,
  messages: 12,
  profileViews: 156,
  newConnections: 3
}

const mockRecentConnections = [
  {
    id: '1',
    name: 'Ahmet Kaya',
    bio: 'E-ticaret startup\'ı kurucusu',
    status: 'online',
    lastMessage: 'Merhaba, projeni çok beğendim!',
    time: '2 dk',
    unread: 2
  },
  {
    id: '2',
    name: 'Elif Demir',
    bio: 'Full-stack developer',
    status: 'offline',
    lastMessage: 'Yarın toplantı yapabilir miyiz?',
    time: '1 sa',
    unread: 0
  },
  {
    id: '3',
    name: 'Mehmet Özkan',
    bio: 'Angel investor',
    status: 'online',
    lastMessage: 'Harika bir fikir, konuşalım',
    time: '3 sa',
    unread: 1
  }
]

const mockNotifications = [
  {
    id: '1',
    type: 'connection',
    title: 'Yeni bağlantı isteği',
    message: 'Zeynep Arslan sizinle bağlantı kurmak istiyor',
    time: '5 dk',
    unread: true
  },
  {
    id: '2',
    type: 'message',
    title: 'Yeni mesaj',
    message: 'Can Yılmaz size bir mesaj gönderdi',
    time: '1 sa',
    unread: true
  },
  {
    id: '3',
    type: 'profile_view',
    title: 'Profil görüntüleme',
    message: '5 kişi profilinizi görüntüledi',
    time: '2 sa',
    unread: false
  }
]

export default function DashboardPage() {
  const [user, setUser] = useState({
    name: 'Demo Kullanıcı',
    email: 'test@example.com',
    bio: 'Demo hesabı için test kullanıcısı',
    intentTags: ['#yatırımarıyorum', '#networkarıyorum'],
    avatar: null
  })
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState(mockNotifications)

  const unreadNotificationsCount = notifications.filter(n => n.unread).length

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })))
  }

  return (
    <div className="min-h-screen bg-therive-dark">
      {/* Header */}
      <header className="border-b border-gray-700/50 bg-gray-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <Link href="/" className="text-xl sm:text-2xl font-bold gradient-text">
                therive.io
              </Link>
              <nav className="hidden md:flex items-center gap-6 ml-8">
                <Link href="/dashboard" className="text-therive-accent font-medium">
                  Dashboard
                </Link>
                <Link href="/discover" className="text-therive-text hover:text-therive-accent transition-colors">
                  Keşfet
                </Link>
                <Link href="/messages" className="text-therive-text hover:text-therive-accent transition-colors">
                  Mesajlar
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-gray-400 hover:text-therive-accent transition-colors relative"
                >
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-therive-accent rounded-full text-xs"></span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-gray-800 border border-gray-700 rounded-xl shadow-xl z-50"
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-therive-text text-sm sm:text-base">Bildirimler</h3>
                        <button
                          onClick={() => setShowNotifications(false)}
                          className="text-gray-400 hover:text-therive-text"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="space-y-3">
                        {notifications.slice(0, 3).map(notification => (
                          <div
                            key={notification.id}
                            className={`p-3 rounded-lg transition-colors cursor-pointer ${
                              notification.unread ? 'bg-therive-accent/10 hover:bg-therive-accent/20' : 'bg-gray-700/30 hover:bg-gray-700/50'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1 min-w-0">
                                <h4 className="text-xs sm:text-sm font-medium text-therive-text mb-1">
                                  {notification.title}
                                </h4>
                                <p className="text-xs text-gray-400 mb-2 break-words">{notification.message}</p>
                                <span className="text-xs text-gray-500">{notification.time}</span>
                              </div>
                              {notification.unread && (
                                <div className="w-2 h-2 bg-therive-accent rounded-full flex-shrink-0 mt-1"></div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t border-gray-700 mt-4 pt-4 space-y-2">
                        <div className="flex gap-2">
                          <Link href="/notifications" className="flex-1">
                            <Button variant="ghost" size="sm" className="w-full text-therive-accent hover:underline text-xs sm:text-sm">
                              Tüm Bildirimleri Gör
                            </Button>
                          </Link>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={markAllAsRead}
                            className="text-gray-400 hover:text-therive-text"
                          >
                            <CheckCheck className="w-3 h-3 sm:w-4 sm:h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Click outside to close */}
                {showNotifications && (
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setShowNotifications(false)}
                  />
                )}
              </div>
              
              <button className="p-2 text-gray-400 hover:text-therive-accent transition-colors">
                <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-therive-accent to-therive-accent-hover rounded-full flex items-center justify-center">
                <User className="w-3 h-3 sm:w-4 sm:h-4 text-therive-dark" />
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden mt-4 flex items-center justify-center gap-6">
            <Link href="/dashboard" className="text-therive-accent font-medium text-sm">
              Dashboard
            </Link>
            <Link href="/discover" className="text-therive-text hover:text-therive-accent transition-colors text-sm">
              Keşfet
            </Link>
            <Link href="/messages" className="text-therive-text hover:text-therive-accent transition-colors text-sm">
              Mesajlar
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-therive-text mb-2">
            Hoş geldin, {user.name}! 👋
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Bugün networking için harika bir gün. Yeni bağlantılar keşfet!
          </p>
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8"
        >
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <Users className="w-8 h-8 text-therive-accent" />
              <span className="text-sm text-green-400 font-medium">+{mockStats.newConnections}</span>
            </div>
            <h3 className="text-2xl font-bold text-therive-text">{mockStats.connections}</h3>
            <p className="text-gray-400 text-sm">Bağlantı</p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <MessageCircle className="w-8 h-8 text-blue-400" />
              <span className="text-sm text-blue-400 font-medium">Aktif</span>
            </div>
            <h3 className="text-2xl font-bold text-therive-text">{mockStats.messages}</h3>
            <p className="text-gray-400 text-sm">Mesaj</p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <Activity className="w-8 h-8 text-orange-400" />
              <span className="text-sm text-orange-400 font-medium">Bu hafta</span>
            </div>
            <h3 className="text-2xl font-bold text-therive-text">{mockStats.profileViews}</h3>
            <p className="text-gray-400 text-sm">Profil görüntüleme</p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <TrendingUp className="w-8 h-8 text-green-400" />
              <span className="text-sm text-green-400 font-medium">↗ %24</span>
            </div>
            <h3 className="text-2xl font-bold text-therive-text">87%</h3>
            <p className="text-gray-400 text-sm">Profil tamamlanma</p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Recent Connections */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 sm:p-6"
            >
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-therive-text">Son Bağlantılar</h2>
                <Link href="/messages">
                  <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
                    Tümünü Gör
                  </Button>
                </Link>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {mockRecentConnections.map(connection => (
                  <Link href={`/messages/${connection.id}`} key={connection.id}>
                    <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg hover:bg-gray-700/30 transition-colors cursor-pointer">
                      <div className="relative">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-therive-accent to-therive-accent-hover rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 sm:w-5 sm:h-5 text-therive-dark" />
                        </div>
                        {connection.status === 'online' && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full border-2 border-gray-800"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium text-therive-text text-sm sm:text-base truncate">{connection.name}</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">{connection.time}</span>
                            {connection.unread > 0 && (
                              <span className="w-4 h-4 sm:w-5 sm:h-5 bg-therive-accent rounded-full flex items-center justify-center text-xs text-therive-dark font-medium">
                                {connection.unread}
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-400 truncate mb-1">{connection.bio}</p>
                        <p className="text-xs sm:text-sm text-gray-500 truncate">{connection.lastMessage}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Notifications & Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 sm:p-6"
            >
              <h2 className="text-base sm:text-lg font-semibold text-therive-text mb-4">Hızlı Erişim</h2>
              <div className="flex flex-col gap-3 sm:gap-4">
                <Link href="/discover">
                  <Button variant="outline" className="w-full justify-start text-xs sm:text-sm">
                    <Search className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Yeni Kişiler Keşfet
                  </Button>
                </Link>
                <Link href="/profile/edit">
                  <Button variant="outline" className="w-full justify-start text-xs sm:text-sm">
                    <User className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Profili Düzenle
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start text-xs sm:text-sm">
                  <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Niyet Etiketi Ekle
                </Button>
              </div>
            </motion.div>

            {/* Recent Notifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4 sm:p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base sm:text-lg font-semibold text-therive-text">Bildirimler</h2>
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </div>

              <div className="space-y-3">
                {notifications.map(notification => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg transition-colors ${
                      notification.unread ? 'bg-therive-accent/10' : 'bg-gray-700/30'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-medium text-therive-text mb-1">
                          {notification.title}
                        </h4>
                        <p className="text-xs text-gray-400 mb-2 break-words">{notification.message}</p>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-therive-accent rounded-full flex-shrink-0 mt-1"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
} 