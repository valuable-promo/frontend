import Head from 'next/head';
import { useContext } from 'react';
import { getStrapiMedia } from '../lib/media';
import { Image } from '@/types/media';

type SeoProps = {
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    shareImage?: { data: Image };
    article: boolean;
  };
};

const Seo: React.FC<SeoProps> = ({ seo }) => {
  const siteName = 'Valuable Promp';
  const defaultSeo = {};

  const seoWithDefaults = {
    ...defaultSeo,
    ...seo,
  };
  const fullSeo = {
    ...seoWithDefaults,
    // Add title suffix
    metaTitle: seoWithDefaults.metaTitle === siteName ? siteName : `${seoWithDefaults.metaTitle} | ${siteName}`,
    // Get full image URL
    shareImage: seoWithDefaults.shareImage ? getStrapiMedia(seoWithDefaults.shareImage.data) : null,
  };

  // debug
  return (
    <Head>
      {fullSeo.metaTitle && (
        <>
          <title>{fullSeo.metaTitle}</title>
          <meta property="og:title" content={fullSeo.metaTitle} />
          <meta name="twitter:title" content={fullSeo.metaTitle} />
        </>
      )}
      {fullSeo.metaDescription && (
        <>
          <meta name="description" content={fullSeo.metaDescription} />
          <meta property="og:description" content={fullSeo.metaDescription} />
          <meta name="twitter:description" content={fullSeo.metaDescription} />
        </>
      )}
      {fullSeo.shareImage && (
        <>
          <meta property="og:image" content={fullSeo.shareImage.url} />
          <meta name="twitter:image" content={fullSeo.shareImage.url} />
          <meta name="image" content={fullSeo.shareImage.url} />
        </>
      )}
      {fullSeo.article && <meta property="og:type" content="article" />}
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default Seo;
