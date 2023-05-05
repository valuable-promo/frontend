import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check for secret to confirm this is a valid request
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: Missing or invalid Bearer token' });
  }
  const bearerToken = authorizationHeader.split(' ')[1];
  if (bearerToken !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // Revalidate the pages
  const { event, model, entry } = req.body;
  const track = {
    events: ['entry.create', 'entry.update', 'entry.delete'],
    models: ['article', 'author', 'category', 'contributor', 'page', 'about', 'global'],
  };

  try {
    if (track.events.includes(event) && track.models.includes(model)) {
      if (model === 'article') {
        console.log(`Revalidating article: ${entry.slug}`);
        await Promise.all([res.revalidate('/'), res.revalidate(`/article/${entry.slug}`)]);
      }
      if (model === 'author') {
        console.log(`Revalidating author: ${entry.slug}`);
        await Promise.all([res.revalidate('/'), res.revalidate(`/author/${entry.slug}`)]);
      }
      if (model === 'category') {
        console.log(`Revalidating category: ${entry.slug}`);
        await Promise.all([res.revalidate('/'), res.revalidate(`/category/${entry.slug}`)]);
      }
      if (model === 'contributor') {
        console.log(`Revalidating contributor (about page): ${entry.slug}`);
        await Promise.all([res.revalidate('/about')]);
      }
      if (model === 'page') {
        console.log(`Revalidating page: ${entry.slug}`);
        await Promise.all([res.revalidate(`/${entry.slug}}`)]);
      }
      if (model === 'about') {
        console.log(`Revalidating about page`);
        await Promise.all([res.revalidate('/'), res.revalidate(`/about`)]);
      }
      if (model === 'global') {
        console.log(`Revalidating global`);
        await Promise.all([res.revalidate('/')]);
      }
    }
    return res.status(204).end();
  } catch (err) {
    console.error(err);
    return res.status(500).send('Error revalidating');
  }
}
