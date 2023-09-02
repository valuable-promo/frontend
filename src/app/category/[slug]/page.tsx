import type { Metadata } from 'next';
// local
import Card from '@/components/card';
import MoreArticle from '@/components/more-article';
import { fetchAPI, getArticles } from '@/lib/api';
import { getPublicSiteURL } from '@/lib/hepler';
// types
import type StrapiCategory from '@/types/strapi-category';

async function getStrapiCategory(slug: string) {
  const res = await fetchAPI<StrapiCategory[]>('/categories', {
    filters: {
      slug: slug,
    },
  });

  return res.data[0];
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
    title: `${category.attributes.name} | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: category.attributes.description,
  };
}

interface PageProps {
  params: {
    slug: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const limit = parseInt(process.env.NEXT_PUBLIC_PAGE_SIZE ?? '12');
  const category = await getStrapiCategory(params.slug);
  const { data, meta } = await getArticles(0, limit, {
    categories: {
      slug: {
        $eqi: params.slug,
      },
    },
  });
  return (
    <div className="relative bg-gray-100 px-6 lg:px-8 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-600 sm:text-6xl">{category.attributes.name}</h1>
      </div>
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-none mt-12 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((article) => {
            return <Card article={article} key={article.attributes.slug} />;
          })}
          <MoreArticle total={meta.pagination.total} filter={{ by: 'category', slug: params.slug }} />
        </div>
      </div>
    </div>
  );
};

export default Page;
