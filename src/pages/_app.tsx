import App from 'next/app';
import Head from 'next/head';
import { createContext } from 'react';
// local
import { fetchAPI } from '@/lib/api';
import { getStrapiMedia } from '@/lib/media';
import '@/styles/globals.css';
// types
import type { AppProps, AppContext } from 'next/app';
import type StrapiGlobal from '@/types/strapi-global';

// Store Strapi Global object in context
export const GlobalContext = createContext<StrapiGlobal | undefined>(undefined);

interface MyAppProps {
  Component: AppProps['Component'];
  pageProps: {
    global: StrapiGlobal;
  };
}

const MyApp = ({ Component, pageProps }: MyAppProps) => {
  const { global } = pageProps;
  const favicon = getStrapiMedia(global.attributes.favicon.data);
  return (
    <>
      <Head>
        <link rel="shortcut icon" href={favicon.url} />
      </Head>
      <GlobalContext.Provider value={global}>
        <Component {...pageProps} />
      </GlobalContext.Provider>
    </>
  );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  // Fetch global site settings from Strapi
  const globalRes = await fetchAPI<StrapiGlobal>('/global', {
    populate: {
      favicon: '*',
      defaultSeo: {
        populate: '*',
      },
    },
  });
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global: globalRes.data as StrapiGlobal } };
};

export default MyApp;
