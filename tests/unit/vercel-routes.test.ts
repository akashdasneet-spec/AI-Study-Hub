import { isValidYoutubeUrl } from '@hub/utils';

describe('Vercel-Native Serverless Route Handlers Audit', () => {
  it('should robustly validate YouTube URL formats', () => {
    expect(isValidYoutubeUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe(true);
    expect(isValidYoutubeUrl('https://youtu.be/dQw4w9WgXcQ')).toBe(true);
    expect(isValidYoutubeUrl('https://www.youtube.com/embed/dQw4w9WgXcQ')).toBe(true);
    expect(isValidYoutubeUrl('https://www.youtube.com/shorts/dQw4w9WgXcQ')).toBe(true);
    expect(isValidYoutubeUrl('https://invalid-site.com/video')).toBe(false);
  });
});
