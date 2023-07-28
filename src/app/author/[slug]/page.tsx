import type { Metadata } from 'next';
// local
import Card from '@/components/card';
import { fetchAPI } from '@/lib/api';
import SharpImage from '@/components/image';
// types
import type StrapiAuthor from '@/types/strapi-author';
import type StrapiArticle from '@/types/strapi-article';
import { getPublicSiteURL } from '@/lib/hepler';

async function getStrapiAuthor(slug: string) {
  const res = await fetchAPI<StrapiAuthor[]>('/authors', {
    filters: {
      slug: slug,
    },
    populate: ['avatar'],
  });

  return res.data[0];
}

async function getStrapiArticles(authorSlug: string) {
  const res = await fetchAPI<StrapiArticle[]>('/articles', {
    populate: ['image', 'categories', 'authors.avatar'],
    filters: {
      authors: {
        slug: {
          $eqi: authorSlug,
        },
      },
    },
    sort: 'createdAt:DESC',
    pagination: {
      page: 1,
      pageSize: 12,
    },
  });
  return res.data;
}

export async function generateStaticParams() {
  const res = await fetchAPI<StrapiAuthor[]>('/authors', { fields: ['slug'] });
  return res.data.map((author: StrapiAuthor) => ({
    slug: author.attributes.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const author = await getStrapiAuthor(params.slug);
  const publicSiteUrl = getPublicSiteURL();
  return {
    metadataBase: new URL(publicSiteUrl),
    alternates: {
      canonical: `${publicSiteUrl}/author/${author.attributes.slug}`,
    },
    title: author.attributes.name,
    description: author.attributes.biography,
  };
}

interface PageProps {
  params: {
    slug: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const author = await getStrapiAuthor(params.slug);
  const articles = await getStrapiArticles(params.slug);
  return (
    <div className="relative bg-gray-50 px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-base font-semibold leading-7 text-indigo-600">
            <SharpImage image={author.attributes.avatar} fortmat="thumbnail" classes="mx-auto h-24 w-24 rounded-full" />
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-600 sm:text-6xl">{author.attributes.name}</h1>
          <p className="mt-2 text-xl text-gray-400">{author.attributes.title}</p>
          <p className="mt-2 text-xl text-gray-500">{author.attributes.biography}</p>
        </div>

        <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
          {articles.map((article) => {
            return <Card article={article} key={article.attributes.slug} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
