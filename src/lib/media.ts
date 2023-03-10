// local
import { getStrapiURL } from './api';
// types
import StrapiMedia from '@/types/strapi-media';

/**
 * Get full Strapi Media URL from a Strapi Media object
 * @param {StrapiMedia} media Strapi Media Object
 * @returns {string} Full Strapi Media URL
 */
const getStrapiMedia = (media: StrapiMedia) => {
  const { url } = media.attributes;
  const imageUrl = url.startsWith('/') ? getStrapiURL(url) : url;
  return imageUrl;
};

export { getStrapiMedia };
