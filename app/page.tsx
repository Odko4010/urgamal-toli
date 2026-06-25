import Link from 'next/link'

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-green-800 to-green-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6">🌿</div>
          <h2 className="text-4xl font-bold mb-4">Монгол Ургамлын Нэрийн Тайлбар Толь</h2>
          <p className="text-green-200 text-lg mb-8 max-w-2xl mx-auto">
            Монгол орны гуурст дээд ургамлын хураангуйлсан нэрийн жагсаалт. 
            В.И.Грубовын "Монголын гуурст ургамал таних бичиг" номд суурилсан 2263 зүйл ургамал.
          </p>
          <Link href="/toli" className="bg-white text-green-800 px-8 py-3 rounded-full font-bold text-lg hover:bg-green-50 transition-colors shadow-lg inline-block">
            Тайлбар Толь Нээх →
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h3 className="text-2xl font-bold text-green-800 text-center mb-10">Системийн боломжууд</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: '🔍', title: 'Хурдан хайлт', desc: 'Монгол нэр, латин нэр, кодоор хайх боломжтой' },
            { icon: '📊', title: 'Ангилал шүүлт', desc: 'Нас, амьдралын хэлбэр, аж ахуйн бүлгээр шүүж харах' },
            { icon: '📋', title: 'Бүрэн мэдээлэл', desc: 'Монгол нэр, латин нэр, товчлол, биологийн ангилал' },
            { icon: '🌱', title: '2263 зүйл', desc: 'Монгол орны бүх гуурст дээд ургамлын нэрийн жагсаалт' },
            { icon: '🗂️', title: 'Цагаан толгойн дараалал', desc: 'Монгол цагаан толгойгоор эрэмбэлэгдсэн' },
            { icon: '📈', title: 'Статистик', desc: 'Ургамлын бүлэг, амьдралын хэлбэрийн статистик мэдээлэл' },
          ].map((f, i) => (
            <div key={i} className="card p-6">
              <div className="text-4xl mb-3">{f.icon}</div>
              <h4 className="font-bold text-green-800 mb-2">{f.title}</h4>
              <p className="text-gray-600 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="bg-green-50 border-t border-green-200 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-green-800 mb-4">Товчлолын зарчим</h3>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-gray-700 mb-3">
              Ургамлын нэрийг хураангуйлахад латин болон монгол нэрийн аль алинд нь ижил зарчим баримтлаж 
              тухайн ургамлын төрөл, зүйлийн нэрийн эхний 2 үсгийг оролцуулан 4 үсгээр тэмдэглэсэн.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-green-50 rounded-lg p-4">
                <p className="font-mono text-sm"><span className="font-bold text-green-700">Stipa Krylovii</span> → STKR</p>
                <p className="font-mono text-sm"><span className="font-bold text-green-700">Крыловын хялгана</span> → КРХЯ</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="font-mono text-sm"><span className="font-bold text-green-700">Aconitum barbatum</span> → ACBA</p>
                <p className="font-mono text-sm"><span className="font-bold text-green-700">Aconitum baicalense</span> → ACBAI</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
