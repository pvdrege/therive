'use client'

import { motion } from 'framer-motion'
import { User, LogOut, Settings, MessageCircle, Users, Bell } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/lib/store'
import AuthWrapper from '@/components/AuthWrapper'
import { useState, useEffect } from 'react'

interface DashboardStats {
  connectionsCount: number
  messagesCount: number
  unreadMessagesCount: number
}

function DashboardContent() {
  const router = useRouter()
  const { user, logout, token } = useAppStore()
  const [stats, setStats] = useState<DashboardStats>({
    connectionsCount: 0,
    messagesCount: 0,
    unreadMessagesCount: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      setLoading(true)
      
      // Fetch conversations to get stats
      const response = await fetch('/api/messages', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        const conversations = data.conversations
        
        setStats({
          connectionsCount: conversations.length,
          messagesCount: conversations.reduce((total: number, conv: any) => 
            total + (conv.lastMessage ? 1 : 0), 0
          ),
          unreadMessagesCount: conversations.reduce((total: number, conv: any) => 
            total + conv.unreadCount, 0
          )
        })
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      logout()
      router.push('/auth/signin')
    }
  }

  const quickActions = [
    {
      icon: MessageCircle,
      title: 'Mesajlar',
      description: 'Konuşmalarını görüntüle',
      href: '/messages',
      color: 'bg-blue-500',
      count: stats.unreadMessagesCount
    },
    {
      icon: Users,
      title: 'Bağlantılar',
      description: 'Ağını genişlet',
      href: '/discover',
      color: 'bg-green-500',
      count: stats.connectionsCount
    },
    {
      icon: Bell,
      title: 'Bildirimler',
      description: 'Son güncellemeler',
      href: '/notifications',
      color: 'bg-yellow-500',
      count: 0
    },
    {
      icon: Settings,
      title: 'Ayarlar',
      description: 'Profilini düzenle',
      href: '/settings',
      color: 'bg-gray-500',
      count: 0
    }
  ]

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Bilinmiyor'
    
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-therive-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-therive-accent"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-therive-dark text-therive-text">
      {/* Header */}
      <div className="bg-gray-800/50 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-therive-accent rounded-full flex items-center justify-center">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full" />
                ) : (
                  <User className="w-8 h-8 text-therive-dark" />
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold">Hoş geldin, {user?.name}!</h1>
                <p className="text-gray-400">{user?.email}</p>
                <p className="text-sm text-gray-500">
                  Üyelik: {formatDate(user?.createdAt)}
                </p>
              </div>
            </div>
            
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Çıkış Yap
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800/50 border border-gray-700 rounded-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Toplam Bağlantı</p>
                <p className="text-2xl font-bold text-therive-accent">{stats.connectionsCount}</p>
              </div>
              <Users className="w-8 h-8 text-therive-accent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800/50 border border-gray-700 rounded-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Aktif Konuşma</p>
                <p className="text-2xl font-bold text-therive-accent">{stats.messagesCount}</p>
              </div>
              <MessageCircle className="w-8 h-8 text-therive-accent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800/50 border border-gray-700 rounded-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Okunmamış Mesaj</p>
                <p className="text-2xl font-bold text-therive-accent">{stats.unreadMessagesCount}</p>
              </div>
              <Bell className="w-8 h-8 text-therive-accent" />
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Hızlı Erişim</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:bg-gray-700/50 transition-colors cursor-pointer"
                onClick={() => router.push(action.href)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  {action.count > 0 && (
                    <span className="bg-therive-accent text-therive-dark text-xs px-2 py-1 rounded-full">
                      {action.count}
                    </span>
                  )}
                </div>
                <h3 className="font-semibold mb-1">{action.title}</h3>
                <p className="text-sm text-gray-400">{action.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Profile Info */}
        {user?.bio && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 mb-8"
          >
            <h2 className="text-xl font-bold mb-4">Hakkımda</h2>
            <p className="text-gray-300">{user.bio}</p>
          </motion.div>
        )}

        {/* Intent Tags */}
        {user?.intentTags && user.intentTags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-800/50 border border-gray-700 rounded-lg p-6"
          >
            <h2 className="text-xl font-bold mb-4">İlgi Alanlarım</h2>
            <div className="flex flex-wrap gap-2">
              {user.intentTags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="bg-therive-accent/20 text-therive-accent px-3 py-1 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  )
}

export default function DashboardPage() {
  return (
    <AuthWrapper requireAuth={true}>
      <DashboardContent />
    </AuthWrapper>
  )
} 