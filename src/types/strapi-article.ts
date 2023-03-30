import type StrapiAuthor from '@/types/strapi-author';
import type StrapiCategory from '@/types/strapi-category';
import type { StrapiImage } from '@/types/strapi-media';
import type StrapiSeo from '@/types/strapi-seo';

type StrapiArticle = {
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
    categories: {
      data: StrapiCategory[];
    };
    authors: {
      data: StrapiAuthor[];
    };
    seo: StrapiSeo;
  };
};

export default StrapiArticle;
