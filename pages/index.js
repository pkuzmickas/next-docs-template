import { getDocData } from "utils/get-docs";

import SideBar from '../components/SideBar';
import Content from 'components/Content';

export default function IndexPage({ docData }) {
  return (
    <>
      <SideBar docTree={docData.docTree}></SideBar>
      <Content pageTitle="Welcome to Leet Documentation" text="main page"></Content>
    </>
  )
}

export async function getStaticProps() {
  const docData = getDocData();
  return { props: { docData } }
}
