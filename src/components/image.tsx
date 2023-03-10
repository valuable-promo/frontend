import NextImage from 'next/image';
// local
import { getStrapiMedia } from '@/lib/media';
// types
import StrapiMedia from '@/types/strapi-media';

type ImageProps = {
  priority?: boolean;
  image: {
    data: StrapiMedia;
  };
};

const Image: React.FC<ImageProps> = ({ priority, image }) => {
  const { alternativeText, width, height } = image.data.attributes;

  return (
    <NextImage
      // fill={true}
      priority={priority ?? false}
      width={width}
      height={height}
      // objectFit="contain"
      src={getStrapiMedia(image.data)}
      alt={alternativeText || ''}
    />
  );
};

export default Image;
