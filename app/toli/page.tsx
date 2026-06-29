'use client'
import { useState, useEffect, useCallback, useRef } from 'react'

interface Urgamal {
  id: number
  mn_code: string
  mn_name: string
  lat_code: string
  latin_name: string | null
  nas: string
  amjdral_helber: string
  aj_ahuin_bueleg: string | null
}

interface ApiResponse {
  items: Urgamal[]
  total: number
  page: number
  totalPages: number
}

const NAS_COLORS: Record<string, string> = {
  'олон наст': 'bg-[var(--sage-pale)] text-[var(--green-deep)]',
  'нэг наст': 'bg-[var(--rust-pale)] text-[var(--rust)]',
  'хоёр наст': 'bg-[#E7E0EF] text-[#6B4A8A]',
}

const AMJDRAL_COLORS: Record<string, string> = {
  'өвслөг': 'bg-[var(--sage-pale)] text-[var(--green-deep)]',
  'модлог': 'bg-[#F0E2C4] text-[#7A5A22]',
  'сөөглөг': 'bg-[#D7E8E2] text-[#21655A]',
  'сөөг': 'bg-[#D7E8E2] text-[#21655A]',
}

export default function ToliPage() {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [q, setQ] = useState('')
  const [bueleg, setBueleg] = useState('')
  const [nas, setNas] = useState('')
  const [amjdral, setAmjdral] = useState('')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<Urgamal | null>(null)
  const [inputVal, setInputVal] = useState('')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (q) params.set('q', q)
      if (bueleg) params.set('bueleg', bueleg)
      if (nas) params.set('nas', nas)
      if (amjdral) params.set('amjdral', amjdral)
      params.set('page', String(page))
      params.set('limit', '24')
      const res = await fetch(`/api/urgamal?${params}`)
      if (!res.ok) throw new Error(`Серверийн алдаа: ${res.status}`)
      const json = await res.json()
      setData(json)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Өгөгдөл ачаалахад алдаа гарлаа')
    } finally {
      setLoading(false)
    }
  }, [q, bueleg, nas, amjdral, page])

  useEffect(() => { fetchData() }, [fetchData])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelected(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setInputVal(val)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      setQ(val)
      setPage(1)
    }, 400)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (debounceRef.current) clearTimeout(debounceRef.current)
    setQ(inputVal)
    setPage(1)
  }

  const clearFilters = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    setQ(''); setInputVal(''); setBueleg(''); setNas(''); setAmjdral(''); setPage(1)
  }

  return (
    <div className="max-w-6xl mx-auto px-5 py-12">
      <p className="index-number mb-2">ТОЛЬ БИЧИГ</p>
      <h2 className="font-display text-4xl font-semibold text-[var(--green-deep)] mb-2">Ургамлын Тайлбар Толь</h2>
      <p className="text-[var(--ink)]/60 mb-8">Монгол орны гуурст дээд ургамлын нэрийн жагсаалт</p>

      <div className="specimen-card p-6 mb-8">
        <form onSubmit={handleSearch} className="flex gap-3 mb-4">
          <input
            type="text"
            value={inputVal}
            onChange={handleInputChange}
            placeholder="Монгол нэр эсвэл латин нэрээр хайх..."
            className="input-field flex-1 px-4 py-2.5 text-sm"
          />
          <button type="submit" className="btn-primary px-6 text-sm">Хайх</button>
          <button type="button" onClick={clearFilters} className="btn-ghost text-sm">Цэвэрлэх</button>
        </form>
        <div className="flex flex-wrap gap-3 items-center">
          <select value={nas} onChange={e => { setNas(e.target.value); setPage(1) }}
            className="input-field px-3 py-2 text-sm">
            <option value="">Бүх нас</option>
            <option value="олон наст">Олон наст</option>
            <option value="нэг наст">Нэг наст</option>
            <option value="хоёр наст">Хоёр наст</option>
          </select>
          <select value={amjdral} onChange={e => { setAmjdral(e.target.value); setPage(1) }}
            className="input-field px-3 py-2 text-sm">
            <option value="">Бүх амьдралын хэлбэр</option>
            <option value="өвслөг">Өвслөг</option>
            <option value="модлог">Модлог</option>
            <option value="сөөглөг">Сөөглөг</option>
          </select>
          <select value={bueleg} onChange={e => { setBueleg(e.target.value); setPage(1) }}
            className="input-field px-3 py-2 text-sm">
            <option value="">Бүх аж ахуйн бүлэг</option>
            <option value="алаг өвс">Алаг өвс</option>
            <option value="үетэн">Үетэн</option>
            <option value="хадлан">Хадлан</option>
            <option value="хогийн ургамал">Хогийн ургамал</option>
          </select>
          {data && (
            <span className="ml-auto index-number">
              НИЙТ {data.total.toLocaleString()} ЗҮЙЛ
            </span>
          )}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-24 text-[var(--sage)]">
          <div className="text-5xl mb-4 animate-pulse">🌿</div>
          <p>Уншиж байна...</p>
        </div>
      ) : error ? (
        <div className="text-center py-24 text-[var(--rust)]">
          <div className="text-5xl mb-4">⚠️</div>
          <p className="font-medium mb-2">Алдаа гарлаа</p>
          <p className="text-sm opacity-70">{error}</p>
          <button onClick={fetchData} className="btn-primary mt-5 px-6 py-2 text-sm">
            Дахин оролдох
          </button>
        </div>
      ) : data?.items.length === 0 ? (
        <div className="text-center py-24 text-[var(--sage)]">
          <div className="text-5xl mb-4">🔍</div>
          <p>Хайлтын үр дүн олдсонгүй</p>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {data?.items.map(item => (
              <div key={item.id} className="specimen-card p-5 cursor-pointer"
                onClick={() => setSelected(item)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setSelected(item)}
                aria-label={item.mn_name}>
                <div className="flex items-start justify-between mb-3 pl-2">
                  <span className="index-number">№ {String(item.id).padStart(4, '0')}</span>
                </div>
                <h3 className="font-display font-semibold text-[var(--ink)] text-lg mb-1 pl-2">{item.mn_name}</h3>
                {item.latin_name && (
                  <p className="text-sm text-[var(--sage)] italic mb-4 pl-2 truncate">{item.latin_name}</p>
                )}
                <div className="flex flex-wrap gap-1.5 pl-2">
                  <span className={`field-tag ${NAS_COLORS[item.nas] || 'bg-[var(--paper-deep)] text-[var(--ink)]/60'}`}>{item.nas}</span>
                  <span className={`field-tag ${AMJDRAL_COLORS[item.amjdral_helber] || 'bg-[var(--paper-deep)] text-[var(--ink)]/60'}`}>{item.amjdral_helber}</span>
                  {item.aj_ahuin_bueleg && (
                    <span className="field-tag bg-[#F0E2C4] text-[#7A5A22]">{item.aj_ahuin_bueleg}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {data && data.totalPages > 1 && (
            <div className="flex justify-center items-center gap-2">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
                className="btn-ghost px-4 py-2 text-sm disabled:opacity-40">← Өмнөх</button>
              {Array.from({ length: Math.min(7, data.totalPages) }, (_, i) => {
                let p: number
                if (data.totalPages <= 7) p = i + 1
                else if (page <= 4) p = i + 1
                else if (page >= data.totalPages - 3) p = data.totalPages - 6 + i
                else p = page - 3 + i
                return (
                  <button key={p} onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded-sm text-sm font-medium transition-colors ${p === page ? 'bg-[var(--green-deep)] text-[var(--paper)]' : 'btn-ghost'}`}>
                    {p}
                  </button>
                )
              })}
              <button disabled={page === data.totalPages} onClick={() => setPage(p => p + 1)}
                className="btn-ghost px-4 py-2 text-sm disabled:opacity-40">Дараах →</button>
            </div>
          )}
        </>
      )}

      {selected && (
        <div className="fixed inset-0 bg-[var(--ink)]/60 flex items-center justify-center z-50 p-4"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selected.mn_name}>
          <div className="bg-[#FFFDF7] rounded-sm shadow-2xl max-w-md w-full p-7 border border-[var(--line)]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-5">
              <span className="index-number">СПЕЦИМЕН № {String(selected.id).padStart(4, '0')}</span>
              <button onClick={() => setSelected(null)} className="text-[var(--sage)] hover:text-[var(--ink)] text-xl leading-none" aria-label="Хаах">✕</button>
            </div>
            <h2 className="font-display text-2xl font-semibold text-[var(--ink)] mb-1">{selected.mn_name}</h2>
            {selected.latin_name && (
              <p className="text-[var(--sage)] italic mb-6">{selected.latin_name}</p>
            )}
            <div className="torn-divider mb-5" />
            <div className="space-y-3">
              <div className="flex justify-between py-1">
                <span className="text-[var(--ink)]/55 text-sm">Нас</span>
                <span className={`field-tag ${NAS_COLORS[selected.nas] || ''}`}>{selected.nas}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[var(--ink)]/55 text-sm">Амьдралын хэлбэр</span>
                <span className={`field-tag ${AMJDRAL_COLORS[selected.amjdral_helber] || ''}`}>{selected.amjdral_helber}</span>
              </div>
              {selected.aj_ahuin_bueleg && (
                <div className="flex justify-between py-1">
                  <span className="text-[var(--ink)]/55 text-sm">Аж ахуйн бүлэг</span>
                  <span className="field-tag bg-[#F0E2C4] text-[#7A5A22]">{selected.aj_ahuin_bueleg}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
