import type StrapiArticle from './strapi-article';

type StrapiCategory = {
  id: number;
  attributes: {
    name: string;
    slug: string;
    description: string;
    articles: {
      data: StrapiArticle[];
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
};

export default StrapiCategory;
