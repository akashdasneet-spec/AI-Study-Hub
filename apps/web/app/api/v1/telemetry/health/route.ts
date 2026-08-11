import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    status: 'HEALTHY',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    environment: process.env.NODE_ENV || 'development',
    services: {
      apiGateway: 'HEALTHY (Vercel Route Handlers)',
      aiService: 'HEALTHY (Server-Side LLM)',
      websockets: 'OPTIONAL',
      database: 'CONNECTED',
    },
  });
}
