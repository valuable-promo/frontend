import { fetchAPI } from '@/lib/api';
import { getPublicSiteURL } from '@/lib/hepler';
import { MetadataRoute } from 'next';
import Article from '@/types/strapi-article';
import Author from '@/types/strapi-author';
import Catefory from '@/types/strapi-category';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const publicSiteUrl = getPublicSiteURL();
  const sitemapSize = 1000;
  // articles
  const articleRes = await fetchAPI<Article[]>('/articles', {
    sort: 'createdAt:DESC',
    fields: ['slug', 'updatedAt'],
    pagination: {
      start: 0,
      limit: sitemapSize,
    },
  });
  const articleURLs = articleRes.data.map((article) => {
    return {
      url: `${publicSiteUrl}/article/${article.attributes.slug}`,
      lastModified: new Date(article.attributes.updatedAt).toISOString(),
    };
  });

  // authors
  const authorRes = await fetchAPI<Author[]>('/authors', {
    sort: 'createdAt:DESC',
    fields: ['slug', 'updatedAt'],
    pagination: {
      start: 0,
      limit: sitemapSize,
    },
  });
  const authorURLs = authorRes.data.map((author) => {
    return {
      url: `${publicSiteUrl}/author/${author.attributes.slug}`,
      lastModified: new Date(author.attributes.updatedAt).toISOString(),
    };
  });

  // categories
  const catRes = await fetchAPI<Catefory[]>('/categories', {
    sort: 'createdAt:DESC',
    fields: ['slug', 'updatedAt'],
    pagination: {
      start: 0,
      limit: sitemapSize,
    },
  });
  const catURLs = catRes.data.map((cat) => {
    return {
      url: `${publicSiteUrl}/category/${cat.attributes.slug}`,
      lastModified: new Date(cat.attributes.updatedAt).toISOString(),
    };
  });

  return [...articleURLs, ...authorURLs, ...catURLs];
}
