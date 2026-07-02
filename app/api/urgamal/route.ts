import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const q       = searchParams.get('q')       || ''
    const nas     = searchParams.get('nas')     || ''
    const amjdral = searchParams.get('amjdral') || ''
    const bueleg  = searchParams.get('bueleg')  || ''
    const page    = Math.max(1, parseInt(searchParams.get('page')  || '1',  10))
    const limit   = Math.min(100, parseInt(searchParams.get('limit') || '24', 10))
    const skip    = (page - 1) * limit

    const where = {
      ...(q && {
        OR: [
          { mn_name:    { contains: q, mode: 'insensitive' as const } },
          { latin_name: { contains: q, mode: 'insensitive' as const } },
        ],
      }),
      ...(nas     && { nas:             { equals:   nas,     mode: 'insensitive' as const } }),
      ...(amjdral && { amjdral_helber:  { contains: amjdral, mode: 'insensitive' as const } }),
      ...(bueleg  && { aj_ahuin_bueleg: { contains: bueleg,  mode: 'insensitive' as const } }),
    }

    const select = {
      id:              true,
      mn_name:         true,
      latin_name:      true,
      nas:             true,
      amjdral_helber:  true,
      aj_ahuin_bueleg: true,
    }

    const [items, total] = await prisma.$transaction([
      prisma.urgamal.findMany({ where, select, skip, take: limit, orderBy: { mn_name: 'asc' } }),
      prisma.urgamal.count({ where }),
    ])

    return NextResponse.json({ items, total, page, totalPages: Math.ceil(total / limit) })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
