import { registerContract, roomContract, aiSummarizeContract } from '@hub/contracts';

describe('Shared Zod Contracts Unit Tests', () => {
  it('registerContract validates correct payload', () => {
    const valid = { email: 'student@studyhub.com', password: 'password123', name: 'Student' };
    const parsed = registerContract.parse(valid);
    expect(parsed.email).toBe('student@studyhub.com');
  });

  it('roomContract applies default maxParticipants', () => {
    const validRoom = { title: 'Calculus Study Sprint' };
    const parsed = roomContract.parse(validRoom);
    expect(parsed.maxParticipants).toBe(10);
    expect(parsed.isPrivate).toBe(false);
  });

  it('aiSummarizeContract throws on text shorter than 50 characters', () => {
    const invalid = { title: 'Short Note', text: 'Too short text' };
    expect(() => aiSummarizeContract.parse(invalid)).toThrow();
  });
});
