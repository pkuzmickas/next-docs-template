import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getDocHierarchy, getDocs } from "utils/get-docs";

import Header from '../components/Header';
import SideBar from '../components/SideBar';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Content from 'components/Content';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  root: {
    display: 'flex',
  },

}));

export default function IndexPage({ docData }) {
  const classes = useStyles();

  return (
    <>
      <CssBaseline></CssBaseline>

      <Header></Header>
      <div className={classes.root}>
        
          <SideBar docData={docData}></SideBar>
          {/* <h1>My Cool Docs</h1>
            {docData.map((data) => (
                <Link href={`/docs/[slug]`} as={`/docs/${data.slug}`}>
                    <a>{data.frontMatter.title}</a>
                </Link>
            ))} */}
          <Content></Content>
      </div>

    </>
  )
}

export async function getStaticProps() {
  const docList = getDocs();
  const docData = docList.map((doc) => {
    const content = fs.readFileSync(doc, 'utf8')
    const fileName = path.basename(doc);
    const hierarchy = getDocHierarchy(doc);
    return {
      slug: fileName.replace(/\.mdx/, ''),
      content,
      frontMatter: matter(content).data,
      hierarchy,
      pathToDoc: hierarchy.join("/")
    }
  })
  return { props: { docData } }
}
