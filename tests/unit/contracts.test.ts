import { loginContract, registerContract } from '@hub/contracts';

describe('Contracts Zod Schema Validation', () => {
  it('should validate valid login payload', () => {
    const valid = { email: 'student@studyhub.com', password: 'password123' };
    expect(() => loginContract.parse(valid)).not.toThrow();
  });

  it('should reject invalid email format in register payload', () => {
    const invalid = { name: 'Alex', email: 'invalid-email', password: 'password123' };
    expect(() => registerContract.parse(invalid)).toThrow();
  });
});
