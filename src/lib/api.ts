// types
import Article from '@/types/strapi-article';
// packages
import qs from 'qs';
// local
import { getStrapiURL } from '@/lib/hepler';

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {Object} options Options passed to fetch
 * @returns Parsed API call response
 */
export async function fetchAPI<T>(
  path: string,
  urlParamsObject: object = {},
  options: object = {}
): Promise<{
  data: T;
  meta: {
    pagination: {
      start: number;
      limit: number;
      total: number;
    };
  };
}> {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  // Build request URL
  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = `${getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ''}`)}`;

  // Trigger API call
  const response = await fetch(requestUrl, mergedOptions);

  // Handle response
  if (!response.ok) {
    console.error(response.statusText);
    throw new Error(`An error occured please try again`);
  }
  const res = await response.json();
  return {
    data: res.data,
    meta: res.meta,
  };
}

export async function getArticles(start: number, limit: number, filters: any = {}) {
  const res = fetchAPI<Article[]>('/articles', {
    populate: ['image', 'categories', 'authors.avatar'],
    filters: filters,
    sort: 'createdAt:DESC',
    pagination: {
      start,
      limit,
    },
  });
  return res;
}
