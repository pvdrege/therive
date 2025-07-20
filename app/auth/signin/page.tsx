'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/lib/store'

export default function SignInPage() {
  const router = useRouter()
  const { setUser, setToken, setLoading, setError, loading, error } = useAppStore()
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Input change:', e.target.name, e.target.value) // DEBUG
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    if (error) setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('🚀 FORM SUBMITTED!', formData) // DEBUG
    setLoading(true)
    setError(null)
    
    try {
      console.log('📡 Sending API request...') // DEBUG
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      console.log('📨 API Response:', response.status, response.ok) // DEBUG
      const data = await response.json()
      console.log('📦 Response data:', data) // DEBUG

      if (!response.ok) {
        throw new Error(data.error || 'Giriş yapılamadı')
      }

      // Set user and token in store
      console.log('✅ Setting user and token in store') // DEBUG
      setUser(data.user)
      setToken(data.token)

      // Wait for state to update before redirect
      console.log('⏳ Waiting for state update...') // DEBUG
      setTimeout(() => {
        console.log('🏠 Redirecting to dashboard') // DEBUG
        router.push('/dashboard')
      }, 100)
    } catch (error: any) {
      console.error('❌ Login error:', error) // DEBUG
      setError(error.message || 'Giriş yapılamadı')
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = formData.email && formData.password
  console.log('Form valid:', isFormValid, 'Loading:', loading) // DEBUG

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
          <h1 className="text-3xl font-bold mb-2">Giriş Yap</h1>
          <p className="text-gray-400">Hesabına erişim sağla</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-600/10 border border-red-600/20 rounded-lg p-4"
              >
                <p className="text-red-400 text-sm">{error}</p>
              </motion.div>
            )}

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
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 pr-12 text-therive-text focus:border-therive-accent focus:outline-none"
                  placeholder="••••••••"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-therive-text"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-600 text-therive-accent focus:ring-therive-accent focus:ring-offset-0 bg-gray-800"
                />
                <span className="ml-2 text-sm text-gray-400">Beni hatırla</span>
              </label>
              <Link 
                href="/auth/forgot-password" 
                className="text-sm text-therive-accent hover:underline"
              >
                Şifremi unuttum
              </Link>
            </div>

            <Button 
              type="submit"
              disabled={!isFormValid || loading}
              loading={loading}
              className="w-full"
            >
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">
              Hesabın yok mu?{' '}
              <Link href="/auth/signup" className="text-therive-accent hover:underline">
                Ücretsiz Hesap Oluştur
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  )
} 