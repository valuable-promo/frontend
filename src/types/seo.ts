import { Image } from './media';

interface MetaSocial {
  id: number;
  socialNetwork: string;
  title: string;
  description: string;
}

type Seo = {
  id: number;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  metaRobots: string | null;
  structuredData: string | null;
  metaViewport: string | null;
  canonicalURL: string | null;
  metaImage: { data: Image };
  metaSocial: MetaSocial[];
};

export default Seo;
