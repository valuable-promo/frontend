import moment from 'moment';
import ReactMarkdown from 'react-markdown';
// local
import { fetchAPI } from '@/lib/api';
import { getStrapiMedia } from '@/lib/media';
import { getPublicSiteURL } from '@/lib/hepler';
// types
import type StrapiPage from '@/types/strapi-page';
import type { Metadata } from 'next';

interface PageProps {
  params: {
    slug: string;
  };
}

async function getEntity(slug: string) {
  const res = await fetchAPI<StrapiPage[]>('/pages', {
    filters: {
      slug: slug,
    },
    populate: ['image', 'seo.metaImage'],
  });

  return res.data[0];
}

export async function generateStaticParams() {
  const res = await fetchAPI<StrapiPage[]>('/pages', { fields: ['slug'] });
  return res.data.map((page: StrapiPage) => ({
    slug: page.attributes.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const entity = await getEntity(params.slug);
  const seo = entity.attributes.seo;
  const image = getStrapiMedia(seo.metaImage.data);
  const publicSiteUrl = getPublicSiteURL();
  return {
    metadataBase: new URL(publicSiteUrl),
    title: `${entity.attributes.title} | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    description: entity.attributes.description,
    keywords: seo.keywords,
    openGraph: {
      title: entity.attributes.title,
      description: entity.attributes.description,
      siteName: process.env.SITE_NAME,
      images: [
        {
          url: image.url,
          width: image.width,
          height: image.height,
        },
      ],
      locale: 'en-US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: entity.attributes.title,
      description: entity.attributes.description,
      images: [image.url],
    },
  };
}

const Page = async ({ params }: PageProps) => {
  const entity = await getEntity(params.slug);
  const { title, content, publishedAt } = entity.attributes;
  return (
    <div className="bg-gray-100 px-6 lg:px-8 py-16">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h1>
        <div>
          <div className="mt-6 flex items-center">
            <div className="flex-shrink-0">
              <div className="isolate flex -space-x-1 overflow-hidden">Last updated</div>
            </div>

            <div className="ml-3">
              <div className="flex space-x-1 text-sm text-gray-500">
                <time dateTime={publishedAt}>{moment(publishedAt).format('MMM Do YYYY')}</time>
              </div>
            </div>
          </div>
        </div>
        <article className="prose lg:prose-xl">
          <ReactMarkdown className="mt-6 text-xl leading-8 markdown">{content}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
};

export default Page;
