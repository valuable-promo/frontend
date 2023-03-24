import { Metadata } from 'next';
// local
import Footer from '@/components/footer';
import Header from '@/components/header';
import { fetchAPI } from '@/lib/api';
import '@/styles/globals.css';
// types
import type Global from '@/types/global';

export async function generateMetadata(): Promise<Metadata> {
  const global = await getGlobal();
  return {
    title: {
      default: global.attributes.siteName,
      template: `%s | ${global.attributes.siteName}`,
    },
  };
}

async function getGlobal() {
  const globalRes = await fetchAPI<Global>('/global', {
    populate: {
      favicon: '*',
    },
  });
  return globalRes.data;
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const global = await getGlobal();
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
