import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Link from 'next/link'
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DescriptionIcon from '@material-ui/icons/Description';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  link: {
    color: "#000",
    textDecoration: "none",
    display: "contents"
  }
}));

export default function SideBar({ docData }) {
  const classes = useStyles();
  {/* <h1>My Cool Docs</h1>
            {docData.map((data) => (
                <Link href={`/docs/[slug]`} as={`/docs/${data.slug}`}>
                    <a>{data.frontMatter.title}</a>
                </Link>
            ))} */}
  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {docData?.map((data, index) => (
              <ListItem button key={data.title}>
                <Link href={`/docs/[slug]`} as={`/docs/${data.slug}`}>
                  <a className={classes.link}>
                    <ListItemIcon><DescriptionIcon/></ListItemIcon>
                    <ListItemText primary={data.slug} />
                  </a>
                </Link>
              </ListItem>
            ))}
            <Divider />
          </List>
        </div>
      </Drawer>
    </div>
  );
}
