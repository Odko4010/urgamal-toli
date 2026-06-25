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
  'олон наст': 'bg-blue-100 text-blue-700',
  'нэг наст': 'bg-orange-100 text-orange-700',
  'хоёр наст': 'bg-purple-100 text-purple-700',
}

const AMJDRAL_COLORS: Record<string, string> = {
  'өвслөг': 'bg-green-100 text-green-700',
  'модлог': 'bg-amber-100 text-amber-800',
  'сөөглөг': 'bg-teal-100 text-teal-700',
  'сөөг': 'bg-teal-100 text-teal-700',
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

  // Escape key closes modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelected(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setInputVal(val)
    // Debounce: 400ms-ийн дараа автоматаар хайна
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-green-800 mb-2">Ургамлын Тайлбар Толь</h2>
      <p className="text-gray-500 mb-6">Монгол орны гуурст дээд ургамлын нэрийн жагсаалт</p>

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-5 mb-6">
        <form onSubmit={handleSearch} className="flex gap-3 mb-4">
          <input
            type="text"
            value={inputVal}
            onChange={handleInputChange}
            placeholder="Монгол нэр, латин нэр эсвэл код хайх..."
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
          />
          <button type="submit" className="btn-primary rounded-xl px-6">🔍 Хайх</button>
          <button type="button" onClick={clearFilters} className="border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-xl text-sm text-gray-600 transition-colors">Цэвэрлэх</button>
        </form>
        <div className="flex flex-wrap gap-3">
          <select value={nas} onChange={e => { setNas(e.target.value); setPage(1) }}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300">
            <option value="">Бүх нас</option>
            <option value="олон наст">Олон наст</option>
            <option value="нэг наст">Нэг наст</option>
            <option value="хоёр наст">Хоёр наст</option>
          </select>
          <select value={amjdral} onChange={e => { setAmjdral(e.target.value); setPage(1) }}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300">
            <option value="">Бүх амьдралын хэлбэр</option>
            <option value="өвслөг">Өвслөг</option>
            <option value="модлог">Модлог</option>
            <option value="сөөглөг">Сөөглөг</option>
          </select>
          <select value={bueleg} onChange={e => { setBueleg(e.target.value); setPage(1) }}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300">
            <option value="">Бүх аж ахуйн бүлэг</option>
            <option value="алаг өвс">Алаг өвс</option>
            <option value="үетэн">Үетэн</option>
            <option value="хадлан">Хадлан</option>
            <option value="хогийн ургамал">Хогийн ургамал</option>
          </select>
          {data && (
            <span className="ml-auto text-sm text-gray-500 flex items-center">
              Нийт <strong className="text-green-700 mx-1">{data.total.toLocaleString()}</strong> ургамал
            </span>
          )}
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="text-center py-20 text-gray-400">
          <div className="text-5xl mb-4 animate-pulse">🌿</div>
          <p>Уншиж байна...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20 text-red-400">
          <div className="text-5xl mb-4">⚠️</div>
          <p className="font-medium mb-2">Алдаа гарлаа</p>
          <p className="text-sm text-red-300">{error}</p>
          <button onClick={fetchData} className="mt-4 btn-primary rounded-xl px-6 py-2 text-sm">
            Дахин оролдох
          </button>
        </div>
      ) : data?.items.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <div className="text-5xl mb-4">🔍</div>
          <p>Хайлтын үр дүн олдсонгүй</p>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {data?.items.map(item => (
              <div key={item.id} className="card p-4 cursor-pointer hover:border-green-300"
                onClick={() => setSelected(item)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setSelected(item)}
                aria-label={item.mn_name}>
                <div className="flex items-start justify-between mb-2">
                  <span className="font-mono text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded">{item.mn_code}</span>
                  <span className="font-mono text-xs bg-gray-50 text-gray-500 border border-gray-200 px-2 py-0.5 rounded">{item.lat_code}</span>
                </div>
                <h3 className="font-bold text-gray-800 text-base mb-1">{item.mn_name}</h3>
                {item.latin_name && (
                  <p className="text-xs text-gray-500 italic mb-3 truncate">{item.latin_name}</p>
                )}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  <span className={`badge ${NAS_COLORS[item.nas] || 'bg-gray-100 text-gray-600'}`}>{item.nas}</span>
                  <span className={`badge ${AMJDRAL_COLORS[item.amjdral_helber] || 'bg-gray-100 text-gray-600'}`}>{item.amjdral_helber}</span>
                  {item.aj_ahuin_bueleg && (
                    <span className="badge bg-yellow-50 text-yellow-700">{item.aj_ahuin_bueleg}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {data && data.totalPages > 1 && (
            <div className="flex justify-center items-center gap-2">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
                className="px-4 py-2 rounded-lg border border-gray-200 text-sm disabled:opacity-40 hover:bg-gray-50 transition-colors">← Өмнөх</button>
              {Array.from({ length: Math.min(7, data.totalPages) }, (_, i) => {
                let p: number
                if (data.totalPages <= 7) p = i + 1
                else if (page <= 4) p = i + 1
                else if (page >= data.totalPages - 3) p = data.totalPages - 6 + i
                else p = page - 3 + i
                return (
                  <button key={p} onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${p === page ? 'bg-green-700 text-white' : 'border border-gray-200 hover:bg-gray-50'}`}>
                    {p}
                  </button>
                )
              })}
              <button disabled={page === data.totalPages} onClick={() => setPage(p => p + 1)}
                className="px-4 py-2 rounded-lg border border-gray-200 text-sm disabled:opacity-40 hover:bg-gray-50 transition-colors">Дараах →</button>
            </div>
          )}
        </>
      )}

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selected.mn_name}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-2">
                <span className="font-mono text-sm bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full">{selected.mn_code}</span>
                <span className="font-mono text-sm bg-gray-50 text-gray-500 border border-gray-200 px-3 py-1 rounded-full">{selected.lat_code}</span>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-xl" aria-label="Хаах">✕</button>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{selected.mn_name}</h2>
            {selected.latin_name && (
              <p className="text-gray-500 italic mb-5 text-sm">{selected.latin_name}</p>
            )}
            <div className="space-y-3">
              <div className="flex justify-between py-2.5 border-b border-gray-100">
                <span className="text-gray-500 text-sm">Монгол код</span>
                <span className="font-mono font-bold text-green-700">{selected.mn_code}</span>
              </div>
              <div className="flex justify-between py-2.5 border-b border-gray-100">
                <span className="text-gray-500 text-sm">Латин код</span>
                <span className="font-mono font-bold text-gray-700">{selected.lat_code}</span>
              </div>
              <div className="flex justify-between py-2.5 border-b border-gray-100">
                <span className="text-gray-500 text-sm">Нас</span>
                <span className={`badge ${NAS_COLORS[selected.nas] || ''}`}>{selected.nas}</span>
              </div>
              <div className="flex justify-between py-2.5 border-b border-gray-100">
                <span className="text-gray-500 text-sm">Амьдралын хэлбэр</span>
                <span className={`badge ${AMJDRAL_COLORS[selected.amjdral_helber] || ''}`}>{selected.amjdral_helber}</span>
              </div>
              {selected.aj_ahuin_bueleg && (
                <div className="flex justify-between py-2.5">
                  <span className="text-gray-500 text-sm">Аж ахуйн бүлэг</span>
                  <span className="badge bg-yellow-50 text-yellow-700">{selected.aj_ahuin_bueleg}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}