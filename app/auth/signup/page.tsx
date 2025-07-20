'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, User, Mail, Lock, Tag } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/lib/store'

const intentTags = [
  { id: 'yatirim-ariyorum', name: '#yatırımarıyorum', color: '#10B981' },
  { id: 'is-ariyorum', name: '#işarıyorum', color: '#3B82F6' },
  { id: 'co-founder-ariyorum', name: '#cofounderarıyorum', color: '#8B5CF6' },
  { id: 'mentor-ariyorum', name: '#mentorarıyorum', color: '#F59E0B' },
  { id: 'freelance-ariyorum', name: '#freelancearıyorum', color: '#EF4444' },
  { id: 'partner-ariyorum', name: '#partnerarıyorum', color: '#06B6D4' },
  { id: 'network-ariyorum', name: '#networkarıyorum', color: '#84CC16' },
  { id: 'musteri-ariyorum', name: '#müşteriarıyorum', color: '#F97316' }
]

export default function SignUpPage() {
  const router = useRouter()
  const { setUser, setToken, setLoading, setError, loading, error } = useAppStore()
  
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
    selectedTags: [] as string[]
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    if (error) setError(null)
  }

  const toggleTag = (tagId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tagId)
        ? prev.selectedTags.filter(id => id !== tagId)
        : [...prev.selectedTags, tagId]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Kayıt işlemi başarısız')
      }

      // Set user and token in store
      setUser(data.user)
      setToken(data.token)

      // Redirect to dashboard
      router.push('/dashboard')
    } catch (error: any) {
      setError(error.message || 'Kayıt işlemi başarısız')
    } finally {
      setLoading(false)
    }
  }

  const canProceedToStep2 = formData.name.trim() && formData.email.trim() && formData.password.length >= 8
  const canComplete = canProceedToStep2 && formData.selectedTags.length > 0

  return (
    <main className="min-h-screen bg-therive-dark flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-therive-accent hover:text-therive-accent-hover mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Ana Sayfa
          </Link>
          <h1 className="text-3xl font-bold mb-2 text-therive-text">Hesap Oluştur</h1>
          <p className="text-gray-400">Networking yolculuğuna başla</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
            step >= 1 ? 'bg-therive-accent border-therive-accent text-therive-dark' : 'border-gray-600 text-gray-400'
          }`}>
            {step > 1 ? <Check className="w-4 h-4" /> : '1'}
          </div>
          <div className={`w-12 h-0.5 mx-2 ${step > 1 ? 'bg-therive-accent' : 'bg-gray-600'}`} />
          <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
            step >= 2 ? 'bg-therive-accent border-therive-accent text-therive-dark' : 'border-gray-600 text-gray-400'
          }`}>
            {step > 2 ? <Check className="w-4 h-4" /> : '2'}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-600/10 border border-red-600/20 rounded-lg p-4"
            >
              <p className="text-red-400 text-sm">{error}</p>
            </motion.div>
          )}

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-therive-text mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Ad Soyad
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-therive-text focus:border-therive-accent focus:outline-none"
                  placeholder="Ahmet Yılmaz"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-therive-text mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  E-posta
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-therive-text focus:border-therive-accent focus:outline-none"
                  placeholder="ahmet@example.com"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-therive-text mb-2">
                  <Lock className="w-4 h-4 inline mr-2" />
                  Şifre
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-therive-text focus:border-therive-accent focus:outline-none"
                  placeholder="••••••••"
                  minLength={8}
                  required
                  disabled={loading}
                />
                <p className="text-xs text-gray-400 mt-1">En az 8 karakter olmalıdır</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-therive-text mb-2">
                  Kısa Bio (İsteğe bağlı)
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-therive-text focus:border-therive-accent focus:outline-none resize-none"
                  placeholder="Kendini kısaca tanıt..."
                  rows={3}
                  disabled={loading}
                />
              </div>

              <Button 
                type="button"
                onClick={() => setStep(2)}
                disabled={!canProceedToStep2}
                className="w-full"
              >
                Devam Et
              </Button>
            </motion.div>
          )}

          {/* Step 2: Intent Tags */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="text-center">
                <Tag className="w-12 h-12 text-therive-accent mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2 text-therive-text">Niyet Etiketlerin</h2>
                <p className="text-gray-400 text-sm">
                  Ne arıyorsun? Doğru kişilerle eşleşmek için seç.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {intentTags.map(tag => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => toggleTag(tag.id)}
                    disabled={loading}
                    className={`p-4 rounded-lg border-2 text-sm font-medium transition-all ${
                      formData.selectedTags.includes(tag.id)
                        ? 'border-therive-accent bg-therive-accent/10 text-therive-accent'
                        : 'border-gray-600 text-gray-400 hover:border-gray-500'
                    }`}
                  >
                    <div 
                      className="w-3 h-3 rounded-full mb-2 mx-auto"
                      style={{ backgroundColor: tag.color }}
                    />
                    {tag.name}
                  </button>
                ))}
              </div>

              {formData.selectedTags.length > 0 && (
                <div className="bg-therive-accent/10 border border-therive-accent/20 rounded-lg p-4">
                  <p className="text-sm text-therive-accent font-medium mb-2">
                    Seçilen Etiketler ({formData.selectedTags.length})
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {formData.selectedTags.map(tagId => {
                      const tag = intentTags.find(t => t.id === tagId)
                      return tag ? (
                        <span key={tagId} className="text-xs bg-therive-accent/20 text-therive-accent px-2 py-1 rounded">
                          {tag.name}
                        </span>
                      ) : null
                    })}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(1)}
                  disabled={loading}
                  className="flex-1"
                >
                  Geri
                </Button>
                <Button 
                  type="submit"
                  disabled={!canComplete || loading}
                  loading={loading}
                  className="flex-1"
                >
                  {loading ? 'Hesap oluşturuluyor...' : 'Hesap Oluştur'}
                </Button>
              </div>
            </motion.div>
          )}
        </form>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            Zaten hesabın var mı?{' '}
            <Link href="/auth/signin" className="text-therive-accent hover:underline">
              Giriş Yap
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
} 