'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, ArrowLeft, Mail, Lock, LogIn } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useAppStore } from '@/lib/store'
import { Button } from '@/components/ui/button'

export default function SignInPage() {
  const router = useRouter()
  const { setAuth } = useAppStore()
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Input change:', e.target.name, e.target.value) // DEBUG
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    // Clear error when user starts typing
    if (error) {
      setError(null)
    }
  }

  const validateForm = () => {
    const { email, password } = formData
    
    if (!email || !password) {
      setError('Tüm alanları doldurmanız gerekiyor')
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Geçerli bir e-posta adresi girin')
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log('Form valid: ', validateForm(), 'Loading:', loading) // DEBUG
    
    if (!validateForm()) return
    
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/auth/signin', {
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
        
        // Delay redirect slightly to ensure state is updated
        setTimeout(() => {
          router.push('/dashboard')
        }, 100)
      } else {
        setError(data.error || 'Giriş yapılırken bir hata oluştu')
      }
    } catch (err) {
      console.error('Signin error:', err)
      setError('Sunucu ile bağlantı kurulamadı')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-therive-dark via-gray-900 to-therive-dark flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
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
              Hesabınıza Giriş Yapın
            </h1>
            <p className="text-gray-400">
              Therive topluluğuna tekrar hoş geldiniz
            </p>
          </motion.div>
        </div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gray-800/50 backdrop-blur border border-gray-700/50 rounded-2xl p-8 shadow-xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-therive-text mb-2">
                E-posta Adresi
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
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

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-therive-text mb-2">
                Şifre
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-therive-text placeholder-gray-400 focus:ring-2 focus:ring-therive-accent focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-therive-text transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-therive-accent hover:bg-therive-accent-hover text-therive-dark font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-therive-dark/30 border-t-therive-dark animate-spin rounded-full" />
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Giriş Yap
                </>
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Hesabınız yok mu?{' '}
              <Link href="/auth/signup" className="text-therive-accent hover:text-therive-accent-hover font-medium">
                Üye olun
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 