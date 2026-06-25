import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q") ?? "";

  const results = await prisma.urgamal.findMany({
    where: {
      mn_name: {
        contains: query,
        mode: "insensitive",
      },
    },
    take: 20,
  });

  return NextResponse.json(results);
}
