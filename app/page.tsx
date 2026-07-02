import Link from 'next/link'

const FEATURES = [
  { tag: 'хайлт', title: 'Хурдан хайлт', desc: 'Монгол нэр, латин нэр, товчлолоор шуурхай хайх боломжтой.' },
  { tag: 'шүүлт', title: 'Ангилал шүүлт', desc: 'Нас, амьдралын хэлбэр, аж ахуйн бүлгээр нарийвчлан шүүнэ.' },
  { tag: 'мэдээлэл', title: 'Бүрэн тодорхойлолт', desc: 'Монгол, латин нэр болон биологийн ангиллын дэлгэрэнгүй.' },
  { tag: 'хэмжээ', title: '2 263 зүйл', desc: 'Монгол орны бүх гуурст дээд ургамлын бүрдсэн жагсаалт.' },
  { tag: 'эрэмбэ', title: 'Цагаан толгойн дараалал', desc: 'Монгол цагаан толгойн үсгийн дарааллаар эрэмбэлэгдсэн.' },
  { tag: 'тоо баримт', title: 'Статистик харагдалт', desc: 'Бүлэг, амьдралын хэлбэр тус бүрийн тоон харьцаа.' },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero — warm botanical */}
      <div className="relative overflow-hidden">
        {/* Decorative leaf accents */}
        <svg className="absolute -top-10 -right-10 w-64 h-64 opacity-[0.08] text-[var(--green-deep)] -z-0" viewBox="0 0 200 200" fill="none">
          <path d="M100 10C140 40 170 80 160 130C150 175 110 195 100 190C90 195 50 175 40 130C30 80 60 40 100 10Z" fill="currentColor"/>
          <path d="M100 20V185" stroke="var(--paper)" strokeWidth="3"/>
        </svg>
        <div className="max-w-6xl mx-auto px-5 pt-16 pb-20 grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-center relative">
          <div>
            <p className="index-number mb-4">🌿 SPECIMEN COLLECTION · 2263 ENTRIES</p>
            <h2 className="font-display text-5xl md:text-6xl font-semibold leading-[1.05] text-[var(--green-deep)] text-balance mb-6">
              Ургамлын Нэрийн<br />
              <span className="italic text-[var(--rust)]">Тайлбар Толь</span>
            </h2>
            <p className="text-[var(--ink)]/75 text-lg leading-relaxed mb-8 max-w-lg">
              Монгол орны гуурст дээд ургамлын хураангуйлсан нэрийн жагсаалт.
              В.И.Грубовын <span className="italic">&ldquo;Монголын гуурст ургамал таних бичиг&rdquo;</span> номд
              суурилсан бүрэн каталог.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/toli" className="btn-primary inline-block">
                Толь нээх →
              </Link>
              <Link href="/stats" className="btn-ghost inline-block text-sm">
                Статистик харах
              </Link>
            </div>
          </div>

          {/* Signature element: specimen label card */}
          <div className="relative mx-auto md:mx-0">
            <div className="specimen-card p-7 w-72">
              <div className="flex items-center justify-between mb-5">
                <span className="text-3xl">🌾</span>
                <span className="index-number">№ 0419</span>
              </div>
              <h3 className="font-display text-xl text-[var(--ink)] mb-1">Крыловын хялгана</h3>
              <p className="italic text-sm text-[var(--sage)] mb-5">Stipa krylovii</p>
              <div className="torn-divider mb-4" />
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-[var(--ink)]/55">Нас</span>
                  <span className="field-tag bg-[var(--sage-pale)] text-[var(--green-deep)]">олон наст</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--ink)]/55">Хэлбэр</span>
                  <span className="field-tag bg-[var(--rust-pale)] text-[var(--rust)]">өвслөг</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-5 py-16">
        <p className="index-number mb-2">🌱 БОЛОМЖУУД</p>
        <h3 className="font-display text-3xl font-semibold text-[var(--green-deep)] mb-10">
          Системийн боломжууд
        </h3>
        <div className="grid md:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <div key={i} className="specimen-card p-6">
              <p className="index-number mb-3 uppercase">{f.tag}</p>
              <h4 className="font-display text-lg font-semibold text-[var(--ink)] mb-2">{f.title}</h4>
              <p className="text-[var(--ink)]/65 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Info: abbreviation principle */}
      <div className="bg-[var(--paper-deep)] py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <p className="index-number mb-2">📖 АРГА ЗҮЙ</p>
          <h3 className="font-display text-2xl font-semibold text-[var(--green-deep)] mb-5">
            Товчлолын зарчим
          </h3>
          <div className="specimen-card p-7">
            <p className="text-[var(--ink)]/75 leading-relaxed mb-5">
              Ургамлын нэрийг хураангуйлахад латин болон монгол нэрийн аль алинд нь ижил зарчим баримтлаж,
              тухайн ургамлын төрөл, зүйлийн нэрийн эхний хоёр үсгийг оролцуулан дөрвөн үсгээр тэмдэглэсэн.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[var(--paper)] rounded-xl p-4 border border-[var(--line)]">
                <p className="font-mono-data text-sm text-[var(--ink)]/80">
                  <span className="italic text-[var(--green)]">Stipa krylovii</span> → STKR
                </p>
                <p className="font-mono-data text-sm text-[var(--ink)]/80 mt-1.5">
                  Крыловын хялгана → КРХЯ
                </p>
              </div>
              <div className="bg-[var(--paper)] rounded-xl p-4 border border-[var(--line)]">
                <p className="font-mono-data text-sm text-[var(--ink)]/80">
                  <span className="italic text-[var(--green)]">Aconitum barbatum</span> → ACBA
                </p>
                <p className="font-mono-data text-sm text-[var(--ink)]/80 mt-1.5">
                  Aconitum baicalense → ACBAI
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
