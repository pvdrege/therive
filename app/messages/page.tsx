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

// Mock data
const mockConversations = [
  {
    id: '1',
    name: 'Ahmet Kaya',
    lastMessage: 'Merhaba, projeni çok beğendim!',
    lastMessageTime: '2 dk',
    unreadCount: 2,
    isOnline: true,
    infoShared: false,
    avatar: null
  },
  {
    id: '2',
    name: 'Elif Demir',
    lastMessage: 'Yarın toplantı yapabilir miyiz?',
    lastMessageTime: '1 sa',
    unreadCount: 0,
    isOnline: false,
    infoShared: true,
    avatar: null
  },
  {
    id: '3',
    name: 'Mehmet Özkan',
    lastMessage: 'Harika bir fikir, konuşalım',
    lastMessageTime: '3 sa',
    unreadCount: 1,
    isOnline: true,
    infoShared: false,
    avatar: null
  }
]

const mockMessages = [
  {
    id: '1',
    senderId: '1',
    content: 'Merhaba! Profilinizi gördüm, çok etkileyici projeler yapıyorsunuz.',
    timestamp: '2024-01-15T10:00:00Z',
    type: 'text'
  },
  {
    id: '2',
    senderId: 'me',
    content: 'Teşekkür ederim! Sizin de e-ticaret alanındaki deneyiminiz çok değerli.',
    timestamp: '2024-01-15T10:05:00Z',
    type: 'text'
  },
  {
    id: '3',
    senderId: '1',
    content: 'Belki bir kahve içip deneyimlerimizi paylaşabiliriz?',
    timestamp: '2024-01-15T10:10:00Z',
    type: 'text'
  },
  {
    id: '4',
    senderId: 'me',
    content: 'Harika fikir! Bu hafta müsait misiniz?',
    timestamp: '2024-01-15T10:15:00Z',
    type: 'text'
  }
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showInfoShare, setShowInfoShare] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setShowSidebar(true)
        if (!selectedConversation) {
          setSelectedConversation('1') // Auto-select first conversation on desktop
        }
      } else {
        setShowSidebar(false)
      }
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [selectedConversation])

  const activeConversation = mockConversations.find(c => c.id === selectedConversation)

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // TODO: Send message via socket
      console.log('Sending message:', newMessage)
      setNewMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversation(conversationId)
    if (isMobile) {
      setShowSidebar(false)
    }
  }

  const handleBackToList = () => {
    if (isMobile) {
      setSelectedConversation(null)
      setShowSidebar(true)
    }
  }

  const InfoShareModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-full max-w-md"
      >
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-8 h-8 text-therive-accent" />
          <div>
            <h3 className="text-xl font-semibold text-therive-text">Bilgileri Paylaş</h3>
            <p className="text-sm text-gray-400">Güvenli bilgi paylaşımı</p>
          </div>
        </div>
        
        <p className="text-gray-300 mb-6 leading-relaxed">
          <strong className="text-therive-text">{activeConversation?.name}</strong> ile iletişim bilgilerinizi paylaşmak istediğinizi onaylayın. 
          Bu işlem karşılıklı onay gerektirir.
        </p>

        <div className="bg-therive-accent/10 border border-therive-accent/20 rounded-lg p-4 mb-6">
          <h4 className="text-therive-accent font-medium mb-2">Paylaşılacak Bilgiler:</h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• E-posta adresi</li>
            <li>• Telefon numarası (opsiyonel)</li>
            <li>• LinkedIn profili (opsiyonel)</li>
          </ul>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setShowInfoShare(false)}
            className="flex-1"
          >
            İptal
          </Button>
          <Button
            onClick={() => {
              setShowInfoShare(false)
              // TODO: Request info share
            }}
            className="flex-1"
          >
            Bilgileri Paylaş
          </Button>
        </div>
      </motion.div>
    </div>
  )

  return (
    <div className="h-screen bg-therive-dark flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-700/50 bg-gray-900/50 backdrop-blur px-4 sm:px-6 py-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {isMobile && selectedConversation ? (
              <button
                onClick={handleBackToList}
                className="text-therive-accent hover:text-therive-accent-hover"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            ) : (
              <Link 
                href="/dashboard"
                className="text-therive-accent hover:text-therive-accent-hover"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
            )}
            
            <div className="flex items-center gap-3">
              {isMobile && !selectedConversation && (
                <button
                  onClick={() => setShowSidebar(!showSidebar)}
                  className="text-therive-text md:hidden"
                >
                  <Menu className="w-5 h-5" />
                </button>
              )}
              
              <h1 className="text-lg sm:text-xl font-semibold text-therive-text">
                {isMobile && selectedConversation && activeConversation
                  ? activeConversation.name
                  : 'Mesajlar'
                }
              </h1>
            </div>
          </div>
          
          {isMobile && selectedConversation && activeConversation && (
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-therive-accent to-therive-accent-hover rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-therive-dark" />
                </div>
                {activeConversation.isOnline && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900"></div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile Sidebar Overlay */}
        {isMobile && showSidebar && (
          <div 
            className="absolute inset-0 bg-black/50 z-20 md:hidden"
            onClick={() => setShowSidebar(false)}
          />
        )}

        {/* Conversations Sidebar */}
        <div className={`
          ${isMobile ? 'absolute left-0 top-0 bottom-0 z-30 w-80 max-w-[85vw]' : 'w-80 relative'} 
          ${(!showSidebar && !isMobile) ? 'hidden' : ''}
          ${isMobile && !showSidebar ? 'hidden' : ''}
          bg-therive-dark border-r border-gray-700/50 flex flex-col
        `}>
          {/* Close button for mobile */}
          {isMobile && (
            <div className="flex justify-end p-4 border-b border-gray-700/30">
              <button
                onClick={() => setShowSidebar(false)}
                className="text-gray-400 hover:text-therive-text"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
          
          {/* Search */}
          <div className="p-4 border-b border-gray-700/30">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Konuşma ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-sm text-therive-text focus:border-therive-accent focus:outline-none"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {mockConversations.map(conversation => (
              <div
                key={conversation.id}
                onClick={() => handleSelectConversation(conversation.id)}
                className={`p-4 cursor-pointer transition-colors ${
                  selectedConversation === conversation.id
                    ? 'bg-therive-accent/10 border-r-2 border-therive-accent'
                    : 'hover:bg-gray-700/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-therive-accent to-therive-accent-hover rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-therive-dark" />
                    </div>
                    {conversation.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-therive-text truncate">
                        {conversation.name}
                      </h3>
                      <span className="text-xs text-gray-400">{conversation.lastMessageTime}</span>
                    </div>
                    <p className="text-sm text-gray-400 truncate">{conversation.lastMessage}</p>
                    <div className="flex items-center justify-between mt-2">
                      {conversation.infoShared && (
                        <div className="flex items-center gap-1 text-xs text-therive-accent">
                          <Shield className="w-3 h-3" />
                          <span className="hidden sm:inline">Bilgiler paylaşıldı</span>
                        </div>
                      )}
                      {conversation.unreadCount > 0 && (
                        <span className="bg-therive-accent text-therive-dark text-xs font-medium px-2 py-1 rounded-full">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`flex-1 flex flex-col ${isMobile && !selectedConversation ? 'hidden' : ''}`}>
          {activeConversation ? (
            <>
              {/* Chat Header - Desktop Only */}
              {!isMobile && (
                <div className="border-b border-gray-700/30 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-therive-accent to-therive-accent-hover rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-therive-dark" />
                      </div>
                      {activeConversation.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900"></div>
                      )}
                    </div>
                    <div>
                      <h2 className="font-semibold text-therive-text">{activeConversation.name}</h2>
                      <p className="text-xs text-gray-400">
                        {activeConversation.isOnline ? 'Çevrimiçi' : 'Son görülme: 2 sa önce'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!activeConversation.infoShared && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowInfoShare(true)}
                      >
                        <Info className="w-4 h-4 mr-2" />
                        <span className="hidden lg:inline">Bilgileri Paylaş</span>
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                  {mockMessages.map(message => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] sm:max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                          message.senderId === 'me'
                            ? 'bg-therive-accent text-therive-dark ml-4'
                            : 'bg-gray-700 text-therive-text mr-4'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <div className="flex items-center justify-end gap-1 mt-2">
                          <Clock className="w-3 h-3 opacity-60" />
                          <span className="text-xs opacity-60">
                            {new Date(message.timestamp).toLocaleTimeString('tr-TR', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Message Input */}
              <div className="border-t border-gray-700/30 p-4">
                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Mesajınızı yazın..."
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-therive-text focus:border-therive-accent focus:outline-none resize-none"
                      rows={1}
                      style={{ minHeight: '48px', maxHeight: '120px' }}
                    />
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    size={isMobile ? "default" : "lg"}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                
                {/* Mobile Action Buttons */}
                {isMobile && activeConversation && !activeConversation.infoShared && (
                  <div className="mt-3 pt-3 border-t border-gray-700/30">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowInfoShare(true)}
                      className="w-full"
                    >
                      <Info className="w-4 h-4 mr-2" />
                      Bilgileri Paylaş
                    </Button>
                  </div>
                )}
              </div>
            </>
          ) : (
            // Empty state - Show conversation list on mobile
            <div className={`flex-1 flex items-center justify-center ${isMobile ? 'hidden' : ''}`}>
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-therive-text mb-3">Mesajlaşmaya başla</h3>
                <p className="text-gray-400 text-center max-w-sm">
                  Sol taraftan bir konuşma seçin veya yeni bağlantılar kurun.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Mobile: Show conversation list when no conversation is selected */}
        {isMobile && !selectedConversation && (
          <div className="flex-1 flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-gray-700/30">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Konuşma ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-sm text-therive-text focus:border-therive-accent focus:outline-none"
                />
              </div>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto">
              {mockConversations.map(conversation => (
                <div
                  key={conversation.id}
                  onClick={() => handleSelectConversation(conversation.id)}
                  className="p-4 cursor-pointer hover:bg-gray-700/30 transition-colors border-b border-gray-700/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-therive-accent to-therive-accent-hover rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-therive-dark" />
                      </div>
                      {conversation.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-gray-900"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-therive-text truncate">
                          {conversation.name}
                        </h3>
                        <span className="text-xs text-gray-400">{conversation.lastMessageTime}</span>
                      </div>
                      <p className="text-sm text-gray-400 truncate">{conversation.lastMessage}</p>
                      <div className="flex items-center justify-between mt-2">
                        {conversation.infoShared && (
                          <div className="flex items-center gap-1 text-xs text-therive-accent">
                            <Shield className="w-3 h-3" />
                            <span>Paylaşıldı</span>
                          </div>
                        )}
                        {conversation.unreadCount > 0 && (
                          <span className="bg-therive-accent text-therive-dark text-xs font-medium px-2 py-1 rounded-full">
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Info Share Modal */}
      {showInfoShare && <InfoShareModal />}
    </div>
  )
} 