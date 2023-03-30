import { StrapiImage } from '@/types/strapi-media';

type StrapiAuthor = {
  id: number;
  attributes: {
    name: string;
    avatar: {
      data: StrapiImage;
    };
  };
};

export default StrapiAuthor;
