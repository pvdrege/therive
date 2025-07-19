'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, Filter, MessageCircle, User, ArrowLeft,
  DollarSign, Briefcase, Users, GraduationCap, 
  Zap, Heart, Globe, ShoppingBag, Star, CheckCircle,
  Plus, Settings, Eye, EyeOff
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Footer from '@/components/Footer'

// Mock data for users
const mockUsers = [
  {
    id: '1',
    name: 'Ahmet Kaya',
    bio: 'E-ticaret startup\'ı kurucusu. Teknoloji ve inovasyona tutkulu.',
    avatar: null,
    intentTags: ['yatirim-ariyorum', 'partner-ariyorum'],
    createdAt: '2024-01-15',
    isPremium: true,
    isConnected: false
  },
  {
    id: '2',
    name: 'Elif Demir',
    bio: 'Full-stack developer. React ve Node.js uzmanı. Yeni fırsatlar arıyor.',
    avatar: null,
    intentTags: ['is-ariyorum', 'freelance-ariyorum'],
    createdAt: '2024-01-14',
    isPremium: false,
    isConnected: true
  },
  {
    id: '3',
    name: 'Mehmet Özkan',
    bio: 'Deneyimli mentor ve angel investor. Startup ekosisteminde aktif.',
    avatar: null,
    intentTags: ['mentor-ariyorum', 'network-ariyorum'],
    createdAt: '2024-01-13',
    isPremium: true,
    isConnected: false
  },
  {
    id: '4',
    name: 'Zeynep Arslan',
    bio: 'UX/UI Designer. Erken aşama startup\'larda product design lead\'i.',
    avatar: null,
    intentTags: ['co-founder-ariyorum', 'freelance-ariyorum'],
    createdAt: '2024-01-12',
    isPremium: false,
    isConnected: true
  },
  {
    id: '5',
    name: 'Can Yılmaz',
    bio: 'SaaS startup kurucusu. B2B satış ve pazarlama alanında uzman.',
    avatar: null,
    intentTags: ['yatirim-ariyorum', 'musteri-ariyorum'],
    createdAt: '2024-01-11',
    isPremium: true,
    isConnected: false
  },
  {
    id: '6',
    name: 'Selin Korkmaz',
    bio: 'Digital marketing strategist. Growth hacking ve performance marketing.',
    avatar: null,
    intentTags: ['partner-ariyorum', 'network-ariyorum'],
    createdAt: '2024-01-10',
    isPremium: false,
    isConnected: false
  }
]

