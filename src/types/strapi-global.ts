import Seo from '@/types/strapi-seo';
import { StrapiImage } from '@/types/strapi-media';

type StrapiGlobal = {
  attributes: {
    siteName: string;
    slogan: string;
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
