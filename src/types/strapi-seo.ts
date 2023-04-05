import type { StrapiImage } from '@/types/strapi-media';

interface MetaSocial {
  id: number;
  socialNetwork: string;
  title: string;
  description: string;
}

type StrapiSeo = {
  id: number;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  metaRobots: string | null;
  structuredData: string | null;
  metaViewport: string | null;
  canonicalURL: string | null;
  metaImage: { data: StrapiImage };
  metaSocial: MetaSocial[];
};

export default StrapiSeo;
