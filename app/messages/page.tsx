'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, 
  Search, 
  User, 
  ArrowLeft,
  MoreVertical,
  Info,
  Shield,
  Clock,
  X,
  Menu
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/lib/store'
import AuthWrapper from '@/components/AuthWrapper'

interface Conversation {
  id: string
  userId: string
  name: string
  email: string
  avatar: string | null
  isOnline: boolean
  lastMessage: {
    content: string
    createdAt: string
    isFromMe: boolean
  } | null
  unreadCount: number
  infoShared: boolean
}

interface Message {
  id: string
  content: string
  createdAt: string
  senderId: string
  sender: {
    id: string
    name: string
    avatar: string | null
  }
}

function MessagesContent() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const { user, token } = useAppStore()

  // Fetch conversations on component mount
  useEffect(() => {
    fetchConversations()
  }, [])

  const fetchConversations = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/messages', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Konuşmalar yüklenemedi')
      }

      const data = await response.json()
      setConversations(data.conversations)
    } catch (error) {
      console.error('Error fetching conversations:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch messages for selected conversation
  const fetchMessages = async (connectionId: string) => {
    try {
      const response = await fetch(`/api/messages/${connectionId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Mesajlar yüklenemedi')
      }

      const data = await response.json()
      setMessages(data.messages)
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  // Send new message
  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat || sending) return

    try {
      setSending(true)
      const response = await fetch(`/api/messages/${selectedChat}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: newMessage.trim() })
      })

      if (!response.ok) {
        throw new Error('Mesaj gönderilemedi')
      }

      const data = await response.json()
      setMessages(prev => [...prev, data.message])
      setNewMessage('')
      
      // Update conversation list
      await fetchConversations()
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setSending(false)
    }
  }

  const handleChatSelect = (conversationId: string) => {
    setSelectedChat(conversationId)
    fetchMessages(conversationId)
  }

  const selectedConversation = conversations.find(c => c.id === selectedChat)
  
  const filteredConversations = conversations.filter(conv => 
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
    return `${diffDays} gün`
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
      <div className="flex h-screen">
        {/* Sidebar - Conversations List */}
        <div className={`bg-gray-800/50 border-r border-gray-700 w-full md:w-80 flex flex-col ${selectedChat ? 'hidden md:flex' : 'flex'}`}>
          {/* Header */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <Link 
                href="/dashboard"
                className="inline-flex items-center gap-2 text-therive-accent hover:text-therive-accent-hover"
              >
                <ArrowLeft className="w-4 h-4" />
                Dashboard
              </Link>
              <h1 className="text-xl font-bold">Mesajlar</h1>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Konuşmaları ara..."
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-therive-text placeholder-gray-400 focus:ring-2 focus:ring-therive-accent focus:border-transparent"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.length === 0 ? (
              <div className="p-4 text-center text-gray-400">
                <p>Henüz mesajınız bulunmuyor.</p>
                <Link 
                  href="/discover" 
                  className="text-therive-accent hover:underline"
                >
                  Kişiler keşfet
                </Link>
              </div>
            ) : (
              filteredConversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => handleChatSelect(conv.id)}
                  className={`p-4 cursor-pointer hover:bg-gray-700/50 border-b border-gray-700/50 transition-colors ${
                    selectedChat === conv.id ? 'bg-therive-accent/10 border-therive-accent/20' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-therive-accent rounded-full flex items-center justify-center">
                        {conv.avatar ? (
                          <img src={conv.avatar} alt={conv.name} className="w-12 h-12 rounded-full" />
                        ) : (
                          <User className="w-6 h-6 text-therive-dark" />
                        )}
                      </div>
                      {conv.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-gray-800 rounded-full"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-therive-text truncate">{conv.name}</h3>
                        {conv.lastMessage && (
                          <span className="text-xs text-gray-400">
                            {formatTime(conv.lastMessage.createdAt)}
                          </span>
                        )}
                      </div>
                      
                      {conv.lastMessage ? (
                        <p className="text-sm text-gray-400 truncate">
                          {conv.lastMessage.isFromMe ? 'Sen: ' : ''}
                          {conv.lastMessage.content}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-500 italic">Henüz mesaj yok</p>
                      )}
                      
                      <div className="flex items-center gap-2 mt-1">
                        {conv.unreadCount > 0 && (
                          <span className="bg-therive-accent text-therive-dark text-xs px-2 py-1 rounded-full">
                            {conv.unreadCount}
                          </span>
                        )}
                        {conv.infoShared && (
                          <Shield className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className={`flex-1 flex flex-col ${selectedChat ? 'flex' : 'hidden md:flex'}`}>
          {selectedChat && selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="bg-gray-800/50 border-b border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedChat(null)}
                      className="md:hidden"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                    
                    <div className="relative">
                      <div className="w-10 h-10 bg-therive-accent rounded-full flex items-center justify-center">
                        {selectedConversation.avatar ? (
                          <img src={selectedConversation.avatar} alt={selectedConversation.name} className="w-10 h-10 rounded-full" />
                        ) : (
                          <User className="w-5 h-5 text-therive-dark" />
                        )}
                      </div>
                      {selectedConversation.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-gray-800 rounded-full"></div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-semibold">{selectedConversation.name}</h3>
                      <p className="text-xs text-gray-400">
                        {selectedConversation.isOnline ? 'Çevrimiçi' : 'Çevrimdışı'}
                      </p>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.senderId === user?.id
                          ? 'bg-therive-accent text-therive-dark'
                          : 'bg-gray-700 text-therive-text'
                      }`}
                    >
                      <p className="break-words">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.senderId === user?.id ? 'text-therive-dark/70' : 'text-gray-400'
                      }`}>
                        {formatTime(message.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="bg-gray-800/50 border-t border-gray-700 p-4">
                <div className="flex items-end gap-2">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        sendMessage()
                      }
                    }}
                    placeholder="Mesajını yaz..."
                    rows={1}
                    className="flex-1 resize-none bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-therive-text placeholder-gray-400 focus:ring-2 focus:ring-therive-accent focus:border-transparent min-h-[48px] max-h-32"
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!newMessage.trim() || sending}
                    className="h-12 w-12 flex-shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Enter ile gönder, Shift+Enter ile yeni satır
                </p>
              </div>
            </>
          ) : (
            // No Chat Selected
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Mesajlaşmaya başla</h3>
                <p className="text-gray-400 mb-4">Soldan bir konuşma seç veya yeni biri ile bağlantı kur</p>
                <Link href="/discover">
                  <Button>
                    Kişiler Keşfet
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default function MessagesPage() {
  return (
    <AuthWrapper requireAuth={true}>
      <MessagesContent />
    </AuthWrapper>
  )
} 