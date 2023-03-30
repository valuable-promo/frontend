import NextImage from 'next/image';
// local
import { getStrapiMedia } from '@/lib/media';
// types
import { StrapiImage, ImageFormat } from '@/types/strapi-media';

type StrapiImageProps = {
  priority?: boolean;
  classes?: string;
  fortmat?: ImageFormat;
  image: {
    data: StrapiImage;
  };
};

const Image: React.FC<StrapiImageProps> = ({ priority, image, fortmat, classes }) => {
  const { alternativeText } = image.data.attributes;
  const { url, width, height } = getStrapiMedia(image.data, fortmat);

  return (
    <NextImage
      priority={priority ?? false}
      width={width}
      height={height}
      src={url}
      alt={alternativeText || ''}
      className={classes}
    />
  );
};

export default Image;
