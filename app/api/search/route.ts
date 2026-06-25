import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get('q') ?? ''
    if (!query.trim()) return NextResponse.json([])
    const results = await prisma.urgamal.findMany({
      where: {
        OR: [
          { mn_name:    { contains: query, mode: 'insensitive' } },
          { latin_name: { contains: query, mode: 'insensitive' } },
          { mn_code:    { contains: query, mode: 'insensitive' } },
          { lat_code:   { contains: query, mode: 'insensitive' } },
        ],
      },
      take: 20,
      orderBy: { mn_name: 'asc' },
    })
    return NextResponse.json(results)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
