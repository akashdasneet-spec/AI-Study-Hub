import { generateCorrelationId } from '@hub/utils';

export interface TraceContext {
  correlationId: string;
  startTime: number;
}

export function createTraceContext(existingCorrelationId?: string): TraceContext {
  return {
    correlationId: existingCorrelationId || generateCorrelationId(),
    startTime: Date.now(),
  };
}

export function calculateDurationMs(context: TraceContext): number {
  return Date.now() - context.startTime;
}

export function formatTraceHeaders(context: TraceContext): Record<string, string> {
  return {
    'x-correlation-id': context.correlationId,
    'x-request-timestamp': context.startTime.toString(),
  };
}

