import { formatDate, truncateText, sanitizeInput, registerSchema, createRoomSchema } from './index';

describe('Utility & Validation Helpers', () => {
  it('formatDate formats ISO string correctly', () => {
    const formatted = formatDate('2026-08-03T12:00:00Z');
    expect(formatted).toContain('2026');
  });

  it('truncateText cuts string longer than limit', () => {
    const text = 'This is a long sentence meant to test text truncation in utility helpers.';
    const truncated = truncateText(text, 20);
    expect(truncated.endsWith('...')).toBe(true);
    expect(truncated.length).toBeLessThanOrEqual(23);
  });

  it('sanitizeInput strips script tag delimiters', () => {
    const raw = '<script>alert("xss")</script>';
    const sanitized = sanitizeInput(raw);
    expect(sanitized).toBe('scriptalert("xss")/script');
  });

  it('registerSchema validates valid user input', () => {
    const valid = { email: 'student@studyhub.com', password: 'securepassword123', name: 'John Doe' };
    const parsed = registerSchema.parse(valid);
    expect(parsed.email).toBe('student@studyhub.com');
  });

  it('createRoomSchema applies default maxParticipants', () => {
    const validRoom = { title: 'Physics Sprint' };
    const parsed = createRoomSchema.parse(validRoom);
    expect(parsed.maxParticipants).toBe(10);
    expect(parsed.isPrivate).toBe(false);
  });
});
