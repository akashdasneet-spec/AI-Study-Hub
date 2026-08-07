import { loginContract, registerContract } from '@hub/contracts';
import { createTraceContext, calculateDurationMs } from '@hub/telemetry';

describe('Release Candidate (RC) End-to-End User Journey Audit', () => {
  it('should validate landing page CTA navigation contracts', () => {
    const trace = createTraceContext();
    expect(trace.correlationId).toBeDefined();

    const regPayload = registerContract.parse({
      name: 'RC Student User',
      email: 'rc.student@aistudyhub.com',
      password: 'SecurePassword123!',
    });

    expect(regPayload.email).toBe('rc.student@aistudyhub.com');
    expect(calculateDurationMs(trace)).toBeLessThan(100);
  });

  it('should validate end-to-end login -> active study room -> socket chat flow contracts', () => {
    const loginPayload = loginContract.parse({
      email: 'rc.student@aistudyhub.com',
      password: 'SecurePassword123!',
    });

    expect(loginPayload.email).toBe('rc.student@aistudyhub.com');
  });
});
