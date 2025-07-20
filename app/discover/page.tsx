'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, Filter, MessageCircle, User, ArrowLeft,
  DollarSign, Briefcase, Users, GraduationCap, 
  Zap, Heart, Globe, ShoppingBag, Star, CheckCircle,
  Plus, Settings, Eye, EyeOff, UserPlus, Clock
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/lib/store'
import AuthWrapper from '@/components/AuthWrapper'

interface DiscoveredUser {
  id: string
  name: string
  email: string
  bio: string | null
  avatar: string | null
  intentTags: string[]
  isActive: boolean
  isPublic: boolean
  profileLink: string | null
  createdAt: string
  connectionStatus: 'none' | 'connected' | 'pending_sent' | 'pending_received'
}

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

function DiscoverContent() {
  const { token } = useAppStore()
  const [users, setUsers] = useState<DiscoveredUser[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [pagination, setPagination] = useState<Pagination | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const availableIntentTags = [
    { id: 'yatirim-ariyorum', label: 'Yatırım Arıyorum', icon: DollarSign, color: 'bg-green-500' },
    { id: 'yatirimci-ariyorum', label: 'Yatırımcı Arıyorum', icon: Star, color: 'bg-yellow-500' },
    { id: 'partner-ariyorum', label: 'Partner Arıyorum', icon: Users, color: 'bg-blue-500' },
    { id: 'mentor-ariyorum', label: 'Mentor Arıyorum', icon: GraduationCap, color: 'bg-purple-500' },
    { id: 'is-ariyorum', label: 'İş Arıyorum', icon: Briefcase, color: 'bg-orange-500' },
    { id: 'calisan-ariyorum', label: 'Çalışan Arıyorum', icon: User, color: 'bg-red-500' },
    { id: 'freelance', label: 'Freelance', icon: Zap, color: 'bg-pink-500' },
    { id: 'startup', label: 'Startup', icon: Globe, color: 'bg-indigo-500' },
    { id: 'teknoloji', label: 'Teknoloji', icon: Settings, color: 'bg-gray-500' },
    { id: 'fintech', label: 'Fintech', icon: ShoppingBag, color: 'bg-emerald-500' }
  ]

  useEffect(() => {
    fetchUsers()
  }, [searchQuery, selectedTags])

  const fetchUsers = async (page: number = 1) => {
    try {
      setLoading(true)
      
      const params = new URLSearchParams()
      if (searchQuery) params.set('q', searchQuery)
      if (selectedTags.length > 0) params.set('tags', selectedTags.join(','))
      params.set('page', page.toString())
      params.set('limit', '20')

      const response = await fetch(`/api/discover?${params.toString()}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setUsers(data.users)
        setPagination(data.pagination)
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleTagToggle = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    )
  }

  const getTagInfo = (tagId: string) => {
    return availableIntentTags.find(tag => tag.id === tagId) || {
      id: tagId,
      label: tagId,
      icon: Heart,
      color: 'bg-gray-500'
    }
  }

  const getConnectionButton = (user: DiscoveredUser) => {
    switch (user.connectionStatus) {
      case 'connected':
        return (
          <Button 
            size="sm" 
            variant="outline" 
            className="border-green-500 text-green-400"
            disabled
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Bağlı
          </Button>
        )
      case 'pending_sent':
        return (
          <Button 
            size="sm" 
            variant="outline" 
            className="border-yellow-500 text-yellow-400"
            disabled
          >
            <Clock className="w-4 h-4 mr-2" />
            Beklemede
          </Button>
        )
      case 'pending_received':
        return (
          <Button 
            size="sm" 
            className="bg-therive-accent text-therive-dark"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Kabul Et
          </Button>
        )
      default:
        return (
          <Button 
            size="sm" 
            className="bg-therive-accent text-therive-dark"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Bağlan
          </Button>
        )
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading && users.length === 0) {
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
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Link 
                href="/dashboard"
                className="inline-flex items-center gap-2 text-therive-accent hover:text-therive-accent-hover"
              >
                <ArrowLeft className="w-4 h-4" />
                Dashboard
              </Link>
              <h1 className="text-2xl font-bold">Kişiler Keşfet</h1>
            </div>

            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filtrele
              {showFilters ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="İsim, e-posta veya bio ile arama yapın..."
              className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-therive-text placeholder-gray-400 focus:ring-2 focus:ring-therive-accent focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-gray-800/30 rounded-lg p-4 mb-4"
              >
                <h3 className="text-sm font-medium mb-3">İlgi Alanları</h3>
                <div className="flex flex-wrap gap-2">
                  {availableIntentTags.map((tag) => {
                    const Icon = tag.icon
                    const isSelected = selectedTags.includes(tag.id)
                    
                    return (
                      <button
                        key={tag.id}
                        onClick={() => handleTagToggle(tag.id)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm transition-all ${
                          isSelected
                            ? 'bg-therive-accent text-therive-dark'
                            : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {tag.label}
                      </button>
                    )
                  })}
                </div>
                {selectedTags.length > 0 && (
                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-sm text-gray-400">Aktif filtreler:</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedTags([])}
                      className="text-therive-accent"
                    >
                      Temizle
                    </Button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Users Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {users.length === 0 && !loading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Kullanıcı bulunamadı</h3>
            <p className="text-gray-400">
              Arama kriterlerinize uygun kullanıcı bulunamadı. Filtreleri değiştirerek tekrar deneyin.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {users.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:bg-gray-700/30 transition-colors"
                >
                  {/* User Avatar & Name */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-therive-accent rounded-full flex items-center justify-center flex-shrink-0">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
                      ) : (
                        <User className="w-6 h-6 text-therive-dark" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-therive-text mb-1">{user.name}</h3>
                      <p className="text-sm text-gray-400">
                        Katıldı: {formatDate(user.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Bio */}
                  {user.bio && (
                    <p className="text-sm text-gray-300 mb-4 line-clamp-3">
                      {user.bio}
                    </p>
                  )}

                  {/* Intent Tags */}
                  {user.intentTags.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {user.intentTags.slice(0, 3).map((tagId) => {
                          const tagInfo = getTagInfo(tagId)
                          const Icon = tagInfo.icon
                          
                          return (
                            <span
                              key={tagId}
                              className="flex items-center gap-1 px-2 py-1 bg-therive-accent/20 text-therive-accent rounded-full text-xs"
                            >
                              <Icon className="w-3 h-3" />
                              {tagInfo.label}
                            </span>
                          )
                        })}
                        {user.intentTags.length > 3 && (
                          <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs">
                            +{user.intentTags.length - 3} daha
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {getConnectionButton(user)}
                    
                    {user.connectionStatus === 'connected' && (
                      <Button size="sm" variant="outline">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Mesaj
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  disabled={!pagination.hasPrev}
                  onClick={() => fetchUsers(pagination.page - 1)}
                >
                  Önceki
                </Button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                    const page = Math.max(1, pagination.page - 2) + i
                    if (page > pagination.totalPages) return null
                    
                    return (
                      <Button
                        key={page}
                        variant={page === pagination.page ? "default" : "ghost"}
                        size="sm"
                        onClick={() => fetchUsers(page)}
                      >
                        {page}
                      </Button>
                    )
                  })}
                </div>
                
                <Button
                  variant="outline"
                  disabled={!pagination.hasNext}
                  onClick={() => fetchUsers(pagination.page + 1)}
                >
                  Sonraki
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}

export default function DiscoverPage() {
  return (
    <AuthWrapper requireAuth={true}>
      <DiscoverContent />
    </AuthWrapper>
  )
} 