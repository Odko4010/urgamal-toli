import type { Metadata } from 'next'
import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Ургамлын Нэрийн Тайлбар Толь',
  description: 'Монгол орны гуурст дээд ургамлын хураангуйлсан нэрийн жагсаалт — 2263 зүйл ургамал',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="mn" className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <header className="border-b border-[var(--line)] bg-[var(--paper)]/95 backdrop-blur-sm sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <span className="text-2xl leading-none transition-transform group-hover:-rotate-6">🌿</span>
              <div>
                <h1 className="font-display text-lg font-semibold leading-tight text-[var(--green-deep)] tracking-tight">
                  Ургамлын Тайлбар Толь
                </h1>
                <p className="text-[11px] text-[var(--sage)] tracking-wide uppercase">
                  Монгол орны гуурст дээд ургамал
                </p>
              </div>
            </Link>
            <nav className="flex gap-6 text-sm font-medium text-[var(--green-deep)]">
              <Link href="/" className="hover:text-[var(--rust)] transition-colors">Нүүр</Link>
              <Link href="/toli" className="hover:text-[var(--rust)] transition-colors">Толь бичиг</Link>
              <Link href="/stats" className="hover:text-[var(--rust)] transition-colors">Статистик</Link>
            </nav>
          </div>
        </header>
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="border-t border-[var(--line)] bg-[var(--paper-deep)] mt-16">
          <div className="max-w-6xl mx-auto px-5 py-8 text-center">
            <div className="torn-divider max-w-xs mx-auto mb-6" />
            <p className="text-xs text-[var(--sage)] tracking-wide">
              © 2024 Монголын Бэлчээрийн Менежментийн Холбоо · Б.Болормаа, Д.Булгамаа, Л.Отгонтуяа бусад
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
