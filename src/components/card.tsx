import React from 'react';
import Link from 'next/link';
// local
import NextImage from '@/components/image';
// types
import Article from '@/types/strapi-article';

type CardProps = {
  article: Article;
};

const Card: React.FC<CardProps> = ({ article }) => {
  return (
    <Link href={`/article/${article.attributes.slug}`} legacyBehavior>
      <a className="">
        <div className="">
          <div className="">
            <NextImage image={article.attributes.image} />
          </div>
          <div className="">
            <p className="">{article.attributes.title}</p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Card;
