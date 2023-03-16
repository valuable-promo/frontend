import NextImage from 'next/image';
// local
import { getStrapiMedia } from '@/lib/media';
// types
import { Image, ImageFormat } from '@/types/media';

type StrapiImageProps = {
  priority?: boolean;
  classes?: string;
  fortmat?: ImageFormat;
  image: {
    data: Image;
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
