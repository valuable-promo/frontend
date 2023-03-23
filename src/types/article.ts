import type Author from './author';
import type Category from './category';
import type { Image } from './media';
import type Seo from './seo';

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
    seo: Seo;
  };
};

export default Article;
