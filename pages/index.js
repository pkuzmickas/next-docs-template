import { getDocData } from "utils/get-docs";

import Content from 'components/Content';

export default function IndexPage({ docData }) {
  return (
    <>
      {/* <SideBar docTree={docData.docTree}></SideBar> */}
      
      <Content docData={docData} pageTitle="Welcome to Leet Documentation" text="main page"></Content>
    </>
  )
}

export async function getStaticProps() {
  const docData = getDocData();
  return { props: { docData } }
}
