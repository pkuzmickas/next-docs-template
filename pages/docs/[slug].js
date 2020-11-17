import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import path from "path";
import { getDocData } from "utils/get-docs";
import Content from "components/Content";
import { CssBaseline } from "@material-ui/core";

const root = process.cwd();

export default function DocPost({ mdxSource, frontMatter, docData, curDoc }) {
  const content = hydrate(mdxSource);
  return (
    <>
      {/* <SideBar docData={docData.docTree}></SideBar> */}
      <CssBaseline></CssBaseline>
      <Content curDoc={curDoc} docData={docData} pageTitle={frontMatter.title} text={content}></Content>
    </>
  );
}

export async function getStaticPaths() {
  const docData = getDocData();
  console.log("object keys", Object.keys(docData.docFileData));
  const fileNames = Object.keys(docData.docFileData).map((doc) => path.basename(doc));
  return {
    fallback: false,
    paths: fileNames.map((fileName) => ({
      params: { slug: fileName.replace(/\.mdx/, "") },
    })),
  };
}

export async function getStaticProps({ params }) {
  const docData = getDocData();
  let curDoc = docData.docFileData[params.slug + ".mdx"];
  // Might be a folder with index.mdx
  if(!curDoc) {
    curDoc = docData.docFileData[params.slug];
  }
  const mdxSource = await renderToString(curDoc.content);
  return { props: { mdxSource, frontMatter: curDoc.frontMatter, docData, curDoc } };
}
