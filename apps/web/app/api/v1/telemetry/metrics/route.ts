import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      activeConnections: 12,
      aiTokenBudget: {
        usedToday: 12500,
        softCap: 500000,
        hardCap: 1000000,
      },
      memoryUsageMb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
    },
  });
}
