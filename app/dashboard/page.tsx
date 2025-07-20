'use client'

import { motion } from 'framer-motion'
import { User, LogOut, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/lib/store'
import AuthWrapper from '@/components/AuthWrapper'

function DashboardContent() {
  const router = useRouter()
  const { user, logout } = useAppStore()

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

  return (
    <main className="min-h-screen bg-therive-dark text-therive-text">
      {/* Header */}
      <div className="bg-gray-800/50 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-therive-accent rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-therive-dark" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Hoş geldin, {user?.name}</h1>
                <p className="text-gray-400 text-sm">{user?.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push('/settings')}
              >
                <Settings className="w-4 h-4 mr-2" />
                Ayarlar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Çıkış
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800/50 rounded-lg p-6 border border-gray-700"
          >
            <h2 className="text-lg font-semibold mb-4">Profil Bilgileri</h2>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-400">Ad Soyad</p>
                <p className="font-medium">{user?.name}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-400">E-posta</p>
                <p className="font-medium">{user?.email}</p>
              </div>
              
              {user?.bio && (
                <div>
                  <p className="text-sm text-gray-400">Bio</p>
                  <p className="text-sm">{user.bio}</p>
                </div>
              )}
              
              <div>
                <p className="text-sm text-gray-400">Durum</p>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-500/10 text-green-400">
                  {user?.isActive ? 'Aktif' : 'Devre Dışı'}
                </span>
              </div>
            </div>

            <Button 
              className="w-full mt-4" 
              variant="outline"
              onClick={() => router.push(`/profile/${user?.id}`)}
            >
              Profili Görüntüle
            </Button>
          </motion.div>

          {/* Intent Tags Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800/50 rounded-lg p-6 border border-gray-700"
          >
            <h2 className="text-lg font-semibold mb-4">Niyet Etiketlerin</h2>
            
            {user?.intentTags && user.intentTags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {user.intentTags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-therive-accent/10 text-therive-accent border border-therive-accent/20"
                  >
                    #{tag.replace('-', ' ')}
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400 text-sm mb-4">
                  Henüz hiç niyet etiketi eklenmemiş
                </p>
                <Button 
                  size="sm"
                  onClick={() => router.push('/settings')}
                >
                  Etiket Ekle
                </Button>
              </div>
            )}
          </motion.div>

          {/* Quick Actions Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800/50 rounded-lg p-6 border border-gray-700"
          >
            <h2 className="text-lg font-semibold mb-4">Hızlı Erişim</h2>
            
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => router.push('/discover')}
              >
                🔍 Keşfet
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => router.push('/messages')}
              >
                💬 Mesajlar
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => router.push('/notifications')}
              >
                🔔 Bildirimler
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => router.push('/contact')}
              >
                📞 İletişim
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-therive-accent/10 border border-therive-accent/20 rounded-lg p-6 text-center"
        >
          <h2 className="text-xl font-semibold text-therive-accent mb-2">
            Therive'a Hoş Geldin! 🎉
          </h2>
          <p className="text-gray-300">
            Networking yolculuğuna başlamaya hazır mısın? İlk adımın olarak profilini tamamla ve keşfet sayfasından yeni bağlantılar kur.
          </p>
        </motion.div>
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