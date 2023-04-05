import { Metadata } from 'next';
// local
import Footer from '@/components/footer';
import Header from '@/components/header';
import { fetchAPI } from '@/lib/api';
import '@/styles/globals.css';
// types
import type StrapiGlobal from '@/types/strapi-global';
import type StrapiCategory from '@/types/strapi-category';

export async function generateMetadata(): Promise<Metadata> {
  const global = await getStrapiGlobal();
  return {
    title: {
      default: global.attributes.siteName,
      template: `%s | ${global.attributes.siteName}`,
    },
  };
}

async function getStrapiGlobal() {
  const globalRes = await fetchAPI<StrapiGlobal>('/global', {
    populate: {
      favicon: '*',
      socials: '*',
    },
  });
  return globalRes.data;
}

async function getStrapiCategories() {
  const res = await fetchAPI<StrapiCategory[]>('/categories');
  return res.data;
}

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const global = await getStrapiGlobal();
  const categories = await getStrapiCategories();
  return (
    <html lang="en">
      <body>
        <Header global={global} categories={categories} />
        {children}
        <Footer global={global} />
      </body>
    </html>
  );
};

export default Layout;
