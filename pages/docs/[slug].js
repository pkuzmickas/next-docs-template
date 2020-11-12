import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import path from "path";
import { getDocs, getDocData } from "utils/get-docs";
import SideBar from "components/SideBar";
import Content from "components/Content";

const root = process.cwd();

export default function DocPost({ mdxSource, frontMatter, docData }) {
  const content = hydrate(mdxSource);
  return (
    <>
      <SideBar docData={docData.docTree}></SideBar>
      <Content pageTitle={frontMatter.title} text={content}></Content>
    </>
  );
}

export async function getStaticPaths() {
  const docList = getDocs();
  const fileNames = docList.map((doc) => path.basename(doc));
  return {
    fallback: false,
    paths: fileNames.map((fileName) => ({
      params: { slug: fileName.replace(/\.mdx/, "") },
    })),
  };
}

export async function getStaticProps({ params }) {
  const docData = getDocData();
  const curDoc = docData.docFileData.find(doc => doc.slug === params.slug);
  const mdxSource = await renderToString(curDoc.content);
  return { props: { mdxSource, frontMatter: curDoc.frontMatter, docData } };
}
