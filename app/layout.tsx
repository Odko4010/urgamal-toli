import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'Монгол Ургамлын Нэрийн Тайлбар Толь',
  description: 'Монгол орны гуурст дээд ургамлын хураангуйлсан нэрийн жагсаалт — 2263 зүйл ургамал',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="mn">
      <body>
        <header className="bg-green-800 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🌿</span>
              <div>
                <h1 className="text-xl font-bold leading-tight">Ургамлын Нэрийн Тайлбар Толь</h1>
                <p className="text-green-300 text-xs">Монгол орны гуурст дээд ургамал</p>
              </div>
            </div>
            <nav className="flex gap-4 text-sm">
              <Link href="/" className="hover:text-green-300 transition-colors">Нүүр</Link>
              <Link href="/toli" className="hover:text-green-300 transition-colors">Толь бичиг</Link>
              <Link href="/stats" className="hover:text-green-300 transition-colors">Статистик</Link>
            </nav>
          </div>
        </header>
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-green-900 text-green-300 text-center py-6 mt-12 text-sm">
          <p>© 2024 Монголын Бэлчээрийн Менежментийн Холбоо | Б.Болормаа, Д.Булгамаа, Л.Отгонтуяа бусад</p>
        </footer>
      </body>
    </html>
  )
}