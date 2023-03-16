import Seo from './seo';
import { Image } from './media';

type Global = {
  attributes: {
    siteName: string;
    slogan: string;
    favicon: {
      data: Image;
    };
    seo: Seo;
  };
};

export default Global;
