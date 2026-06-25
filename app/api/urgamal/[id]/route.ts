import { NextRequest, NextResponse } from 'next/server'
import { pool } from '@/lib/db'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const res = await pool.query('SELECT * FROM "Urgamal" WHERE id = $1', [parseInt(id)])
  if (res.rows.length === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(res.rows[0])
}
