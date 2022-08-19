// ! COMPONENTS
import Layout from '../../components/layout';
import Date from '../../components/date';
// ! FILES
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import utilsStyles from '../../styles/utils.module.css';

export async function getStaticProps({ params }) {
  const postsData = await getPostData(params.id);
  return {
    props: {
      postsData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Posts({ postsData }) {
  return (
    <Layout>
      <Head>
        <title>{postsData.title}</title>
      </Head>
      <article>
        <h1 className={utilsStyles.headingXl}>{postsData.title}</h1>
        <div className={utilsStyles.lightText}>
          <Date dateString={postsData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postsData.contentHTML }} />
      </article>
    </Layout>
  );
}
