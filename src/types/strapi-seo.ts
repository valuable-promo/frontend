import StrapiMedia from './strapi-media';

type SharedSeo = {
  metaTitle: string;
  metaDescription: string;
  shareImage: {
    data: StrapiMedia;
  };
};

export default SharedSeo;
