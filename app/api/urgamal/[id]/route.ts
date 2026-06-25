import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const numId = parseInt(id, 10)
  if (isNaN(numId)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  const urgamal = await prisma.urgamal.findUnique({ where: { id: numId } })
  if (!urgamal) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(urgamal)
}