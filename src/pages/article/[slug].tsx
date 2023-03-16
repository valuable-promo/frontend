import Moment from 'react-moment';
import ReactMarkdown from 'react-markdown';
// local
import { GetStaticProps } from 'next';
import Seo from '@/components/seo';
import Layout from '@/components/layout';
import { fetchAPI } from '../../lib/api';
// types
import StrapiArticle from '@/types/article';
import StrapiImage from '@/components/strapi-image';

interface ArticleProps {
  article: StrapiArticle;
}

const Article: React.FC<ArticleProps> = ({ article }) => {
  const post = article.attributes;
  const authors = article.attributes.authors.data;

  const seo = {
    metaTitle: article.attributes.title,
    metaDescription: article.attributes.description,
    shareImage: article.attributes.image,
    article: true,
  };

  return (
    <Layout>
      <Seo seo={seo} />

      <div className="">
        <div className="bg-white py-32 px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {article.attributes.title}
            </h1>
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
                    <time dateTime={post.publishedAt}>
                      <Moment format="MMM Do YYYY">{post.publishedAt}</Moment>
                    </time>
                  </div>
                </div>
              </div>
            </div>
            <article className="prose lg:prose-xl">
              <ReactMarkdown className="mt-6 text-xl leading-8 markdown">{article.attributes.content}</ReactMarkdown>
            </article>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const articlesRes = await fetchAPI<StrapiArticle[]>('/articles', { fields: ['slug'] });

  return {
    paths: articlesRes.data.map((article) => ({
      params: {
        slug: article.attributes.slug,
      },
    })),
    fallback: false,
  };
}

type Params = {
  slug: string;
};
type Props = {
  article: StrapiArticle;
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const articlesRes = await fetchAPI<StrapiArticle[]>('/articles', {
    filters: {
      slug: params!.slug,
    },
    populate: ['image', 'authors.avatar'],
  });

  return {
    props: { article: articlesRes.data[0] },
    revalidate: 1,
  };
};

export default Article;
