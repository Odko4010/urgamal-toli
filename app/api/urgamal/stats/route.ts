import { NextResponse } from 'next/server'
import { pool } from '@/lib/db'

export async function GET() {
  const [total, byBueleg, byNas, byAmjdral] = await Promise.all([
    pool.query('SELECT COUNT(*) FROM "Urgamal"'),
    pool.query('SELECT aj_ahuin_bueleg, COUNT(*) as count FROM "Urgamal" GROUP BY aj_ahuin_bueleg ORDER BY count DESC'),
    pool.query('SELECT nas, COUNT(*) as count FROM "Urgamal" GROUP BY nas ORDER BY count DESC'),
    pool.query('SELECT amjdral_helber, COUNT(*) as count FROM "Urgamal" GROUP BY amjdral_helber ORDER BY count DESC'),
  ])

  return NextResponse.json({
    total: parseInt(total.rows[0].count),
    byBueleg: byBueleg.rows.map(r => ({ aj_ahuin_bueleg: r.aj_ahuin_bueleg, _count: parseInt(r.count) })),
    byNas: byNas.rows.map(r => ({ nas: r.nas, _count: parseInt(r.count) })),
    byAmjdral: byAmjdral.rows.map(r => ({ amjdral_helber: r.amjdral_helber, _count: parseInt(r.count) })),
  })
}
