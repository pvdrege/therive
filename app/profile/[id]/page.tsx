'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, User, MapPin, Calendar, Briefcase, 
  Edit3, Save, X, Camera, MessageCircle, Star,
  Mail, Phone, Linkedin, Github, Globe, Settings,
  CheckCircle, Shield, Award
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'


interface ProfileData {
  id: string
  name: string
  bio: string
  email: string
  phone?: string
  location: string
  company: string
  position: string
  experience: string
  skills: string[]
  intentTags: string[]
  socialLinks: {
    linkedin?: string
    github?: string
    website?: string
  }
  joinedDate: string
  isPremium: boolean
  isVerified: boolean
  stats: {
    connections: number
    successfulMatches: number
    responseRate: number
  }
}

const mockProfile: ProfileData = {
  id: '1',
  name: 'Ahmet Kaya',
  bio: 'E-ticaret startup\'ı kurucusu. Teknoloji ve inovasyona tutkulu. Yeni fırsatlar arıyorum.',
  email: 'ahmet@example.com',
  phone: '+90 555 123 4567',
  location: 'İstanbul, Türkiye',
  company: 'TechStartup Inc.',
  position: 'Kurucu & CEO',
  experience: '8+ yıl startup deneyimi',
  skills: ['E-ticaret', 'Startup Yönetimi', 'Product Strategy', 'Team Leadership', 'Fundraising'],
  intentTags: ['yatirim-ariyorum', 'mentor-ariyorum', 'partner-ariyorum'],
  socialLinks: {
    linkedin: 'https://linkedin.com/in/ahmetkaya',
    github: 'https://github.com/ahmetkaya',
    website: 'https://ahmetkaya.com'
  },
  joinedDate: '2024-01-15',
  isPremium: true,
  isVerified: true,
  stats: {
    connections: 47,
    successfulMatches: 12,
    responseRate: 89
  }
}

const intentTagsMap = {
  'yatirim-ariyorum': { name: 'Yatırım Arıyorum', color: 'emerald' },
  'is-ariyorum': { name: 'İş Arıyorum', color: 'blue' },
  'co-founder-ariyorum': { name: 'Co-founder Arıyorum', color: 'purple' },
  'mentor-ariyorum': { name: 'Mentor Arıyorum', color: 'amber' },
  'freelance-ariyorum': { name: 'Freelance Arıyorum', color: 'red' },
  'partner-ariyorum': { name: 'Partner Arıyorum', color: 'cyan' },
  'network-ariyorum': { name: 'Network Arıyorum', color: 'lime' },
  'musteri-ariyorum': { name: 'Müşteri Arıyorum', color: 'orange' }
}

