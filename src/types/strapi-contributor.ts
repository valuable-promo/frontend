import type { StrapiImage } from '@/types/strapi-media';

type StrapiContributor = {
  id: number;
  attributes: {
    name: string;
    role: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    avatar: {
      data: StrapiImage;
    };
  };
};

export default StrapiContributor;
