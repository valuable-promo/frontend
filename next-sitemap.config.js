const { readFile } = require('fs/promises');
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/cdn-cgi/'],
      },
    ],
  },
  sitemapSize: 5000,
  exclude: ['/', '/cookie', '/disclaimer', '/privacy', '/terms'],
  transform: async (config, path) => {
    const base = {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
    if (isType('article', path)) {
      const { title, date } = await getMeta(config.sourceDir, path);
      return {
        ...base,
        news: {
          title: title,
          publicationName: process.env.NEXT_PUBLIC_SITE_NAME,
          publicationLanguage: 'en',
          date: config.autoLastmod ? date : new Date().toISOString(),
        },
      };
    }
    return base;
  },
};

const getMeta = async (sourceDir, path) => {
  try {
    const html = await readFile(`${sourceDir}/server/app${path}.html`, 'utf8');
    const title = parseTitle(html);
    const date = parseDate(html);
    return {
      title,
      date,
    };
  } catch (err) {
    return {
      title: process.env.NEXT_PUBLIC_SITE_NAME,
      date: new Date().toISOString(),
    };
  }
};

const isType = (type, path) => {
  const regex = new RegExp(`^/${type}/.+$`);
  return regex.test(path);
};

const parseTitle = (html) => {
  const match = html.match(/<title>([^<]*)<\/title>/);
  if (!match || typeof match[1] !== 'string') {
    return process.env.NEXT_PUBLIC_SITE_NAME;
  }
  return match[1];
};

const parseDate = (html) => {
  let match = html.match(/<time dateTime="([^"]+)">/);
  if (!match || typeof match[1] !== 'string') {
    return new Date().toISOString();
  }
  return match[1];
};
