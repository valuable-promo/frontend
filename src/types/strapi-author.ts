import type { StrapiImage } from '@/types/strapi-media';
import type StrapiArticle from './strapi-article';

type StrapiAuthor = {
  id: number;
  attributes: {
    name: string;
    slug: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    avatar: {
      data: StrapiImage;
    };
    articles: {
      data: StrapiArticle[];
    };
  };
};

export default StrapiAuthor;
