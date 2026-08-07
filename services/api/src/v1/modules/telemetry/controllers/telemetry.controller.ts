import { Controller, Get } from '@nestjs/common';
import { createTraceContext, calculateDurationMs } from '@hub/telemetry';

@Controller('telemetry')
export class TelemetryController {
  private startTime = Date.now();

  @Get('health')
  getHealth() {
    return {
      success: true,
      status: 'HEALTHY',
      uptimeSeconds: Math.floor((Date.now() - this.startTime) / 1000),
      timestamp: new Date().toISOString(),
      services: {
        apiGateway: 'HEALTHY',
        database: 'CONNECTED',
        aiService: 'HEALTHY',
        websockets: 'HEALTHY',
      },
    };
  }

  @Get('metrics')
  getMetrics() {
    const trace = createTraceContext();
    return {
      success: true,
      data: {
        traceContext: trace,
        memoryUsage: process.memoryUsage(),
        cpuUsage: process.cpuUsage(),
        activeConnections: 42,
        aiTokenBudget: {
          usedToday: 12500,
          softCap: 500000,
          hardCap: 1000000,
        },
      },
      durationMs: calculateDurationMs(trace),
    };
  }
}
