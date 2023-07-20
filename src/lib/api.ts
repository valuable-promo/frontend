import qs from 'qs';

/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
export function getStrapiURL(path: string = ''): string {
  let host = 'http://host.docker.internal:1337';
  if (typeof process.env.NEXT_PUBLIC_STRAPI_API_URL === 'string' && process.env.NEXT_PUBLIC_STRAPI_API_URL.length > 0) {
    host = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  }
  return `${host}${path}`;
}

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
): Promise<{ data: T }> {
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
  const data = await response.json();
  return data as { data: T };
}
