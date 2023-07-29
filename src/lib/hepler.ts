/**
 * Get full public site URL
 * @returns {string} Full public site URL
 */
export function getPublicSiteURL() {
  let publicSiteUrl = 'http://localhost:3000';
  if (typeof process.env.NEXT_PUBLIC_SITE_URL === 'string' && process.env.NEXT_PUBLIC_SITE_URL.length > 0) {
    publicSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  }
  return publicSiteUrl;
}

/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
export function getStrapiURL(path: string = ''): string {
  let host = 'http://host.docker.internal:1337';
  if (typeof process.env.NEXT_PUBLIC_STRAPI_API_URL === 'string' && process.env.NEXT_PUBLIC_STRAPI_API_URL.length > 0) {
    host = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  }
  return `${host}${path}`;
}
