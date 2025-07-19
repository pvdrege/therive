'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  MessageCircle, 
  ArrowLeft,
  Calendar,
  MapPin,
  Link as LinkIcon,
  Share,
  Flag,
  Check,
  X
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Mock user data
const mockUser = {
  id: '1',
  name: 'Ahmet Kaya',
  bio: 'E-ticaret startup\'ı kurucusu ve teknoloji tutkunu. Yenilikçi çözümlerle dijital dönüşümde fark yaratmayı hedefliyorum. 5+ yıllık deneyimle startup ekosisteminde aktif rol alıyor, mentoring yapıyorum.',
  email: 'ahmet@example.com',
  avatar: null,
  intentTags: [
    { id: 'yatirim-ariyorum', name: '#yatırımarıyorum', color: '#10B981' },
    { id: 'partner-ariyorum', name: '#partnerarıyorum', color: '#06B6D4' },
    { id: 'mentor-ariyorum', name: '#mentorarıyorum', color: '#F59E0B' }
  ],
  location: 'İstanbul, Türkiye',
  joinDate: '2024-01-15',
  profileViews: 156,
  connections: 24,
  isOnline: true,
  lastSeen: 'Şu anda aktif'
}

interface ProfilePageProps {
  params: { id: string }
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const [connectionStatus, setConnectionStatus] = useState<'none' | 'pending' | 'connected'>('none')
  const [showConnectionModal, setShowConnectionModal] = useState(false)
  const [connectionMessage, setConnectionMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  const handleConnect = async () => {
    if (connectionStatus === 'connected') {
      // Navigate to chat
      window.location.href = `/messages/${mockUser.id}`
      return
    }

    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setConnectionStatus('pending')
      setShowConnectionModal(false)
      setConnectionMessage('')
    } catch (error) {
      console.error('Connection error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleShareProfile = async () => {
    const profileUrl = `${window.location.origin}/profile/${mockUser.id}`
    
    try {
      await navigator.clipboard.writeText(profileUrl)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (error) {
      console.error('Copy failed:', error)
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = profileUrl
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      try {
        document.execCommand('copy')
        setCopySuccess(true)
        setTimeout(() => setCopySuccess(false), 2000)
      } catch (fallbackError) {
        console.error('Fallback copy failed:', fallbackError)
      }
      document.body.removeChild(textArea)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      month: 'long',
      year: 'numeric'
    })
  }

  const ConnectionModal = () => (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={() => setShowConnectionModal(false)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-800 border border-gray-700 rounded-xl p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-semibold text-therive-text mb-4">
          Bağlantı İsteği Gönder
        </h3>
        <p className="text-gray-400 mb-4">
          <strong className="text-therive-text">{mockUser.name}</strong> ile bağlantı kurmak istediğinizi belirtin.
        </p>
        
        <textarea
          value={connectionMessage}
          onChange={(e) => setConnectionMessage(e.target.value)}
          placeholder="Merhaba! Profilinizi çok beğendim, bağlantı kurmak istiyorum..."
          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-therive-text focus:border-therive-accent focus:outline-none resize-none mb-4"
          rows={4}
          maxLength={300}
          autoFocus
        />
        
        <div className="text-right text-xs text-gray-500 mb-4">
          {connectionMessage.length}/300
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setShowConnectionModal(false)}
            className="flex-1"
          >
            İptal
          </Button>
          <Button
            onClick={handleConnect}
            loading={loading}
            disabled={!connectionMessage.trim()}
            className="flex-1"
          >
            İstek Gönder
          </Button>
        </div>
      </motion.div>
    </div>
  )

  return (
    <div className="min-h-screen bg-therive-dark">
      {/* Header */}
      <header className="border-b border-gray-700/50 bg-gray-900/50 backdrop-blur sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/discover"
                className="text-therive-accent hover:text-therive-accent-hover"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-xl font-semibold text-therive-text">Profil</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Share className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Flag className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/30 border border-gray-700/50 rounded-xl overflow-hidden"
        >
          {/* Profile Header */}
          <div className="p-8">
            <div className="flex items-start gap-6 mb-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-therive-accent to-therive-accent-hover rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-therive-dark" />
                </div>
                {mockUser.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-4 border-gray-800"></div>
                )}
              </div>

              {/* Basic Info */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h1 className="text-3xl font-bold text-therive-text mb-1">{mockUser.name}</h1>
                    <p className="text-therive-accent text-sm">{mockUser.lastSeen}</p>
                  </div>
                  
                  {/* Connection Status */}
                  {connectionStatus === 'pending' ? (
                    <div className="flex items-center gap-2 bg-yellow-600/20 border border-yellow-600/30 rounded-lg px-4 py-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-yellow-400 text-sm font-medium">İstek Gönderildi</span>
                    </div>
                  ) : connectionStatus === 'connected' ? (
                    <div className="flex items-center gap-2 bg-green-600/20 border border-green-600/30 rounded-lg px-4 py-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 text-sm font-medium">Bağlantılı</span>
                    </div>
                  ) : null}
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-6 text-gray-400 text-sm mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {mockUser.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(mockUser.joinDate)} tarihinde katıldı
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 text-sm mb-4">
                  <div className="text-therive-text">
                    <span className="font-semibold">{mockUser.connections}</span>
                    <span className="text-gray-400 ml-1">bağlantı</span>
                  </div>
                  <div className="text-therive-text">
                    <span className="font-semibold">{mockUser.profileViews}</span>
                    <span className="text-gray-400 ml-1">profil görüntüleme</span>
                  </div>
                </div>

                {/* Intent Tags */}
                <div className="flex flex-wrap gap-2">
                  {mockUser.intentTags.map(tag => (
                    <span
                      key={tag.id}
                      className="px-3 py-1 text-sm font-medium rounded-full"
                      style={{
                        backgroundColor: `${tag.color}20`,
                        color: tag.color,
                        border: `1px solid ${tag.color}30`
                      }}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-6">
              <p className="text-gray-300 leading-relaxed">{mockUser.bio}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {connectionStatus === 'connected' ? (
                <Button 
                  onClick={handleConnect}
                  className="flex-1 group"
                >
                  <MessageCircle className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Mesaj Gönder
                </Button>
              ) : connectionStatus === 'pending' ? (
                <Button disabled className="flex-1">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                  İstek Bekliyor
                </Button>
              ) : (
                <Button 
                  onClick={() => setShowConnectionModal(true)}
                  className="flex-1 group"
                >
                  <MessageCircle className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Bağlantı Kur
                </Button>
              )}
              
              <Button 
                variant="outline"
                onClick={handleShareProfile}
                className={`transition-colors ${copySuccess ? 'bg-green-600/20 border-green-600 text-green-400' : ''}`}
              >
                {copySuccess ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Kopyalandı!
                  </>
                ) : (
                  <>
                    <LinkIcon className="w-4 h-4 mr-2" />
                    Profili Paylaş
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Additional Sections */}
          <div className="border-t border-gray-700/50 p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Professional Info */}
              <div>
                <h3 className="text-lg font-semibold text-therive-text mb-4">Profesyonel Bilgiler</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-400 text-sm">Sektör</span>
                    <p className="text-therive-text">E-ticaret & Teknoloji</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Deneyim</span>
                    <p className="text-therive-text">5+ yıl startup deneyimi</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Pozisyon</span>
                    <p className="text-therive-text">Kurucu & CEO</p>
                  </div>
                </div>
              </div>

              {/* Interests */}
              <div>
                <h3 className="text-lg font-semibold text-therive-text mb-4">İlgi Alanları</h3>
                <div className="flex flex-wrap gap-2">
                  {['Startup', 'E-ticaret', 'AI/ML', 'Fintech', 'B2B SaaS', 'Mentoring'].map(interest => (
                    <span
                      key={interest}
                      className="px-3 py-1 text-sm bg-gray-700/50 text-gray-300 rounded-full"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Connection Modal */}
      {showConnectionModal && <ConnectionModal />}
    </div>
  )
} 