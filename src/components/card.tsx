import React from 'react';
import Link from 'next/link';
import Moment from 'react-moment';
// local
import StrapiImage from '@/components/strapi-image';
// types
import Article from '@/types/article';

type CardProps = {
  article: Article;
};

const Card: React.FC<CardProps> = ({ article }) => {
  const post = article.attributes;
  const categories = article.attributes.categories.data;
  const authors = article.attributes.authors.data;
  const avatarSize = authors.length > 1 ? 'h-6 w-6' : 'h-10 w-10';

  return (
    <article key={post.title} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
      <div className="flex-shrink-0">
        <Link href={`/article/${article.attributes.slug}`}>
          <StrapiImage image={article.attributes.image} classes="h-48 w-full object-cover" />
        </Link>
      </div>
      <div className="flex flex-1 flex-col justify-between bg-white p-6">
        <div className="flex-1">
          <p className="text-sm font-medium text-indigo-600">
            {categories.map((category, i) => {
              return (
                <span
                  key={`category__${category.attributes.slug}`}
                  className="relative z-10 rounded-full bg-gray-50 py-1.5 px-3 font-medium text-gray-600 hover:bg-gray-100 mr-2 last:mr-0"
                >
                  {category.attributes.name}
                </span>
              );
            })}
          </p>
          <Link href={`/article/${article.attributes.slug}`} className="mt-2 block">
            <p className="text-xl font-semibold text-gray-900">{post.title}</p>
            <p className="mt-3 text-base text-gray-500">{post.description}</p>
          </Link>
        </div>

        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <div className="isolate flex -space-x-1 overflow-hidden">
              {authors.map((author) => {
                return (
                  <StrapiImage
                    key={author.id}
                    image={author.attributes.avatar}
                    fortmat="thumbnail"
                    classes={`relative z-30 inline-block rounded-full ring-2 ring-white ${avatarSize}`}
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
    </article>
  );
};

export default Card;
