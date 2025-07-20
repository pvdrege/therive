'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  Bell, 
  CheckCheck, 
  User, 
  MessageCircle, 
  Eye,
  Shield,
  Settings,
  Trash2,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/lib/store'
import AuthWrapper from '@/components/AuthWrapper'

interface Notification {
  id: string
  type: 'PROFILE_UPDATED' | 'PASSWORD_CHANGED' | 'NEW_CONNECTION_REQUEST' | 'CONNECTION_ACCEPTED' | 'NEW_MESSAGE' | 'SYSTEM_ANNOUNCEMENT'
  title: string
  content: string
  isRead: boolean
  createdAt: string
  data?: any
}

function NotificationsContent() {
  const { token } = useAppStore()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [unreadCount, setUnreadCount] = useState(0)
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'unread'>('all')

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/notifications', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setNotifications(data.notifications)
        setUnreadCount(data.unreadCount)
      }
    } catch (error) {
      console.error('Error fetching notifications:', error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (notificationIds: string[]) => {
    try {
      await fetch('/api/notifications', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          action: 'mark_read',
          notificationIds 
        })
      })

      // Update local state
      setNotifications(prev =>
        prev.map(notification =>
          notificationIds.includes(notification.id)
            ? { ...notification, isRead: true }
            : notification
        )
      )
      setUnreadCount(prev => Math.max(0, prev - notificationIds.length))
    } catch (error) {
      console.error('Error marking notifications as read:', error)
    }
  }

  const markAllAsRead = async () => {
    try {
      await fetch('/api/notifications', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          action: 'mark_all_read'
        })
      })

      // Update local state
      setNotifications(prev =>
        prev.map(notification => ({ ...notification, isRead: true }))
      )
      setUnreadCount(0)
    } catch (error) {
      console.error('Error marking all notifications as read:', error)
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'PROFILE_UPDATED':
        return <Settings className="w-5 h-5 text-blue-400" />
      case 'PASSWORD_CHANGED':
        return <Shield className="w-5 h-5 text-green-400" />
      case 'NEW_CONNECTION_REQUEST':
        return <User className="w-5 h-5 text-therive-accent" />
      case 'CONNECTION_ACCEPTED':
        return <CheckCheck className="w-5 h-5 text-green-400" />
      case 'NEW_MESSAGE':
        return <MessageCircle className="w-5 h-5 text-blue-400" />
      case 'SYSTEM_ANNOUNCEMENT':
        return <AlertCircle className="w-5 h-5 text-orange-400" />
      default:
        return <Bell className="w-5 h-5 text-gray-400" />
    }
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 1) return 'Şimdi'
    if (diffMins < 60) return `${diffMins} dk`
    if (diffHours < 24) return `${diffHours} sa`
    if (diffDays < 7) return `${diffDays} gün`
    return date.toLocaleDateString('tr-TR')
  }

  const filteredNotifications = selectedFilter === 'all' 
    ? notifications 
    : notifications.filter(n => !n.isRead)

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
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-3">
                  <Bell className="w-6 h-6" />
                  Bildirimler
                  {unreadCount > 0 && (
                    <span className="bg-therive-accent text-therive-dark text-sm px-2 py-1 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </h1>
              </div>
            </div>

            {unreadCount > 0 && (
              <Button 
                onClick={markAllAsRead}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <CheckCheck className="w-4 h-4" />
                Tümünü Okundu İşaretle
              </Button>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-1 mt-4 bg-gray-800/30 p-1 rounded-lg w-fit">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-md text-sm transition-colors ${
                selectedFilter === 'all'
                  ? 'bg-therive-accent text-therive-dark'
                  : 'text-gray-400 hover:text-therive-text'
              }`}
            >
              Tümü ({notifications.length})
            </button>
            <button
              onClick={() => setSelectedFilter('unread')}
              className={`px-4 py-2 rounded-md text-sm transition-colors ${
                selectedFilter === 'unread'
                  ? 'bg-therive-accent text-therive-dark'
                  : 'text-gray-400 hover:text-therive-text'
              }`}
            >
              Okunmamış ({unreadCount})
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {selectedFilter === 'all' ? 'Henüz bildirim yok' : 'Okunmamış bildirim yok'}
            </h3>
            <p className="text-gray-400">
              {selectedFilter === 'all' 
                ? 'Yeni bildirimler burada görünecek'
                : 'Tüm bildirimleriniz okunmuş'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {filteredNotifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:bg-gray-700/30 transition-colors ${
                    !notification.isRead ? 'border-therive-accent/30' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-therive-text mb-1">
                            {notification.title}
                          </h3>
                          <p className="text-sm text-gray-300 mb-2">
                            {notification.content}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-400">
                            <span>{formatTime(notification.createdAt)}</span>
                            {!notification.isRead && (
                              <span className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-therive-accent rounded-full"></div>
                                Okunmadı
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {!notification.isRead && (
                          <Button
                            onClick={() => markAsRead([notification.id])}
                            variant="ghost"
                            size="sm"
                            className="text-therive-accent hover:text-therive-accent-hover"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </main>
  )
}

export default function NotificationsPage() {
  return (
    <AuthWrapper requireAuth={true}>
      <NotificationsContent />
    </AuthWrapper>
  )
} 