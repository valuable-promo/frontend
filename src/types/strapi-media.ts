type StrapiMedia = {
  id: number;
  attributes: {
    name: string;
    alternativeText: null;
    caption: null;
    width: number;
    height: number;
    formats: {
      small: {
        ext: string;
        url: string;
        hash: string;
        mime: string;
        name: string;
        path: null;
        size: number;
        width: number;
        height: number;
      };
      thumbnail: {
        ext: string;
        url: string;
        hash: string;
        mime: string;
        name: string;
        path: null;
        size: number;
        width: number;
        height: number;
      };
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: null;
    provider: string;
    provider_metadata: null;
    createdAt: string;
    updatedAt: string;
  };
};

export default StrapiMedia;
