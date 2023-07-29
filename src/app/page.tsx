import { Metadata } from 'next';
// local
import Card from '@/components/card';
import MoreArticle from '@/components/more-article';
import { fetchAPI, getArticles } from '@/lib/api';
import { getStrapiMedia } from '@/lib/media';
import { getPublicSiteURL } from '@/lib/hepler';
// types
import Global from '@/types/strapi-global';

export async function generateMetadata(): Promise<Metadata> {
  const global = await getGlobal();
  const seo = global.attributes.seo;
  const image = getStrapiMedia(seo.metaImage.data);
  const publicSiteUrl = getPublicSiteURL();
  return {
    metadataBase: new URL(publicSiteUrl),
    alternates: {
      canonical: publicSiteUrl,
    },
    description: seo.metaDescription,
    keywords: seo.keywords,
    openGraph: {
      title: global.attributes.siteName,
      description: seo.metaDescription,
      siteName: global.attributes.siteName,
      images: [
        {
          url: image.url,
          width: image.width,
          height: image.height,
        },
      ],
      locale: 'en-US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: global.attributes.siteName,
      description: seo.metaDescription,
      images: [image.url],
    },
  };
}

async function getGlobal() {
  const globalRes = await fetchAPI<Global>('/global', {
    populate: {
      favicon: '*',
      seo: {
        populate: '*',
      },
    },
  });
  return globalRes.data;
}

export default async function Page() {
  const start = 0;
  const limit = parseInt(process.env.NEXT_PUBLIC_PAGE_SIZE ?? '12');
  const global = await getGlobal();
  const { data, meta } = await getArticles(start, limit);

  return (
    <div className="relative bg-gray-100 px-6 py-3 lg:px-8 lg:pt-6 lg:pb-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{global.attributes.siteName}</h1>
        <p>{global.attributes.slogan}</p>
      </div>
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-none mt-12 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((article) => {
            return <Card article={article} key={article.attributes.slug} />;
          })}
          <MoreArticle total={meta.pagination.total} />
        </div>
      </div>
    </div>
  );
}