export default function ProfilePage({ params }: { params: { id: string } }) {
  const [profile, setProfile] = useState<ProfileData>(mockProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState<ProfileData>(mockProfile)
  const [isOwnProfile, setIsOwnProfile] = useState(true) // In real app, check if params.id matches current user
  const [activeTab, setActiveTab] = useState('overview')
  
  const handleSave = () => {
    setProfile(editForm)
    setIsEditing(false)
    // TODO: Save to API
  }

  const handleCancel = () => {
    setEditForm(profile)
    setIsEditing(false)
  }

  const addSkill = (skill: string) => {
    if (skill.trim() && !editForm.skills.includes(skill.trim())) {
      setEditForm({
        ...editForm,
        skills: [...editForm.skills, skill.trim()]
      })
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setEditForm({
      ...editForm,
      skills: editForm.skills.filter(skill => skill !== skillToRemove)
    })
  }

  return (
    <main className="min-h-screen bg-therive-dark">
      {/* Header */}
      <header className="border-b border-gray-700/50 bg-gray-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <Link 
                href="/discover"
                className="text-therive-accent hover:text-therive-accent-hover"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-lg sm:text-xl font-bold text-therive-text">
                {isOwnProfile ? 'Profilim' : profile.name}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              {isOwnProfile && (
                <Button
                  variant={isEditing ? "outline" : "default"}
                  size="sm"
                  onClick={() => isEditing ? handleCancel() : setIsEditing(true)}
                >
                  {isEditing ? (
                    <>
                      <X className="w-4 h-4 mr-2" />
                      İptal
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-4 h-4 mr-2" />
                      Düzenle
                    </>
                  )}
                </Button>
              )}
              {isEditing && (
                <Button onClick={handleSave} size="sm">
                  <Save className="w-4 h-4 mr-2" />
                  Kaydet
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <motion.div
              layout
              className="bg-gray-800/50 backdrop-blur border border-gray-700/50 rounded-2xl p-6 sticky top-24"
            >
              {/* Avatar */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-therive-accent to-therive-accent-hover rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-12 h-12 sm:w-16 sm:h-16 text-therive-dark" />
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-2 right-2 w-8 h-8 bg-therive-accent rounded-full flex items-center justify-center hover:bg-therive-accent-hover transition-colors">
                      <Camera className="w-4 h-4 text-therive-dark" />
                    </button>
                  )}
                </div>
                
                <div className="flex items-center justify-center gap-2 mb-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-center text-xl sm:text-2xl font-bold text-therive-text max-w-64 min-w-48"
                      placeholder="İsminizi girin"
                    />
                  ) : (
                    <h2 className="text-xl sm:text-2xl font-bold text-therive-text">
                      {profile.name}
                    </h2>
                  )}
                  {profile.isVerified && (
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                  )}
                  {profile.isPremium && (
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  )}
                </div>
                
                <div className="text-gray-400 text-sm space-y-1">
                  <div className="flex items-center justify-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    <span>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.position}
                          onChange={(e) => setEditForm({...editForm, position: e.target.value})}
                          className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs w-32"
                        />
                      ) : (
                        profile.position
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm.location}
                          onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                          className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-xs w-32"
                        />
                      ) : (
                        profile.location
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(profile.joinedDate).toLocaleDateString('tr-TR')} tarihinde katıldı
                    </span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-therive-text mb-3">Hakkımda</h3>
                {isEditing ? (
                  <textarea
                    value={editForm.bio}
                    onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-gray-300 text-sm resize-none"
                    rows={4}
                  />
                ) : (
                  <p className="text-gray-300 text-sm leading-relaxed">{profile.bio}</p>
                )}
              </div>

              {/* Intent Tags */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-therive-text mb-3">Hedefler</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.intentTags.map(tagId => {
                    const tag = intentTagsMap[tagId as keyof typeof intentTagsMap]
                    if (!tag) return null
                    
                    const colorClasses = {
                      emerald: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
                      blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
                      purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
                      amber: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
                      red: 'bg-red-500/20 text-red-400 border-red-500/30',
                      cyan: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
                      lime: 'bg-lime-500/20 text-lime-400 border-lime-500/30',
                      orange: 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                    }
                    
                    return (
                      <span
                        key={tagId}
                        className={`px-3 py-1 text-xs font-medium rounded-full ${colorClasses[tag.color as keyof typeof colorClasses] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'} border`}
                      >
                        {tag.name}
                      </span>
                    )
                  })}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-lg font-bold text-therive-text">{profile.stats.connections}</div>
                  <div className="text-xs text-gray-400">Bağlantı</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-therive-text">{profile.stats.successfulMatches}</div>
                  <div className="text-xs text-gray-400">Eşleşme</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-therive-text">%{profile.stats.responseRate}</div>
                  <div className="text-xs text-gray-400">Yanıt</div>
                </div>
              </div>

              {/* Action Buttons */}
              {!isOwnProfile ? (
                <div className="space-y-3">
                  <Button className="w-full">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Mesaj Gönder
                  </Button>
                  <Button variant="outline" className="w-full">
                    <User className="w-4 h-4 mr-2" />
                    Bağlantı Kur
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link href="/settings">
                    <Button variant="outline" className="w-full">
                      <Settings className="w-4 h-4 mr-2" />
                      Hesap Ayarları
                    </Button>
                  </Link>
                  {!profile.isPremium && (
                    <Button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 hover:from-yellow-500 hover:to-yellow-600">
                      <Star className="w-4 h-4 mr-2" />
                      Premium Ol
                    </Button>
                  )}
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column - Detailed Information */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex space-x-1 mb-6">
              {[
                { id: 'overview', label: 'Genel Bakış' },
                { id: 'experience', label: 'Deneyim' },
                { id: 'contact', label: 'İletişim' },
                ...(isOwnProfile ? [{ id: 'settings', label: 'Ayarlar' }] : [])
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-therive-accent text-therive-dark'
                      : 'text-gray-400 hover:text-therive-text hover:bg-gray-700/30'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {activeTab === 'overview' && (
                  <>
                    {/* Skills */}
                    <div className="bg-gray-800/50 backdrop-blur border border-gray-700/50 rounded-2xl p-6">
                      <h3 className="text-lg font-semibold text-therive-text mb-4">Yetenekler</h3>
                      {isEditing ? (
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-2">
                            {editForm.skills.map(skill => (
                              <span
                                key={skill}
                                className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm flex items-center gap-2"
                              >
                                {skill}
                                <button
                                  onClick={() => removeSkill(skill)}
                                  className="text-red-400 hover:text-red-300"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Yeni yetenek ekle"
                              className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-therive-text text-sm"
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  addSkill(e.currentTarget.value)
                                  e.currentTarget.value = ''
                                }
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {profile.skills.map(skill => (
                            <span
                              key={skill}
                              className="px-3 py-1 bg-therive-accent/10 text-therive-accent rounded-full text-sm border border-therive-accent/20"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Company Info */}
                    <div className="bg-gray-800/50 backdrop-blur border border-gray-700/50 rounded-2xl p-6">
                      <h3 className="text-lg font-semibold text-therive-text mb-4">Şirket Bilgileri</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-400 mb-2 block">Şirket</label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={editForm.company}
                              onChange={(e) => setEditForm({...editForm, company: e.target.value})}
                              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-therive-text"
                            />
                          ) : (
                            <p className="text-therive-text">{profile.company}</p>
                          )}
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-400 mb-2 block">Pozisyon</label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={editForm.position}
                              onChange={(e) => setEditForm({...editForm, position: e.target.value})}
                              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-therive-text"
                            />
                          ) : (
                            <p className="text-therive-text">{profile.position}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'experience' && (
                  <div className="bg-gray-800/50 backdrop-blur border border-gray-700/50 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-therive-text mb-4">Deneyim</h3>
                    {isEditing ? (
                      <textarea
                        value={editForm.experience}
                        onChange={(e) => setEditForm({...editForm, experience: e.target.value})}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-therive-text resize-none"
                        rows={6}
                        placeholder="Deneyimlerinizi detaylı olarak yazın..."
                      />
                    ) : (
                      <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {profile.experience || 'Henüz deneyim bilgisi eklenmemiş.'}
                      </p>
                    )}
                  </div>
                )}

                {activeTab === 'contact' && (
                  <div className="space-y-6">
                    {(isOwnProfile || profile.stats.connections > 0) && (
                      <>
                        {/* Contact Information */}
                        <div className="bg-gray-800/50 backdrop-blur border border-gray-700/50 rounded-2xl p-6">
                          <h3 className="text-lg font-semibold text-therive-text mb-4">İletişim Bilgileri</h3>
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <Mail className="w-5 h-5 text-therive-accent" />
                              <div className="flex-1">
                                {isEditing ? (
                                  <input
                                    type="email"
                                    value={editForm.email}
                                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-therive-text"
                                  />
                                ) : (
                                  <span className="text-therive-text">{profile.email}</span>
                                )}
                              </div>
                            </div>
                            
                            {(profile.phone || isEditing) && (
                              <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-therive-accent" />
                                <div className="flex-1">
                                  {isEditing ? (
                                    <input
                                      type="tel"
                                      value={editForm.phone || ''}
                                      onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-therive-text"
                                      placeholder="Telefon numarası (opsiyonel)"
                                    />
                                  ) : (
                                    <span className="text-therive-text">{profile.phone}</span>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Social Links */}
                        <div className="bg-gray-800/50 backdrop-blur border border-gray-700/50 rounded-2xl p-6">
                          <h3 className="text-lg font-semibold text-therive-text mb-4">Sosyal Medya</h3>
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <Linkedin className="w-5 h-5 text-blue-400" />
                              <div className="flex-1">
                                {isEditing ? (
                                  <input
                                    type="url"
                                    value={editForm.socialLinks.linkedin || ''}
                                    onChange={(e) => setEditForm({
                                      ...editForm,
                                      socialLinks: {...editForm.socialLinks, linkedin: e.target.value}
                                    })}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-therive-text"
                                    placeholder="LinkedIn profil URL'i"
                                  />
                                ) : profile.socialLinks.linkedin ? (
                                  <Link 
                                    href={profile.socialLinks.linkedin}
                                    className="text-blue-400 hover:text-blue-300"
                                    target="_blank"
                                  >
                                    LinkedIn Profilini Görüntüle
                                  </Link>
                                ) : (
                                  <span className="text-gray-400">Belirtilmemiş</span>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <Github className="w-5 h-5 text-gray-400" />
                              <div className="flex-1">
                                {isEditing ? (
                                  <input
                                    type="url"
                                    value={editForm.socialLinks.github || ''}
                                    onChange={(e) => setEditForm({
                                      ...editForm,
                                      socialLinks: {...editForm.socialLinks, github: e.target.value}
                                    })}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-therive-text"
                                    placeholder="GitHub profil URL'i"
                                  />
                                ) : profile.socialLinks.github ? (
                                  <Link 
                                    href={profile.socialLinks.github}
                                    className="text-gray-300 hover:text-therive-accent"
                                    target="_blank"
                                  >
                                    GitHub Profilini Görüntüle
                                  </Link>
                                ) : (
                                  <span className="text-gray-400">Belirtilmemiş</span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <Globe className="w-5 h-5 text-therive-accent" />
                              <div className="flex-1">
                                {isEditing ? (
                                  <input
                                    type="url"
                                    value={editForm.socialLinks.website || ''}
                                    onChange={(e) => setEditForm({
                                      ...editForm,
                                      socialLinks: {...editForm.socialLinks, website: e.target.value}
                                    })}
                                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-therive-text"
                                    placeholder="Kişisel website URL'i"
                                  />
                                ) : profile.socialLinks.website ? (
                                  <Link 
                                    href={profile.socialLinks.website}
                                    className="text-therive-accent hover:text-therive-accent-hover"
                                    target="_blank"
                                  >
                                    Website'i Ziyaret Et
                                  </Link>
                                ) : (
                                  <span className="text-gray-400">Belirtilmemiş</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}

                    {!isOwnProfile && profile.stats.connections === 0 && (
                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 text-center">
                        <Shield className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-therive-text mb-2">İletişim Bilgileri Korumalı</h3>
                        <p className="text-gray-400 mb-4">
                          İletişim bilgilerini görmek için önce bağlantı kurmanız gerekir.
                        </p>
                        <Button>
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Bağlantı Talebi Gönder
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  )
} 