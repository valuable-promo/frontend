'use client';
import { useState } from 'react';
// local
import Card from '@/components/card';
import { getArticles } from '@/lib/api';
// types
import type StrapiArticle from '@/types/strapi-article';

type MoreProps = {
  total: number;
  filter?: {
    by: 'author' | 'category';
    slug: string;
  };
};

const MoreArticle: React.FC<MoreProps> = ({ total, filter }) => {
  const limit = parseInt(process.env.NEXT_PUBLIC_PAGE_SIZE ?? '12');
  const [start, setStart] = useState(limit);
  const [articles, setArticles] = useState<StrapiArticle[]>([]);
  const [disabled, setDisabled] = useState(total <= limit);

  const generateFilter = () => {
    if (!filter) return {};
    if (filter.by === 'author') {
      return { authors: { slug: { $eqi: filter.slug } } };
    }
    if (filter.by === 'category') {
      return { categories: { slug: { $eqi: filter.slug } } };
    }
  };

  const loadMore = async () => {
    setStart(start + limit);
    const res = await getArticles(start, limit, generateFilter());
    setArticles((prevArticles) => [...prevArticles, ...res.data]);
    setDisabled(res.data.length < limit || res.meta.pagination.total <= start + limit);
  };

  return (
    <>
      {articles.map((article) => {
        return <Card article={article} key={article.attributes.slug} />;
      })}

      {!disabled && (
        <div className="text-center mx-auto mt-5 col-span-1 sm:col-span-2 lg:col-span-3">
          <button
            onClick={loadMore}
            type="button"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Load more
          </button>
        </div>
      )}
    </>
  );
};

export default MoreArticle;
