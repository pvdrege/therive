'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, User, Mail, Lock, Eye, EyeOff, Check,
  ChevronRight, ChevronLeft, UserPlus, Briefcase, 
  Heart, DollarSign, Users, Target, Zap
} from 'lucide-react'
import Link from 'next/link'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'

const intentOptions = [
  { id: 'yatirim-ariyorum', label: 'Yatırım Arıyorum', icon: DollarSign, color: 'bg-green-500' },
  { id: 'partner-ariyorum', label: 'Partner Arıyorum', icon: Users, color: 'bg-blue-500' },
  { id: 'is-ariyorum', label: 'İş Arıyorum', icon: Briefcase, color: 'bg-purple-500' },
  { id: 'mentor-ariyorum', label: 'Mentor Arıyorum', icon: Target, color: 'bg-orange-500' },
  { id: 'freelance-ariyorum', label: 'Freelance Arıyorum', icon: Zap, color: 'bg-pink-500' },
  { id: 'network-ariyorum', label: 'Network Arıyorum', icon: Heart, color: 'bg-red-500' }
]

export default function SignUpPage() {
  const router = useRouter()
  const { setAuth } = useAppStore()
  
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    bio: '',
    selectedTags: [] as string[]
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    if (error) setError(null)
  }

  const validateStep1 = () => {
    const { name, email, password, confirmPassword } = formData
    
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError('Tüm alanları doldurmanız gerekiyor')
      return false
    }
    
    if (name.trim().length < 2) {
      setError('İsim en az 2 karakter olmalıdır')
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Geçerli bir e-posta adresi girin')
      return false
    }

    if (password.length < 8) {
      setError('Şifre en az 8 karakter olmalıdır')
      return false
    }

    if (password !== confirmPassword) {
      setError('Şifreler eşleşmiyor')
      return false
    }

    return true
  }

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
      setError(null)
    }
  }

  const handleTagToggle = (tagId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedTags: prev.selectedTags.includes(tagId)
        ? prev.selectedTags.filter(id => id !== tagId)
        : [...prev.selectedTags, tagId]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateStep1()) return
    
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

      if (response.ok) {
        // Store user and token
        setAuth(data.token, data.user)
        
        // Redirect to dashboard
        setTimeout(() => {
          router.push('/dashboard')
        }, 100)
      } else {
        setError(data.error || 'Kayıt olurken bir hata oluştu')
      }
    } catch (err) {
      console.error('Signup error:', err)
      setError('Sunucu ile bağlantı kurulamadı')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-therive-dark via-gray-900 to-therive-dark flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-therive-accent hover:text-therive-accent-hover mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Ana Sayfaya Dön
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-therive-text mb-2">
              Therive'a Katılın
            </h1>
            <p className="text-gray-400">
              {step === 1 ? 'Hesap bilgilerinizi girin' : 'İlgi alanlarınızı seçin (isteğe bağlı)'}
            </p>
          </motion.div>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              step >= 1 ? 'bg-therive-accent text-therive-dark' : 'bg-gray-700 text-gray-400'
            }`}>
              1
            </div>
            <div className={`w-12 h-0.5 ${
              step >= 2 ? 'bg-therive-accent' : 'bg-gray-700'
            }`} />
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              step >= 2 ? 'bg-therive-accent text-therive-dark' : 'bg-gray-700 text-gray-400'
            }`}>
              2
            </div>
          </div>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gray-800/50 backdrop-blur border border-gray-700/50 rounded-2xl p-8 shadow-xl"
        >
          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-therive-text mb-2">
                      Ad Soyad
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-therive-text placeholder-gray-400 focus:ring-2 focus:ring-therive-accent focus:border-transparent transition-all"
                        placeholder="Ahmet Yılmaz"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-therive-text mb-2">
                      E-posta Adresi
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-therive-text placeholder-gray-400 focus:ring-2 focus:ring-therive-accent focus:border-transparent transition-all"
                        placeholder="ornek@email.com"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-therive-text mb-2">
                      Şifre
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-therive-text placeholder-gray-400 focus:ring-2 focus:ring-therive-accent focus:border-transparent transition-all"
                        placeholder="En az 8 karakter"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-therive-text transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-therive-text mb-2">
                      Şifre Tekrar
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-therive-text placeholder-gray-400 focus:ring-2 focus:ring-therive-accent focus:border-transparent transition-all"
                        placeholder="Şifrenizi tekrar girin"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-therive-text transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Next Button */}
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="w-full py-3 bg-therive-accent hover:bg-therive-accent-hover text-therive-dark font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    İleri
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Bio */}
                  <div>
                    <label className="block text-sm font-medium text-therive-text mb-2">
                      Kısa Bio (İsteğe Bağlı)
                    </label>
                    <textarea
                      name="bio"
                      rows={4}
                      value={formData.bio}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-therive-text placeholder-gray-400 focus:ring-2 focus:ring-therive-accent focus:border-transparent transition-all resize-none"
                      placeholder="Kendiniz hakkında kısa bir açıklama yazın..."
                    />
                  </div>

                  {/* Intent Tags */}
                  <div>
                    <label className="block text-sm font-medium text-therive-text mb-4">
                      İlgi Alanlarınız (İsteğe Bağlı)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {intentOptions.map((option) => {
                        const Icon = option.icon
                        const isSelected = formData.selectedTags.includes(option.id)
                        
                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => handleTagToggle(option.id)}
                            className={`flex items-center gap-3 p-4 border rounded-xl transition-all text-left ${
                              isSelected
                                ? 'border-therive-accent bg-therive-accent/10 text-therive-accent'
                                : 'border-gray-600 bg-gray-700/30 text-gray-300 hover:border-gray-500'
                            }`}
                          >
                            <Icon className={`w-5 h-5 ${isSelected ? 'text-therive-accent' : 'text-gray-400'}`} />
                            <span className="font-medium">{option.label}</span>
                            {isSelected && <Check className="w-4 h-4 ml-auto text-therive-accent" />}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      onClick={() => setStep(1)}
                      variant="outline"
                      className="flex-1 py-3 border border-gray-600 text-gray-300 hover:bg-gray-700 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      Geri
                    </Button>
                    
                    <Button
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-3 bg-therive-accent hover:bg-therive-accent-hover text-therive-dark font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-therive-dark/30 border-t-therive-dark animate-spin rounded-full" />
                      ) : (
                        <>
                          <UserPlus className="w-5 h-5" />
                          Hesap Oluştur
                        </>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Zaten hesabınız var mı?{' '}
              <Link href="/auth/signin" className="text-therive-accent hover:text-therive-accent-hover font-medium">
                Giriş yapın
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 