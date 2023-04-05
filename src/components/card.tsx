import React from 'react';
import Link from 'next/link';
import moment from 'moment';
// local
import SharpImage from '@/components/image';
// types
import type StrapiArticle from '@/types/strapi-article';

type CardProps = {
  article: StrapiArticle;
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
          <SharpImage image={article.attributes.image} classes="h-48 w-full object-cover" />
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
                  <Link href={`/category/${category.attributes.slug}`}> {category.attributes.name}</Link>
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
                  <Link href={`/author/${author.attributes.slug}`} key={author.id}>
                    <SharpImage
                      image={author.attributes.avatar}
                      fortmat="thumbnail"
                      classes={`relative z-30 inline-block rounded-full ring-2 ring-white ${avatarSize}`}
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
                    <Link href={`/author/${author.attributes.slug}`}> {author.attributes.name}</Link>
                  </span>
                );
              })}
            </p>
            <div className="flex space-x-1 text-sm text-gray-500">
              <time dateTime={post.publishedAt}>{moment(post.publishedAt).format('MMM Do YYYY')}</time>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Card;
