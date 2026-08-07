import { logInfo, logError, logWarn } from '@hub/logger';
import { createTraceContext, calculateDurationMs, formatTraceHeaders } from '@hub/telemetry';

describe('Phase 6 Observability & Telemetry Trace Context', () => {
  it('should generate trace context with correlation ID and start timestamp', () => {
    const trace = createTraceContext();
    expect(trace.correlationId).toBeDefined();
    expect(typeof trace.correlationId).toBe('string');
    expect(trace.startTime).toBeLessThanOrEqual(Date.now());
  });

  it('should format HTTP trace headers correctly', () => {
    const trace = createTraceContext('custom_corr_123');
    const headers = formatTraceHeaders(trace);
    expect(headers['x-correlation-id']).toBe('custom_corr_123');
    expect(headers['x-request-timestamp']).toBe(trace.startTime.toString());
  });

  it('should log structured JSON without throwing', () => {
    const spyInfo = vi.spyOn(console, 'log').mockImplementation(() => {});
    logInfo('Test telemetry event', { correlationId: 'corr_test_99' });
    expect(spyInfo).toHaveBeenCalled();
    spyInfo.mockRestore();
  });
});
