import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NestedList from './NestedList';

const useStyles = makeStyles(theme => ({
root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SideNav({ docData, curDoc }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <NestedList curDoc={curDoc} docFileData={docData.docFileData} docTree={docData.docTree}></NestedList>
    </div>
  );
}