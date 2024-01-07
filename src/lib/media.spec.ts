import { getStrapiMedia } from './media';
import { getStrapiURL } from './hepler';
jest.mock('./hepler');

// Mock data for your tests
const mockMedia = {
  attributes: {
    url: '/example.jpg',
    width: 800,
    height: 600,
    formats: {
      thumbnail: {
        url: '/example-thumbnail.jpg',
        width: 150,
        height: 100,
      },
      large: {
        url: 'http://external-site.com/example-large.jpg',
        width: 1600,
        height: 1200,
      },
    },
  },
};

describe('getStrapiMedia', () => {
  it('returns correct URL when no format is specified', () => {
    const result = getStrapiMedia(mockMedia as any);
    expect(result.url).toBe(getStrapiURL('/example.jpg'));
    expect(result.width).toBe(800);
    expect(result.height).toBe(600);
  });

  it('returns correct URL and dimensions for existing format', () => {
    const result = getStrapiMedia(mockMedia as any, 'thumbnail');
    expect(result.url).toBe(getStrapiURL('/example-thumbnail.jpg'));
    expect(result.width).toBe(150);
    expect(result.height).toBe(100);
  });

  it('falls back to default URL and dimensions when specified format does not exist', () => {
    const result = getStrapiMedia(mockMedia as any, undefined);
    expect(result.url).toBe(getStrapiURL('/example.jpg'));
    expect(result.width).toBe(800);
    expect(result.height).toBe(600);
  });

  it('handles external URLs correctly', () => {
    const result = getStrapiMedia(mockMedia as any, 'large');
    expect(result.url).toBe('http://external-site.com/example-large.jpg');
    expect(result.width).toBe(1600);
    expect(result.height).toBe(1200);
  });
});
