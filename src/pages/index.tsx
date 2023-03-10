import React from 'react';
// local
import Articles from '@/components/articles';
import Layout from '@/components/layout';
import Seo from '@/components/seo';
import { fetchAPI } from '@/lib/api';
// types
import type StrapiArticle from '@/types/strapi-article';

type HomeProps = {
  articles: StrapiArticle[];
};

const Home: React.FC<HomeProps> = ({ articles }) => {
  return (
    <Layout>
      <Seo seo={{ metaTitle: 'Home', metaDescription: 'Home page', article: false }} />
      <div className="">
        <div className="">
          <Articles articles={articles} />
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  // Run API calls in parallel
  const [articlesRes] = await Promise.all([fetchAPI<StrapiArticle[]>('/articles', { populate: ['image'] })]);

  return {
    props: {
      articles: articlesRes.data,
    },
    revalidate: 1,
  };
}

export default Home;
