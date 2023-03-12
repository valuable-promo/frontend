import StrapiMedia from './strapi-media';

type Author = {
  id: number;
  attributes: {
    name: string;
    avatar: {
      data: StrapiMedia;
    };
  };
};

export default Author;
