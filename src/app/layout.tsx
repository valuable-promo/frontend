// local
import Footer from '@/components/footer';
import { fetchAPI } from '@/lib/api';
import '@/styles/globals.css';
import { Metadata } from 'next';
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
  const globalRes = await fetchAPI<Global>('/global');
  return globalRes.data;
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
