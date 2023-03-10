import Author from './author';
import Category from './category';
import StrapiMedia from './strapi-media';

type Article = {
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
    categories: {
      data: Category[];
    };
    authors: {
      data: Author[];
    };
  };
};

export default Article;
