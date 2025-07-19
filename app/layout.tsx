import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Therive.io - Drive\'ını Fırsatlara Dönüştür',
  description: 'Profesyonel networking platformu. Hedef odaklı bağlantılar kurarak kariyerinde başarıya ulaş.',
  keywords: ['networking', 'kariyer', 'profesyonel', 'bağlantı', 'iş', 'startup'],
  authors: [{ name: 'Therive Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Therive.io - Drive\'ını Fırsatlara Dönüştür',
    description: 'Profesyonel networking platformu. Hedef odaklı bağlantılar kurarak kariyerinde başarıya ulaş.',
    url: 'https://therive.io',
    siteName: 'Therive.io',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Therive.io - Drive\'ını Fırsatlara Dönüştür',
    description: 'Profesyonel networking platformu. Hedef odaklı bağlantılar kurarak kariyerinde başarıya ulaş.',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className="dark">
      <body className={`${inter.variable} font-sans antialiased min-h-screen bg-therive-dark text-therive-text`}>
        <div id="root" className="min-h-screen flex flex-col">
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
} 