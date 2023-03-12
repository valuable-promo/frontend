import NextImage from 'next/image';
// local
import { getStrapiMedia } from '@/lib/media';
// types
import { StrapiMedia, StrapiMediaFormat } from '@/types/strapi-media';

type StrapiImageProps = {
  priority?: boolean;
  classes?: string;
  fortmat?: StrapiMediaFormat;
  image: {
    data: StrapiMedia;
  };
};

const StrapiImage: React.FC<StrapiImageProps> = ({ priority, image, fortmat, classes }) => {
  const { alternativeText } = image.data.attributes;
  const { url, width, height } = getStrapiMedia(image.data, fortmat);

  return (
    <NextImage
      // fill={true}
      priority={priority ?? false}
      width={width}
      height={height}
      // objectFit="contain"
      src={url}
      alt={alternativeText || ''}
      className={classes}
    />
  );
};

export default StrapiImage;
