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
    <div className="text-center py-24 text-[var(--rust)]">
      <div className="text-5xl mb-4">⚠️</div>
      <p className="font-medium mb-2">Алдаа гарлаа</p>
      <p className="text-sm opacity-70">{error}</p>
      <button onClick={fetchStats} className="btn-primary mt-5 px-6 py-2 text-sm">
        Дахин оролдох
      </button>
    </div>
  )

  if (!stats) return (
    <div className="text-center py-24 text-[var(--sage)]">
      <div className="text-5xl mb-4 animate-pulse">📊</div>
      <p>Ачааллаж байна...</p>
    </div>
  )

  const maxBueleg = Math.max(...stats.byBueleg.map(b => b._count))

  return (
    <div className="max-w-5xl mx-auto px-5 py-12">
      <p className="index-number mb-2">СТАТИСТИК</p>
      <h2 className="font-display text-4xl font-semibold text-[var(--green-deep)] mb-2">Статистик Мэдээлэл</h2>
      <p className="text-[var(--ink)]/60 mb-10">Монгол орны гуурст дээд ургамлын ангиллын статистик</p>

      <div className="specimen-card p-10 mb-10 text-center relative overflow-hidden">
        <p className="index-number mb-4">НИЙТ БҮРТГЭГДСЭН</p>
        <div className="font-display text-7xl font-semibold text-[var(--green-deep)] mb-2">{stats.total.toLocaleString()}</div>
        <div className="text-[var(--sage)] text-lg italic">зүйл ургамал</div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="specimen-card p-6">
          <p className="index-number mb-1">АНГИЛАЛ</p>
          <h3 className="font-display font-semibold text-[var(--ink)] mb-5 text-lg">Насаар</h3>
          <div className="space-y-4">
            {stats.byNas.map(n => (
              <div key={n.nas}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium text-[var(--ink)]/80">{n.nas}</span>
                  <span className="font-mono-data text-[var(--sage)]">{n._count.toLocaleString()}</span>
                </div>
                <div className="h-2.5 bg-[var(--paper-deep)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--green)] rounded-full transition-all"
                    style={{ width: `${(n._count / stats.total) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="specimen-card p-6">
          <p className="index-number mb-1">АНГИЛАЛ</p>
          <h3 className="font-display font-semibold text-[var(--ink)] mb-5 text-lg">Амьдралын хэлбэрээр</h3>
          <div className="space-y-4">
            {stats.byAmjdral.map(a => (
              <div key={a.amjdral_helber}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium text-[var(--ink)]/80">{a.amjdral_helber}</span>
                  <span className="font-mono-data text-[var(--sage)]">{a._count.toLocaleString()}</span>
                </div>
                <div className="h-2.5 bg-[var(--paper-deep)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--rust)] rounded-full transition-all"
                    style={{ width: `${(a._count / stats.total) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="specimen-card p-6">
        <p className="index-number mb-1">АНГИЛАЛ</p>
        <h3 className="font-display font-semibold text-[var(--ink)] mb-6 text-lg">Аж ахуйн бүлгээр</h3>
        <div className="space-y-3">
          {stats.byBueleg.filter(b => b.aj_ahuin_bueleg).map(b => (
            <div key={b.aj_ahuin_bueleg} className="flex items-center gap-3">
              <span className="text-sm text-[var(--ink)]/70 w-32 shrink-0">{b.aj_ahuin_bueleg}</span>
              <div className="flex-1 h-6 bg-[var(--paper-deep)] rounded-full overflow-hidden">
                <div className="h-full bg-[#C99B5E] rounded-full flex items-center justify-end pr-2 transition-all"
                  style={{ width: `${(b._count / maxBueleg) * 100}%`, minWidth: '40px' }}>
                  <span className="font-mono-data text-xs font-bold text-[#5A3F18]">{b._count}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
