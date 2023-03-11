import NextImage from 'next/image';
// local
import { getStrapiMedia } from '@/lib/media';
// types
import StrapiMedia from '@/types/strapi-media';

type StrapiImageProps = {
  priority?: boolean;
  classes?: string;
  image: {
    data: StrapiMedia;
  };
};

const StrapiImage: React.FC<StrapiImageProps> = ({ priority, image, classes }) => {
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
      className={classes}
    />
  );
};

export default StrapiImage;
