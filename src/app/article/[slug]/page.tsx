import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { InformationCircleIcon } from '@heroicons/react/20/solid';
// local
import { fetchAPI } from '@/lib/api';
import { getStrapiMedia } from '@/lib/media';
import SharpImage from '@/components/image';
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
  return {
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

const Page = async ({ params }: PageProps) => {
  const article = await getStrapiArticle(params.slug);
  const { title, content, publishedAt } = article.attributes;
  const authors = article.attributes.authors.data;
  return (
    <div className="">
      <div className="bg-white py-32 px-6 lg:px-8">
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
                  className="relative z-10 rounded-full bg-gray-50 py-1.5 px-3 font-medium text-gray-600 hover:bg-gray-100 mr-2 last:mr-0"
                >
                  <Link href={`/category/${category.attributes.slug}`}> {category.attributes.name}</Link>
                </span>
              );
            })}
          </div>
          <article className="prose lg:prose-xl">
            <p className="mt-6 text-xl leading-8">{article.attributes.description}</p>
            <figure className="mt-16">
              <SharpImage image={article.attributes.image} classes="rounded-sm bg-gray-50 object-cover" />
              <figcaption className="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
                <InformationCircleIcon className="mt-0.5 h-5 w-5 flex-none text-gray-300" aria-hidden="true" />
                {article.attributes.image.data.attributes.caption}
              </figcaption>
            </figure>
            <ReactMarkdown className="mt-6 text-xl leading-8 markdown">{content}</ReactMarkdown>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Page;
