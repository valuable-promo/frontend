import Author from './author';
import Category from './category';
import { Image } from './media';

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
      data: Image;
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
