import type { Metadata } from 'next';
// local
import Card from '@/components/card';
import { fetchAPI } from '@/lib/api';
// types
import type StrapiCategory from '@/types/strapi-category';
import type StrapiArticle from '@/types/strapi-article';
import { getPublicSiteURL } from '@/lib/hepler';

async function getStrapiCategory(slug: string) {
  const res = await fetchAPI<StrapiCategory[]>('/categories', {
    filters: {
      slug: slug,
    },
  });

  return res.data[0];
}

async function getStrapiArticles(categorySlug: string) {
  const res = await fetchAPI<StrapiArticle[]>('/articles', {
    populate: ['image', 'categories', 'authors.avatar'],
    filters: {
      categories: {
        slug: {
          $eqi: categorySlug,
        },
      },
    },
    sort: 'createdAt:DESC',
  });
  return res.data;
}

export async function generateStaticParams() {
  const res = await fetchAPI<StrapiCategory[]>('/categories', { fields: ['slug'], sort: 'createdAt:DESC' });
  return res.data.map((category: StrapiCategory) => ({
    slug: category.attributes.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = await getStrapiCategory(params.slug);
  const publicSiteUrl = getPublicSiteURL();
  return {
    metadataBase: new URL(publicSiteUrl),
    alternates: {
      canonical: `${publicSiteUrl}/category/${category.attributes.slug}`,
    },
    title: category.attributes.name,
    description: category.attributes.description,
  };
}

interface PageProps {
  params: {
    slug: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const category = await getStrapiCategory(params.slug);
  const articles = await getStrapiArticles(params.slug);
  return (
    <div className="relative bg-gray-50 px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-600 sm:text-6xl">{category.attributes.name}</h1>
      </div>
      <div className="relative mx-auto max-w-7xl">
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
