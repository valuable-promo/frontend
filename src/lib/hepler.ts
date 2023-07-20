export function getPublicSiteURL() {
  let publicSiteUrl = 'http://localhost:3000';
  if (typeof process.env.NEXT_PUBLIC_SITE_URL === 'string' && process.env.NEXT_PUBLIC_SITE_URL.length > 0) {
    publicSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  }
  return publicSiteUrl;
}
