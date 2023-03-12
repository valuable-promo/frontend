import Moment from 'react-moment';
import ReactMarkdown from 'react-markdown';
// local
import { GetStaticProps } from 'next';
import Seo from '@/components/seo';
import Layout from '@/components/layout';
import { fetchAPI } from '../../lib/api';
import { getStrapiMedia } from '../../lib/media';
// types
import StrapiArticle from '@/types/article';

interface ArticleProps {
  article: StrapiArticle;
}

const Article: React.FC<ArticleProps> = ({ article }) => {
  const imageUrl = getStrapiMedia(article.attributes.image.data);

  const seo = {
    metaTitle: article.attributes.title,
    metaDescription: article.attributes.description,
    shareImage: article.attributes.image,
    article: true,
  };

  return (
    <Layout>
      <Seo seo={seo} />
      <div id="" className="" data-src={imageUrl} data-srcset={imageUrl} data-uk-img>
        <h1>{article.attributes.title}</h1>
      </div>
      <div className="">
        <div className="">
          <ReactMarkdown>{article.attributes.content}</ReactMarkdown>
          <hr className="" />
          <div className="" data-uk-grid="true">
            <div className="">
              <p className="">By VP</p>
              <p className="">
                <Moment format="MMM Do YYYY">{article.attributes.publishedAt}</Moment>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const articlesRes = await fetchAPI<StrapiArticle[]>('/articles', { fields: ['slug'] });

  return {
    paths: articlesRes.data.map((article) => ({
      params: {
        slug: article.attributes.slug,
      },
    })),
    fallback: false,
  };
}

type Params = {
  slug: string;
};
type Props = {
  article: StrapiArticle;
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const articlesRes = await fetchAPI<StrapiArticle[]>('/articles', {
    filters: {
      slug: params!.slug,
    },
    populate: ['image'],
  });

  return {
    props: { article: articlesRes.data[0] },
    revalidate: 1,
  };
};

export default Article;
