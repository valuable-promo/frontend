import { Metadata } from 'next';
// local
import Card from '@/components/card';
import { fetchAPI } from '@/lib/api';
import { getStrapiMedia } from '@/lib/media';
// types
import Article from '@/types/strapi-article';
import Global from '@/types/strapi-global';

export async function generateMetadata(): Promise<Metadata> {
  const { global } = await getData();
  const seo = global.attributes.seo;
  const image = getStrapiMedia(seo.metaImage.data);
  return {
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

async function getData() {
  const [articlesRes, globalRes] = await Promise.all([
    fetchAPI<Article[]>('/articles', {
      populate: ['image', 'categories', 'authors.avatar'],
      sort: 'createdAt:DESC',
    }),
    fetchAPI<Global>('/global', {
      populate: {
        favicon: '*',
        seo: {
          populate: '*',
        },
      },
    }),
  ]);

  return {
    articles: articlesRes.data,
    global: globalRes.data,
  };
}

export default async function Page() {
  const { articles, global } = await getData();
  return (
    <div className="relative bg-gray-50 px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
      <div className="absolute inset-0">
        <div className="h-1/3 bg-white sm:h-2/3" />
      </div>
      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{global.attributes.siteName}</h2>
          <p>{global.attributes.slogan}</p>
        </div>
        <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
          {articles.map((article) => {
            return <Card article={article} key={article.attributes.slug} />;
          })}
        </div>
      </div>
    </div>
  );
}
