import React from 'react';
// local
import Card from '@/components/card';
// types
import type StrapiArticle from '@/types/strapi-article';

type ArticlesProps = {
  articles: StrapiArticle[];
};

const Articles: React.FC<ArticlesProps> = ({ articles }) => {
  const leftArticlesCount = Math.ceil(articles.length / 5);
  const leftArticles = articles.slice(0, leftArticlesCount);
  const rightArticles = articles.slice(leftArticlesCount, articles.length);

  return (
    <div>
      <div className="" data-uk-grid="true">
        <div>
          {leftArticles.map((article, i) => {
            return <Card article={article} key={`article__left__${article.attributes.slug}`} />;
          })}
        </div>
        <div>
          <div className="" data-uk-grid>
            {rightArticles.map((article, i) => {
              return <Card article={article} key={`article__left__${article.attributes.slug}`} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;
