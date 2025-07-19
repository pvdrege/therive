'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Bell, 
  CheckCheck, 
  User, 
  MessageCircle, 
  Eye,
  Trash2
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Mock notification data
const mockAllNotifications = [
  {
    id: '1',
    type: 'connection',
    title: 'Yeni bağlantı isteği',
    message: 'Zeynep Arslan sizinle bağlantı kurmak istiyor',
    time: '5 dk',
    unread: true,
    avatar: null
  },
  {
    id: '2',
    type: 'message',
    title: 'Yeni mesaj',
    message: 'Can Yılmaz size bir mesaj gönderdi',
    time: '1 sa',
    unread: true,
    avatar: null
  },
  {
    id: '3',
    type: 'profile_view',
    title: 'Profil görüntüleme',
    message: '5 kişi profilinizi görüntüledi',
    time: '2 sa',
    unread: false,
    avatar: null
  },
  {
    id: '4',
    type: 'connection_accepted',
    title: 'Bağlantı kabul edildi',
    message: 'Mehmet Özkan bağlantı isteğinizi kabul etti',
    time: '3 sa',
    unread: false,
    avatar: null
  },
  {
    id: '5',
    type: 'message',
    title: 'Yeni mesaj',
    message: 'Elif Demir: "Yarın toplantı yapabilir miyiz?"',
    time: '5 sa',
    unread: false,
    avatar: null
  },
  {
    id: '6',
    type: 'connection',
    title: 'Yeni bağlantı isteği',
    message: 'Ali Veli sizinle bağlantı kurmak istiyor',
    time: '1 gün',
    unread: false,
    avatar: null
  },
  {
    id: '7',
    type: 'profile_view',
    title: 'Profil görüntüleme',
    message: '3 kişi profilinizi görüntüledi',
    time: '2 gün',
    unread: false,
    avatar: null
  }
]

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'connection':
    case 'connection_accepted':
      return <User className="w-5 h-5 text-blue-400" />
    case 'message':
      return <MessageCircle className="w-5 h-5 text-therive-accent" />
    case 'profile_view':
      return <Eye className="w-5 h-5 text-orange-400" />
    default:
      return <Bell className="w-5 h-5 text-gray-400" />
  }
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockAllNotifications)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const unreadCount = notifications.filter(n => n.unread).length
  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => n.unread)
    : notifications

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })))
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, unread: false } : n)
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return (
    <div className="min-h-screen bg-therive-dark">
      {/* Header */}
      <header className="border-b border-gray-700/50 bg-gray-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/dashboard"
                className="text-therive-accent hover:text-therive-accent-hover"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-therive-text">Bildirimler</h1>
                <p className="text-gray-400 text-sm">
                  {unreadCount > 0 ? `${unreadCount} okunmamış bildirim` : 'Tüm bildirimler okundu'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Filter */}
              <div className="flex bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    filter === 'all' 
                      ? 'bg-therive-accent text-therive-dark font-medium' 
                      : 'text-gray-400 hover:text-therive-text'
                  }`}
                >
                  Tümü
                </button>
                <button
                  onClick={() => setFilter('unread')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    filter === 'unread' 
                      ? 'bg-therive-accent text-therive-dark font-medium' 
                      : 'text-gray-400 hover:text-therive-text'
                  }`}
                >
                  Okunmamış {unreadCount > 0 && `(${unreadCount})`}
                </button>
              </div>

              {/* Mark all as read */}
              {unreadCount > 0 && (
                <Button
                  onClick={markAllAsRead}
                  variant="outline"
                  size="sm"
                >
                  <CheckCheck className="w-4 h-4 mr-2" />
                  Tümünü Okundu İşaretle
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Notifications List */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {filteredNotifications.length > 0 ? (
          <div className="space-y-4">
            {filteredNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-xl border transition-all group ${
                  notification.unread 
                    ? 'bg-therive-accent/5 border-therive-accent/20 hover:bg-therive-accent/10' 
                    : 'bg-gray-800/30 border-gray-700/50 hover:bg-gray-700/30'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-therive-text mb-1">
                          {notification.title}
                          {notification.unread && (
                            <span className="ml-2 w-2 h-2 bg-therive-accent rounded-full inline-block"></span>
                          )}
                        </h3>
                        <p className="text-gray-400 text-sm mb-2">{notification.message}</p>
                        <span className="text-gray-500 text-xs">{notification.time}</span>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {notification.unread && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-1 text-gray-400 hover:text-therive-accent transition-colors"
                            title="Okundu işaretle"
                          >
                            <CheckCheck className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                          title="Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bell className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-therive-text mb-3">
              {filter === 'unread' ? 'Okunmamış bildirim yok' : 'Henüz bildirim yok'}
            </h3>
            <p className="text-gray-400">
              {filter === 'unread' 
                ? 'Tüm bildirimleriniz okunmuş.' 
                : 'Yeni aktiviteler olduğunda burada göreceksiniz.'
              }
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
} 