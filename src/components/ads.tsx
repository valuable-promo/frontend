'use client';
import Script from 'next/script';
import { useEffect } from 'react';

type Ads = {};

const Ads: React.FC<Ads> = () => {
  const caPub = process.env.NEXT_PUBLIC_CA_PUB ?? '';
  const adsSlot = process.env.NEXT_PUBLIC_ADS_SLOT ?? '';
  const scriptUrl = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js`;

  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <>
      <Script src={scriptUrl} crossOrigin="anonymous" async />
      <ins
        className="adsbygoogle block text-center"
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client={caPub}
        data-ad-slot={adsSlot}
      ></ins>
    </>
  );
};

export default Ads;
