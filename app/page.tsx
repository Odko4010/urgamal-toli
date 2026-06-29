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
      {/* Hero — herbarium specimen sheet */}
      <div className="relative overflow-hidden border-b border-[var(--line)]">
        <div className="max-w-6xl mx-auto px-5 pt-20 pb-24 grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div>
            <p className="index-number mb-5">SPECIMEN COLLECTION · 2263 ENTRIES</p>
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
            <div className="specimen-card p-7 w-72 rotate-1">
              <div className="flex items-center justify-between mb-5 pl-3">
                <span className="text-2xl">🌾</span>
                <span className="index-number">№ 0419</span>
              </div>
              <h3 className="font-display text-xl text-[var(--ink)] mb-1 pl-3">Крыловын хялгана</h3>
              <p className="italic text-sm text-[var(--sage)] mb-5 pl-3">Stipa krylovii</p>
              <div className="torn-divider mb-4" />
              <div className="space-y-2.5 pl-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--ink)]/55">Нас</span>
                  <span className="field-tag bg-[var(--sage-pale)] text-[var(--green-deep)]">олон наст</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--ink)]/55">Хэлбэр</span>
                  <span className="field-tag bg-[var(--rust-pale)] text-[var(--rust)]">өвслөг</span>
                </div>
              </div>
            </div>
            <div className="specimen-card p-7 w-72 absolute -bottom-10 -left-8 -rotate-3 -z-10 opacity-60 hidden md:block">
              <div className="h-4 w-24 bg-[var(--sage-pale)] rounded-sm mb-4" />
              <div className="h-3 w-32 bg-[var(--paper-deep)] rounded-sm mb-6" />
              <div className="h-2 w-full bg-[var(--paper-deep)] rounded-sm mb-2" />
              <div className="h-2 w-2/3 bg-[var(--paper-deep)] rounded-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-5 py-20">
        <p className="index-number mb-2">БОЛОМЖУУД</p>
        <h3 className="font-display text-3xl font-semibold text-[var(--green-deep)] mb-12">
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
      <div className="bg-[var(--paper-deep)] border-t border-[var(--line)] py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <p className="index-number mb-2">АРГА ЗҮЙ</p>
          <h3 className="font-display text-2xl font-semibold text-[var(--green-deep)] mb-5">
            Товчлолын зарчим
          </h3>
          <div className="specimen-card p-7">
            <p className="text-[var(--ink)]/75 leading-relaxed mb-5">
              Ургамлын нэрийг хураангуйлахад латин болон монгол нэрийн аль алинд нь ижил зарчим баримтлаж,
              тухайн ургамлын төрөл, зүйлийн нэрийн эхний хоёр үсгийг оролцуулан дөрвөн үсгээр тэмдэглэсэн.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-[var(--paper)] rounded-sm p-4 border border-[var(--line)]">
                <p className="font-mono-data text-sm text-[var(--ink)]/80">
                  <span className="italic text-[var(--green)]">Stipa krylovii</span> → STKR
                </p>
                <p className="font-mono-data text-sm text-[var(--ink)]/80 mt-1.5">
                  Крыловын хялгана → КРХЯ
                </p>
              </div>
              <div className="bg-[var(--paper)] rounded-sm p-4 border border-[var(--line)]">
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
