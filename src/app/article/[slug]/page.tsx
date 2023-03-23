import moment from 'moment';
import ReactMarkdown from 'react-markdown';
// local
import { fetchAPI } from '@/lib/api';
import { getStrapiMedia } from '@/lib/media';
import StrapiImage from '@/components/strapi-image';
// types
import type Article from '@/types/article';
import type { Metadata } from 'next';

interface PageProps {
  params: {
    slug: string;
  };
}

async function getArticle(slug: string) {
  const articlesRes = await fetchAPI<Article[]>('/articles', {
    filters: {
      slug: slug,
    },
    populate: ['image', 'authors.avatar', 'categories', 'seo.metaImage'],
  });

  return articlesRes.data[0];
}

export async function generateStaticParams() {
  const articlesRes = await fetchAPI<Article[]>('/articles', { fields: ['slug'] });
  return articlesRes.data.map((article: Article) => ({
    slug: article.attributes.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = await getArticle(params.slug);
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
  const article = await getArticle(params.slug);
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
                      <StrapiImage
                        key={author.id}
                        image={author.attributes.avatar}
                        fortmat="thumbnail"
                        classes="relative z-30 inline-block rounded-full ring-2 ring-white h-10 w-10"
                      />
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
                        {author.attributes.name}
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
          <article className="prose lg:prose-xl">
            <ReactMarkdown className="mt-6 text-xl leading-8 markdown">{content}</ReactMarkdown>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Page;