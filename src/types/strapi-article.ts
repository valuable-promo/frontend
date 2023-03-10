import StrapiMedia from './strapi-media';

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
      data: StrapiMedia;
    };
  };
};

export default StrapiArticle;
