import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { InformationCircleIcon } from '@heroicons/react/20/solid';

// local
import { fetchAPI } from '@/lib/api';
import { getStrapiMedia } from '@/lib/media';
import { getPublicSiteURL } from '@/lib/hepler';
import SharpImage from '@/components/image';
import Ads from '@/components/ads';

// types
import type StrapiArticle from '@/types/strapi-article';
import type { Metadata } from 'next';

interface PageProps {
  params: {
    slug: string;
  };
}

async function getStrapiArticle(slug: string) {
  const res = await fetchAPI<StrapiArticle[]>('/articles', {
    filters: {
      slug: slug,
    },
    populate: ['image', 'authors.avatar', 'categories', 'seo.metaImage'],
  });

  return res.data[0];
}

export async function generateStaticParams() {
  const res = await fetchAPI<StrapiArticle[]>('/articles', { fields: ['slug'] });
  return res.data.map((article: StrapiArticle) => ({
    slug: article.attributes.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = await getStrapiArticle(params.slug);
  const seo = article.attributes.seo;
  const image = getStrapiMedia(seo.metaImage.data);
  const publicSiteUrl = getPublicSiteURL();
  return {
    metadataBase: new URL(publicSiteUrl),
    alternates: {
      canonical: seo.canonicalURL ?? `${publicSiteUrl}/article/${article.attributes.slug}`,
    },
    title: article.attributes.title,
    description: article.attributes.description,
    keywords: seo.keywords,
    openGraph: {
      title: article.attributes.title,
      description: article.attributes.description,
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
      title: article.attributes.title,
      description: article.attributes.description,
      images: [image.url],
    },
  };
}

const generateJsonLd = (article: StrapiArticle) => {
  const publicSiteUrl = getPublicSiteURL();
  const authors = article.attributes.authors.data;
  const image = getStrapiMedia(article.attributes.image.data);
  const createdAt = moment(article.attributes.createdAt).format('YYYY-MM-DD');
  const publishedAt = moment(article.attributes.publishedAt).format('YYYY-MM-DD');
  const modifiedAt = moment(article.attributes.updatedAt).format('YYYY-MM-DD');
  // author data
  const authorData = authors.map((author) => {
    return {
      '@type': 'Person',
      url: `${publicSiteUrl}/author/${author.attributes.slug}`,
      name: author.attributes.name,
    };
  });
  // jsonld
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    url: `${publicSiteUrl}/article/${article.attributes.slug}`,
    author: authorData,
    name: article.attributes.title,
    headline: article.attributes.description,
    articleBody: article.attributes.content,
    image: {
      '@type': 'ImageObject',
      url: image.url,
      width: image.width,
      height: image.height,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${publicSiteUrl}/article/${article.attributes.slug}`,
    },
    publisher: {
      '@type': 'Organization',
      logo: {
        '@type': 'ImageObject',
        url: `${publicSiteUrl}/logo.png`,
      },
      name: process.env.NEXT_PUBLIC_SITE_NAME ?? 'Valuable Promo',
    },

    datePublished: publishedAt,
    dateModified: modifiedAt,
    dateCreated: createdAt,
  };
};

const Page = async ({ params }: PageProps) => {
  const article = await getStrapiArticle(params.slug);
  const { title, content, publishedAt } = article.attributes;
  const authors = article.attributes.authors.data;
  const jsonld = generateJsonLd(article);
  return (
    <div className="bg-gray-100 px-6 lg:px-8 py-16">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h1>
        <div>
          <div className="mt-6 flex items-center">
            <div className="flex-shrink-0">
              <div className="isolate flex -space-x-1 overflow-hidden">
                {authors.map((author) => {
                  return (
                    <Link href={`/author/${author.attributes.slug}`} key={author.id}>
                      <SharpImage
                        priority
                        image={author.attributes.avatar}
                        fortmat="thumbnail"
                        classes="relative z-30 inline-block rounded-full ring-2 ring-white h-10 w-10"
                      />
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                {authors.map((author, i) => {
                  return (
                    <span key={author.id}>
                      {i > 0 ? ', ' : ''}
                      <Link href={`/author/${author.attributes.slug}`}>{author.attributes.name}</Link>
                    </span>
                  );
                })}
              </p>
              <div className="flex space-x-1 text-sm text-gray-500">
                <time dateTime={publishedAt}>{moment(publishedAt).format('MMM Do YYYY')}</time>
              </div>
            </div>
          </div>
        </div>
        <div className="text-sm font-medium text-indigo-600 mt-5 mb-5">
          {article.attributes.categories.data.map((category) => {
            return (
              <span
                key={category.attributes.slug}
                className="inline-flex items-center rounded-md bg-purple-50 hover:bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700 hover:text-purple-600 ring-1 ring-inset ring-purple-700/10"
              >
                <Link href={`/category/${category.attributes.slug}`}> {category.attributes.name}</Link>
              </span>
            );
          })}
        </div>
        <article className="prose lg:prose-xl">
          <p className="mt-6 text-xl leading-8">{article.attributes.description}</p>
          <figure className="mt-16">
            <SharpImage image={article.attributes.image} classes="rounded-md bg-gray-50 object-cover" />
            <figcaption className="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
              <InformationCircleIcon className="mt-0.5 h-5 w-5 flex-none text-gray-300" aria-hidden="true" />
              {article.attributes.image.data.attributes.caption}
            </figcaption>
          </figure>
          <Ads />
          <ReactMarkdown className="mt-6 text-xl leading-8 markdown">{content}</ReactMarkdown>
          <Ads />
        </article>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }} />
      </div>
    </div>
  );
};

export default Page;
