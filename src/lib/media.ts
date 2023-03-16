// local
import { getStrapiURL } from './api';
// types
import { StrapiMedia, StrapiMediaFormat } from '@/types/media';

/**
 * Get full Strapi Media URL from a Strapi Media object
 * @param {StrapiMedia} media Strapi Media Object
 */
const getStrapiMedia = (media: StrapiMedia, format?: StrapiMediaFormat) => {
  const { url } = media.attributes;
  if (format && media.attributes.formats[format]) {
    return {
      url: media.attributes.formats[format]!.url.startsWith('/')
        ? getStrapiURL(url)
        : media.attributes.formats[format]!.url,
      width: media.attributes.formats[format]!.width,
      height: media.attributes.formats[format]!.height,
    };
  }
  return {
    url: url.startsWith('/') ? getStrapiURL(url) : url,
    width: media.attributes.width,
    height: media.attributes.height,
  };
};

export { getStrapiMedia };
