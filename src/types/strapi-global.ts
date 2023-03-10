import StrapiMedia from './strapi-media';
import SharedSeo from './strapi-seo';

type StrapiGlobal = {
  attributes: {
    siteName: string;
    favicon: {
      data: StrapiMedia;
    };
    defaultSeo: SharedSeo;
  };
};

export default StrapiGlobal;
