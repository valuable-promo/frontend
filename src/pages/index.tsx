import React from 'react';
import NextImage from 'next/image';
// local
import Articles from '@/components/articles';
import Layout from '@/components/layout';
import Seo from '@/components/seo';
import { fetchAPI } from '@/lib/api';
// types
import type StrapiArticle from '@/types/strapi-article';
import Card from '@/components/card';

type HomeProps = {
  articles: StrapiArticle[];
};

const Home: React.FC<HomeProps> = ({ articles }) => {
  return (
    <Layout>
      <Seo seo={{ metaTitle: 'Home', metaDescription: 'Home page', article: false }} />

      <div className="relative bg-gray-50 px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
        <div className="absolute inset-0">
          <div className="h-1/3 bg-white sm:h-2/3" />
        </div>
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
            <p className="mx-auto mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa libero labore natus atque, ducimus sed.
            </p>
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
    fetchAPI<StrapiArticle[]>('/articles', { populate: ['image', 'categories'] }),
  ]);

  return {
    props: {
      articles: articlesRes.data,
    },
    revalidate: 1,
  };
}

export default Home;
