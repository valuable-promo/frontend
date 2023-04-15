import type { StrapiImage } from '@/types/strapi-media';
import type StrapiSeo from '@/types/strapi-seo';

type StrapiAbout = {
  id: number;
  attributes: {
    title: string;
    team: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    image: {
      data: StrapiImage;
    };
    seo: StrapiSeo;
  };
};

export default StrapiAbout;