const intentTags = [
  { 
    id: 'all', 
    name: 'Tümü', 
    color: '#6B7280',
    gradient: 'from-slate-500 to-slate-600',
    icon: Filter
  },
  { 
    id: 'yatirim-ariyorum', 
    name: '#yatırımarıyorum', 
    color: '#10B981',
    gradient: 'from-emerald-400 to-emerald-600',
    icon: DollarSign
  },
  { 
    id: 'is-ariyorum', 
    name: '#işarıyorum', 
    color: '#3B82F6',
    gradient: 'from-blue-400 to-blue-600',
    icon: Briefcase
  },
  { 
    id: 'co-founder-ariyorum', 
    name: '#cofounderarıyorum', 
    color: '#8B5CF6',
    gradient: 'from-violet-400 to-violet-600',
    icon: Users
  },
  { 
    id: 'mentor-ariyorum', 
    name: '#mentorarıyorum', 
    color: '#F59E0B',
    gradient: 'from-amber-400 to-amber-600',
    icon: GraduationCap
  },
  { 
    id: 'freelance-ariyorum', 
    name: '#freelancearıyorum', 
    color: '#EF4444',
    gradient: 'from-red-400 to-red-600',
    icon: Zap
  },
  { 
    id: 'partner-ariyorum', 
    name: '#partnerarıyorum', 
    color: '#06B6D4',
    gradient: 'from-cyan-400 to-cyan-600',
    icon: Heart
  },
  { 
    id: 'network-ariyorum', 
    name: '#networkarıyorum', 
    color: '#84CC16',
    gradient: 'from-lime-400 to-lime-600',
    icon: Globe
  },
  { 
    id: 'musteri-ariyorum', 
    name: '#müşteriarıyorum', 
    color: '#F97316',
    gradient: 'from-orange-400 to-orange-600',
    icon: ShoppingBag
  }
]

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState('all')
  const [filteredUsers, setFilteredUsers] = useState(mockUsers)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Mock login state
  const [showConnectedUsers, setShowConnectedUsers] = useState(true)
  const [showCreateHashtag, setShowCreateHashtag] = useState(false)

  useEffect(() => {
    let filtered = mockUsers

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.bio.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filter by intent tag
    if (selectedTag !== 'all') {
      filtered = filtered.filter(user =>
        user.intentTags.includes(selectedTag)
      )
    }

    // Filter connected users if toggle is off
    if (!showConnectedUsers) {
      filtered = filtered.filter(user => !user.isConnected)
    }

    // Sort premium users first
    filtered.sort((a, b) => {
      if (a.isPremium && !b.isPremium) return -1
      if (!a.isPremium && b.isPremium) return 1
      return 0
    })

    setFilteredUsers(filtered)
  }, [searchQuery, selectedTag, showConnectedUsers])

  const UserCard = ({ user, index = 0 }: { user: typeof mockUsers[0], index?: number }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: 0,
        transition: { 
          delay: index * 0.1,
          duration: 0.4,
          ease: [0.4, 0, 0.2, 1]
        }
      }}
      exit={{ 
        opacity: 0, 
        scale: 0.9, 
        y: -20,
        transition: { duration: 0.2 }
      }}
      whileHover={{ 
        y: -8, 
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      className={`relative bg-gray-800/50 backdrop-blur border border-gray-700/50 rounded-xl p-6 hover:border-therive-accent/50 transition-all duration-300 hover:shadow-xl hover:shadow-therive-accent/10 ${
        !isLoggedIn ? 'blur-sm pointer-events-none' : ''
      }`}
          >
        {/* Premium Badge */}
        {user.isPremium && (
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold">
            <Star className="w-3 h-3 fill-current" />
            <span>Premium</span>
          </div>
        )}

        {/* Connected Badge */}
        {user.isConnected && isLoggedIn && (
          <div className="absolute top-4 left-4 flex items-center gap-1 bg-green-500/20 border border-green-500/30 text-green-400 px-2 py-1 rounded-full text-xs font-medium">
            <CheckCircle className="w-3 h-3" />
            <span>Bağlantılı</span>
          </div>
        )}

        {/* Avatar and Name */}
        <div className="flex items-start gap-4 mb-4 mt-2">
          <div className="w-14 h-14 bg-gradient-to-br from-therive-accent to-therive-accent-hover rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-therive-dark" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-semibold text-therive-text">{user.name}</h3>
              {user.isPremium && (
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
              )}
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">{user.bio}</p>
          </div>
        </div>

      {/* Intent Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {user.intentTags.map(tagId => {
          const tag = intentTags.find(t => t.id === tagId)
          return tag ? (
            <span
              key={tagId}
              className="px-3 py-1 text-xs font-medium rounded-full"
              style={{
                backgroundColor: `${tag.color}20`,
                color: tag.color,
                border: `1px solid ${tag.color}30`
              }}
            >
              {tag.name}
            </span>
          ) : null
        })}
      </div>

      {/* Action Button */}
      <Link href={`/profile/${user.id}`}>
        <Button className="w-full group">
          <MessageCircle className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
          Bağlantı Kur
        </Button>
      </Link>
    </motion.div>
  )

  return (
    <main className="min-h-screen bg-therive-dark">
      {/* Header */}
      <header className="border-b border-gray-700/50 bg-gray-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <Link 
                href="/"
                className="text-therive-accent hover:text-therive-accent-hover"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-xl sm:text-2xl font-bold gradient-text truncate">therive.io</h1>
            </div>
            <nav className="flex items-center gap-3 sm:gap-6">
              <button 
                onClick={() => setIsLoggedIn(!isLoggedIn)}
                className="px-3 py-1 text-xs bg-therive-accent/20 text-therive-accent rounded border border-therive-accent/30 hover:bg-therive-accent/30 transition-colors"
              >
                {isLoggedIn ? 'Çıkış' : 'Test Login'}
              </button>
              <Link href="/dashboard" className="text-therive-text hover:text-therive-accent transition-colors text-sm sm:text-base hidden sm:inline">
                Dashboard
              </Link>
              <Link href="/auth/signin" className="text-therive-text hover:text-therive-accent transition-colors text-sm sm:text-base">
                Giriş Yap
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Page Title */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-therive-text mb-2 sm:mb-3">Keşfet</h1>
          <p className="text-gray-400 text-base sm:text-lg">Hedeflerini paylaşan profesyonellerle bağlan</p>
        </div>

        {/* Filters */}
        <div className="mb-6 sm:mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="İsim veya açıklama ile ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-10 sm:pl-12 pr-4 py-3 text-therive-text focus:border-therive-accent focus:outline-none text-sm sm:text-base"
            />
          </div>

          {/* Tags Filter */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-gray-400" />
              <h3 className="text-sm font-medium text-gray-300">Kategoriler</h3>
            </div>
            
            {/* Grid Layout for Tags */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {intentTags.map(tag => {
                const IconComponent = tag.icon
                const isSelected = selectedTag === tag.id
                
                return (
                  <motion.button
                    key={tag.id}
                    onClick={() => setSelectedTag(tag.id)}
                    layout
                    whileHover={{ 
                      scale: 1.02,
                      y: -1
                    }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      relative overflow-hidden group
                      px-3 py-3 sm:px-4 sm:py-3.5
                      rounded-xl text-xs sm:text-sm font-semibold 
                      transition-all duration-300 ease-out
                      flex flex-col items-center gap-2
                      backdrop-blur-md border min-h-[80px] sm:min-h-[90px]
                      ${isSelected 
                        ? `bg-gradient-to-br ${tag.gradient} text-white border-white/20 shadow-lg` 
                        : 'bg-gray-800/40 text-gray-300 border-gray-600/50 hover:border-gray-500/70 hover:bg-gray-700/50'
                      }
                    `}
                    style={isSelected ? {
                      boxShadow: `0 4px 20px ${tag.color}30, 0 2px 8px ${tag.color}20`
                    } : {}}
                  >
                    {/* Animated background glow */}
                    {isSelected && (
                      <motion.div
                        layoutId="selectedTagGlow"
                        className={`absolute inset-0 bg-gradient-to-br ${tag.gradient} opacity-15 rounded-xl`}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                    )}
                    
                    {/* Icon */}
                    <IconComponent 
                      className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 relative z-10 ${
                        isSelected 
                          ? 'text-white drop-shadow-sm' 
                          : 'text-gray-400 group-hover:text-gray-200'
                      }`} 
                    />
                    
                    {/* Text */}
                    <span className={`relative z-10 transition-all duration-300 text-center leading-tight ${
                      isSelected ? 'text-white drop-shadow-sm' : 'group-hover:text-gray-100'
                    }`}>
                      {tag.name.replace('#', '')}
                    </span>
                    
                    {/* Selection indicator */}
                    {isSelected && (
                      <motion.div
                        layoutId="selectedIndicator"
                        className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-white/80 rounded-full"
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                    )}
                    
                    {/* Shine effect on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                    />
                  </motion.button>
                )
              })}
              
              {/* Create Hashtag Button */}
              <motion.button
                onClick={() => setShowCreateHashtag(true)}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="relative overflow-hidden group px-3 py-3 sm:px-4 sm:py-3.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ease-out flex flex-col items-center gap-2 backdrop-blur-md border min-h-[80px] sm:min-h-[90px] bg-therive-accent/10 text-therive-accent border-therive-accent/30 hover:border-therive-accent/50 hover:bg-therive-accent/20"
              >
                <Plus className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 relative z-10" />
                <span className="relative z-10 transition-all duration-300 text-center leading-tight">
                  Hashtag Oluştur
                </span>
                <span className="text-[10px] text-therive-accent/70 text-center leading-tight">
                  Admin onayı gerekli
                </span>
              </motion.button>
            </div>
            
            {/* Settings Panel */}
            {isLoggedIn && (
              <div className="mt-4 p-4 bg-gray-800/30 backdrop-blur border border-gray-700/50 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Settings className="w-4 h-4 text-gray-400" />
                    <div>
                      <h4 className="text-sm font-medium text-therive-text">Filtre Ayarları</h4>
                      <p className="text-xs text-gray-400">Keşfet deneyimini özelleştir</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {showConnectedUsers ? <Eye className="w-4 h-4 text-gray-400" /> : <EyeOff className="w-4 h-4 text-gray-400" />}
                      <span className="text-sm text-gray-300">Bağlantı kurduğum kişileri göster</span>
                    </div>
                    <motion.button
                      onClick={() => setShowConnectedUsers(!showConnectedUsers)}
                      whileTap={{ scale: 0.95 }}
                      className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
                        showConnectedUsers ? 'bg-therive-accent' : 'bg-gray-600'
                      }`}
                    >
                      <motion.div
                        className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md"
                        animate={{ x: showConnectedUsers ? 26 : 2 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </motion.button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Login Notice for Non-authenticated Users */}
        {!isLoggedIn && (
          <div className="mb-6 p-4 bg-gradient-to-r from-therive-accent/10 to-therive-accent-hover/10 border border-therive-accent/20 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-therive-accent/20 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-therive-accent" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-therive-text">Giriş yapın</h4>
                <p className="text-xs text-gray-400">Profilleri net görmek ve bağlantı kurmak için giriş yapmanız gerekiyor.</p>
              </div>
              <Link href="/auth/signin" className="ml-auto px-4 py-2 bg-therive-accent text-therive-dark rounded-lg text-sm font-semibold hover:bg-therive-accent-hover transition-colors">
                Giriş Yap
              </Link>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-4 sm:mb-6">
          <p className="text-gray-400 text-sm sm:text-base">
            {filteredUsers.length} profesyonel bulundu
            {selectedTag !== 'all' && ` • ${intentTags.find(t => t.id === selectedTag)?.name} filtresi aktif`}
          </p>
        </div>

        {/* User Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          <AnimatePresence mode="wait">
            {filteredUsers.map((user, index) => (
              <UserCard key={user.id} user={user} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredUsers.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-therive-text mb-3">Sonuç bulunamadı</h3>
            <p className="text-gray-400 mb-6">
              Arama kriterlerinizi değiştirmeyi deneyin.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('')
                setSelectedTag('all')
              }}
            >
              Filtreleri Temizle
            </Button>
          </motion.div>
        )}
      </div>
      
      {/* Create Hashtag Modal */}
      {showCreateHashtag && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowCreateHashtag(false)}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-gray-800 border border-gray-700/50 rounded-2xl p-6 max-w-md w-full shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-therive-text">Yeni Hashtag Oluştur</h3>
              <button
                onClick={() => setShowCreateHashtag(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-therive-text hover:bg-gray-700/50 transition-colors"
              >
                ✕
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Hashtag Adı
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="örn: mentormarıyorum"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-8 pr-4 py-3 text-therive-text focus:border-therive-accent focus:outline-none"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-therive-accent font-medium pointer-events-none">
                    #
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Açıklama
                </label>
                <textarea
                  placeholder="Bu hashtag hangi durumlarda kullanılmalı?"
                  rows={3}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-therive-text focus:border-therive-accent focus:outline-none resize-none"
                />
              </div>
              
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                <div className="flex gap-2">
                  <div className="w-5 h-5 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-amber-500 text-xs">!</span>
                  </div>
                  <div>
                    <p className="text-sm text-amber-200 font-medium">Onay Süreci</p>
                    <p className="text-xs text-amber-300/80 mt-1">
                      Önerilen hashtag admin ekibimiz tarafından incelenecek ve uygun bulunursa 1-3 iş günü içinde listeye eklenecektir.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateHashtag(false)}
                  className="flex-1"
                >
                  İptal
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  onClick={(e) => {
                    e.preventDefault()
                    setShowCreateHashtag(false)
                    // Here would be the API call
                  }}
                >
                  Gönder
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
      
      <Footer />
    </main>
  )
} 