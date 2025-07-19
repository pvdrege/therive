'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, MessageCircle, User, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Mock data for users
const mockUsers = [
  {
    id: '1',
    name: 'Ahmet Kaya',
    bio: 'E-ticaret startup\'ı kurucusu. Teknoloji ve inovasyona tutkulu.',
    avatar: null,
    intentTags: ['yatirim-ariyorum', 'partner-ariyorum'],
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Elif Demir',
    bio: 'Full-stack developer. React ve Node.js uzmanı. Yeni fırsatlar arıyor.',
    avatar: null,
    intentTags: ['is-ariyorum', 'freelance-ariyorum'],
    createdAt: '2024-01-14'
  },
  {
    id: '3',
    name: 'Mehmet Özkan',
    bio: 'Deneyimli mentor ve angel investor. Startup ekosisteminde aktif.',
    avatar: null,
    intentTags: ['mentor-ariyorum', 'network-ariyorum'],
    createdAt: '2024-01-13'
  },
  {
    id: '4',
    name: 'Zeynep Arslan',
    bio: 'UX/UI Designer. Erken aşama startup\'larda product design lead\'i.',
    avatar: null,
    intentTags: ['co-founder-ariyorum', 'freelance-ariyorum'],
    createdAt: '2024-01-12'
  },
  {
    id: '5',
    name: 'Can Yılmaz',
    bio: 'SaaS startup kurucusu. B2B satış ve pazarlama alanında uzman.',
    avatar: null,
    intentTags: ['yatirim-ariyorum', 'musteri-ariyorum'],
    createdAt: '2024-01-11'
  },
  {
    id: '6',
    name: 'Selin Korkmaz',
    bio: 'Digital marketing strategist. Growth hacking ve performance marketing.',
    avatar: null,
    intentTags: ['partner-ariyorum', 'network-ariyorum'],
    createdAt: '2024-01-10'
  }
]

const intentTags = [
  { id: 'all', name: 'Tümü', color: '#6B7280' },
  { id: 'yatirim-ariyorum', name: '#yatırımarıyorum', color: '#10B981' },
  { id: 'is-ariyorum', name: '#işarıyorum', color: '#3B82F6' },
  { id: 'co-founder-ariyorum', name: '#cofounderarıyorum', color: '#8B5CF6' },
  { id: 'mentor-ariyorum', name: '#mentorarıyorum', color: '#F59E0B' },
  { id: 'freelance-ariyorum', name: '#freelancearıyorum', color: '#EF4444' },
  { id: 'partner-ariyorum', name: '#partnerarıyorum', color: '#06B6D4' },
  { id: 'network-ariyorum', name: '#networkarıyorum', color: '#84CC16' },
  { id: 'musteri-ariyorum', name: '#müşteriarıyorum', color: '#F97316' }
]

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState('all')
  const [filteredUsers, setFilteredUsers] = useState(mockUsers)

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

    setFilteredUsers(filtered)
  }, [searchQuery, selectedTag])

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
      className="bg-gray-800/50 backdrop-blur border border-gray-700/50 rounded-xl p-6 hover:border-therive-accent/50 transition-all duration-300 hover:shadow-xl hover:shadow-therive-accent/10"
    >
      {/* Avatar and Name */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 bg-gradient-to-br from-therive-accent to-therive-accent-hover rounded-full flex items-center justify-center">
          <User className="w-6 h-6 text-therive-dark" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-therive-text mb-1">{user.name}</h3>
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
          <div className="flex items-start gap-3">
            <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 mt-2 sm:mt-2" />
            <div className="flex-1">
              <div className="flex flex-wrap gap-2">
                {intentTags.map(tag => (
                  <motion.button
                    key={tag.id}
                    onClick={() => setSelectedTag(tag.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                      selectedTag === tag.id
                        ? 'text-therive-dark shadow-lg transform'
                        : 'text-gray-400 hover:text-therive-text border border-gray-600 hover:border-gray-500 hover:bg-gray-700/30'
                    }`}
                    style={selectedTag === tag.id ? {
                      backgroundColor: tag.color,
                      border: `1px solid ${tag.color}`,
                      boxShadow: `0 4px 12px ${tag.color}40`
                    } : {}}
                  >
                    {tag.name}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>

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
    </main>
  )
} 