import { Metadata } from 'next';
// local
import Footer from '@/components/footer';
import Header from '@/components/header';
import { fetchAPI } from '@/lib/api';
import '@/styles/globals.css';
// types
import type StrapiGlobal from '@/types/strapi-global';

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const global = await getStrapiGlobal();
  return (
    <html lang="en">
      <body>
        <Header global={global} />
        {children}
        <Footer global={global} />
      </body>
    </html>
  );
}
