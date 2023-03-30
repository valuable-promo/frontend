import type { StrapiImage } from '@/types/strapi-media';
import type StrapiSeo from '@/types/strapi-seo';

type StrapiPage = {
  id: number;
  attributes: {
    title: string;
    description: string;
    content: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    image: {
      data: StrapiImage;
    };
    seo: StrapiSeo;
  };
};

export default StrapiPage;
