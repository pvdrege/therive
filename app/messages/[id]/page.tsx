'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, 
  ArrowLeft,
  MoreVertical,
  Info,
  Shield,
  Clock,
  User,
  Phone,
  Video
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface MessagePageProps {
  params: { id: string }
}

// Mock conversation data
const mockConversation = {
  id: '1',
  name: 'Ahmet Kaya',
  bio: 'E-ticaret startup\'ı kurucusu',
  isOnline: true,
  infoShared: false,
  avatar: null
}

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

export default function ConversationPage({ params }: MessagePageProps) {
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState(mockMessages)
  const [showInfoShare, setShowInfoShare] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        senderId: 'me',
        content: newMessage,
        timestamp: new Date().toISOString(),
        type: 'text'
      }
      setMessages([...messages, message])
      setNewMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const InfoShareModal = () => (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={() => setShowInfoShare(false)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-8 h-8 text-therive-accent" />
          <div>
            <h3 className="text-xl font-semibold text-therive-text">Bilgileri Paylaş</h3>
            <p className="text-sm text-gray-400">Güvenli bilgi paylaşımı</p>
          </div>
        </div>
        
        <p className="text-gray-300 mb-6 leading-relaxed">
          <strong className="text-therive-text">{mockConversation.name}</strong> ile iletişim bilgilerinizi paylaşmak istediğinizi onaylayın. 
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
    <div className="h-screen bg-therive-dark flex flex-col overflow-hidden">
      {/* Header - Fixed */}
      <header className="flex-shrink-0 border-b border-gray-700/50 bg-gray-900/80 backdrop-blur-sm px-4 py-3 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <Link 
              href="/messages"
              className="text-therive-accent hover:text-therive-accent-hover p-1"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="relative shrink-0">
                <div className="w-9 h-9 bg-gradient-to-br from-therive-accent to-therive-accent-hover rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-therive-dark" />
                </div>
                {mockConversation.isOnline && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900"></div>
                )}
              </div>
              
              <div className="min-w-0 flex-1">
                <h2 className="font-semibold text-therive-text text-sm truncate">{mockConversation.name}</h2>
                <p className="text-xs text-gray-400 truncate">
                  {mockConversation.isOnline ? 'Çevrimiçi' : 'Son görülme: 2 sa önce'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-1 shrink-0">
            <Button variant="ghost" size="sm" className="p-2">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <Video className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Mobile info share button */}
        {!mockConversation.infoShared && (
          <div className="mt-3 sm:hidden">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowInfoShare(true)}
              className="w-full text-xs"
            >
              <Info className="w-4 h-4 mr-2" />
              Bilgileri Paylaş
            </Button>
          </div>
        )}
      </header>

      {/* Messages Container - Scrollable */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <div className="p-4 space-y-4 pb-6">
          <AnimatePresence>
            {messages.map(message => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.senderId === 'me'
                      ? 'bg-therive-accent text-therive-dark rounded-br-md'
                      : 'bg-gray-700 text-therive-text rounded-bl-md'
                  }`}
                >
                  <p className="text-sm leading-relaxed break-words whitespace-pre-wrap">{message.content}</p>
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
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input - Fixed at bottom */}
      <div className="flex-shrink-0 border-t border-gray-700/50 bg-gray-900/80 backdrop-blur-sm p-4 sticky bottom-0">
        {!mockConversation.infoShared && (
          <div className="mb-3 hidden sm:block">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowInfoShare(true)}
              className="text-xs"
            >
              <Info className="w-4 h-4 mr-2" />
              Bilgileri Paylaş
            </Button>
          </div>
        )}
        
        <div className="flex items-end gap-3 max-w-4xl mx-auto">
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Mesajınızı yazın..."
              className="w-full bg-gray-800 border border-gray-600 rounded-2xl px-4 py-3 text-therive-text placeholder-gray-400 focus:border-therive-accent focus:outline-none resize-none transition-colors"
              rows={1}
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            size="lg"
            className="shrink-0 rounded-xl px-4"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Info Share Modal */}
      {showInfoShare && <InfoShareModal />}
    </div>
  )
} 