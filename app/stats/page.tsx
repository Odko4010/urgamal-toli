'use client'
import { useEffect, useState } from 'react'

interface Stats {
  total: number
  byBueleg: { aj_ahuin_bueleg: string | null; _count: number }[]
  byNas: { nas: string; _count: number }[]
  byAmjdral: { amjdral_helber: string; _count: number }[]
}

export default function StatsPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = () => {
    setError(null)
    fetch('/api/urgamal/stats')
      .then(r => {
        if (!r.ok) throw new Error(`Серверийн алдаа: ${r.status}`)
        return r.json()
      })
      .then(setStats)
      .catch(err => setError(err instanceof Error ? err.message : 'Өгөгдөл ачаалахад алдаа гарлаа'))
  }

  useEffect(() => { fetchStats() }, [])

  if (error) return (
    <div className="text-center py-20 text-red-400">
      <div className="text-5xl mb-4">⚠️</div>
      <p className="font-medium mb-2">Алдаа гарлаа</p>
      <p className="text-sm text-red-300">{error}</p>
      <button onClick={fetchStats} className="mt-4 btn-primary rounded-xl px-6 py-2 text-sm">
        Дахин оролдох
      </button>
    </div>
  )

  if (!stats) return (
    <div className="text-center py-20 text-gray-400">
      <div className="text-5xl mb-4 animate-pulse">📊</div>
      <p>Ачааллаж байна...</p>
    </div>
  )

  const maxBueleg = Math.max(...stats.byBueleg.map(b => b._count))

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-green-800 mb-2">Статистик Мэдээлэл</h2>
      <p className="text-gray-500 mb-8">Монгол орны гуурст дээд ургамлын ангиллын статистик</p>

      {/* Total */}
      <div className="bg-gradient-to-br from-green-700 to-green-500 text-white rounded-2xl p-8 mb-8 text-center shadow-lg">
        <div className="text-7xl font-bold mb-2">{stats.total.toLocaleString()}</div>
        <div className="text-green-200 text-lg">Нийт зүйл ургамал</div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* By Nas */}
        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6">
          <h3 className="font-bold text-green-800 mb-5 text-lg">Насаар</h3>
          <div className="space-y-4">
            {stats.byNas.map(n => (
              <div key={n.nas}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium">{n.nas}</span>
                  <span className="text-gray-500">{n._count.toLocaleString()}</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400 rounded-full transition-all"
                    style={{ width: `${(n._count / stats.total) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* By Amjdral */}
        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6">
          <h3 className="font-bold text-green-800 mb-5 text-lg">Амьдралын хэлбэрээр</h3>
          <div className="space-y-4">
            {stats.byAmjdral.map(a => (
              <div key={a.amjdral_helber}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium">{a.amjdral_helber}</span>
                  <span className="text-gray-500">{a._count.toLocaleString()}</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full transition-all"
                    style={{ width: `${(a._count / stats.total) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* By Bueleg */}
      <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6">
        <h3 className="font-bold text-green-800 mb-6 text-lg">Аж ахуйн бүлгээр</h3>
        <div className="space-y-3">
          {stats.byBueleg.filter(b => b.aj_ahuin_bueleg).map(b => (
            <div key={b.aj_ahuin_bueleg} className="flex items-center gap-3">
              <span className="text-sm text-gray-600 w-32 shrink-0">{b.aj_ahuin_bueleg}</span>
              <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full flex items-center justify-end pr-2 transition-all"
                  style={{ width: `${(b._count / maxBueleg) * 100}%`, minWidth: '40px' }}>
                  <span className="text-xs font-bold text-amber-800">{b._count}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}