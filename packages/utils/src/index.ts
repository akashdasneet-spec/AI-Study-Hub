/**
 * Formats a date string into a standard readable locale format.
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

/**
 * Truncates text to a specified maximum length with ellipsis.
 */
export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '...';
}

/**
 * Sanitizes user input string for basic security.
 */
export function sanitizeInput(input: string): string {
  return input.replace(/[<>]/g, '');
}

export * from './validation';
