import { getPublicSiteURL, getStrapiURL } from './hepler';

describe('URL Utility Functions', () => {
  describe('getPublicSiteURL', () => {
    it('returns default URL when NEXT_PUBLIC_SITE_URL is not set', () => {
      expect(getPublicSiteURL()).toBe('http://localhost:3000');
    });

    it('returns overridden URL from NEXT_PUBLIC_SITE_URL', () => {
      process.env.NEXT_PUBLIC_SITE_URL = 'http://example.com';
      expect(getPublicSiteURL()).toBe('http://example.com');
    });
  });

  describe('getStrapiURL', () => {
    it('returns default URL with empty path when NEXT_PUBLIC_STRAPI_API_URL is not set', () => {
      expect(getStrapiURL()).toBe('http://host.docker.internal:1337');
    });

    it('returns default URL with path when NEXT_PUBLIC_STRAPI_API_URL is not set', () => {
      const path = '/api/data';
      expect(getStrapiURL(path)).toBe(`http://host.docker.internal:1337${path}`);
    });

    it('returns overridden URL from NEXT_PUBLIC_STRAPI_API_URL with empty path', () => {
      process.env.NEXT_PUBLIC_STRAPI_API_URL = 'http://strapi.example.com';
      expect(getStrapiURL()).toBe('http://strapi.example.com');
    });

    it('returns overridden URL from NEXT_PUBLIC_STRAPI_API_URL with path', () => {
      const path = '/api/data';
      process.env.NEXT_PUBLIC_STRAPI_API_URL = 'http://strapi.example.com';
      expect(getStrapiURL(path)).toBe(`http://strapi.example.com${path}`);
    });
  });
});
