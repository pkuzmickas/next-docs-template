import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
import { getDocs, findDoc } from "utils/get-docs";

const root = process.cwd();

export default function DocPost({ mdxSource, frontMatter }) {
  const content = hydrate(mdxSource);
  return (
    <>
      <h1>{frontMatter.title}</h1>
      {content}
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
  const docPath = findDoc(params.slug);
  const source = fs.readFileSync(
    docPath,
    "utf8"
  );
  const { data, content } = matter(source);
  const mdxSource = await renderToString(content);
  return { props: { mdxSource, frontMatter: data } };
}
