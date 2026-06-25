import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const [total, byBueleg, byNas, byAmjdral] = await Promise.all([
      prisma.urgamal.count(),
      prisma.urgamal.groupBy({ by: ['aj_ahuin_bueleg'], _count: { _all: true }, orderBy: { _count: { aj_ahuin_bueleg: 'desc' } } }),
      prisma.urgamal.groupBy({ by: ['nas'], _count: { _all: true }, orderBy: { _count: { nas: 'desc' } } }),
      prisma.urgamal.groupBy({ by: ['amjdral_helber'], _count: { _all: true }, orderBy: { _count: { amjdral_helber: 'desc' } } }),
    ])
    return NextResponse.json({
      total,
      byBueleg: byBueleg.map(r => ({ aj_ahuin_bueleg: r.aj_ahuin_bueleg, _count: r._count._all })),
      byNas:    byNas.map(r    => ({ nas: r.nas,                          _count: r._count._all })),
      byAmjdral: byAmjdral.map(r => ({ amjdral_helber: r.amjdral_helber, _count: r._count._all })),
    })
  } catch (error) {
    console.error('Stats API error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}