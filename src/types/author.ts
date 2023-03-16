import { Image } from './media';

type Author = {
  id: number;
  attributes: {
    name: string;
    avatar: {
      data: Image;
    };
  };
};

export default Author;
