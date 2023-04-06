const { readFile } = require('fs/promises');
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL,
  generateRobotsTxt: true,
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
      return {
        ...base,
        news: {
          title: await getTitle('.next', path),
          publicationName: 'Valuable Promo',
          publicationLanguage: 'en',
          date: config.autoLastmod ? new Date().toISOString() : undefined,
        },
      };
    }
    return base;
  },
};

const getTitle = async (sourceDir, path) => {
  try {
    const html = await readFile(`${sourceDir}/server/app${path}.html`, 'utf8');
    const title = parseTitle(html);
    return title;
  } catch (err) {
    return 'Valuable Promo';
  }
};

const isType = (type, path) => {
  const regex = new RegExp(`^/${type}/.+$`);
  return regex.test(path);
};

const parseTitle = (html) => {
  let match = html.match(/<title>([^<]*)<\/title>/);
  if (!match || typeof match[1] !== 'string') throw new Error('Unable to parse the title tag');
  return match[1];
};
