import type Seo from '@/types/strapi-seo';
import type { StrapiImage } from '@/types/strapi-media';

type StrapiGlobal = {
  attributes: {
    siteName: string;
    slogan: string;
    about: string;
    favicon: {
      data: StrapiImage;
    };
    seo: Seo;
    socials: [
      {
        name: string;
        url: string;
      }
    ];
  };
};

export default StrapiGlobal;
