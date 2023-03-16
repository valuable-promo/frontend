import React, { useContext } from 'react';
// local
import Layout from '@/components/layout';
import Seo from '@/components/seo';
import Card from '@/components/card';
import { fetchAPI } from '@/lib/api';
import { GlobalContext } from '@/pages/_app';
// types
import type Article from '@/types/article';

type HomeProps = {
  articles: Article[];
};

const Home: React.FC<HomeProps> = ({ articles }) => {
  const global = useContext(GlobalContext);
  return (
    <Layout>
      <Seo
        seo={{
          metaTitle: global?.attributes.siteName,
          metaDescription: global?.attributes.seo.metaDescription,
          article: false,
        }}
      />

      <div className="relative bg-gray-50 px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
        <div className="absolute inset-0">
          <div className="h-1/3 bg-white sm:h-2/3" />
        </div>
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {global?.attributes.siteName}
            </h2>
            <p>{global?.attributes.slogan}</p>
          </div>
          <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
            {articles.map((article, i) => {
              return <Card article={article} key={`article__left__${article.attributes.slug}`} />;
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const [articlesRes] = await Promise.all([
    fetchAPI<Article[]>('/articles', {
      populate: ['image', 'categories', 'authors.avatar'],
    }),
  ]);

  return {
    props: {
      articles: articlesRes.data,
    },
    revalidate: 1,
  };
}

export default Home;
