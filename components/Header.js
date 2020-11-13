import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Container, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  title: {
    flexGrow: 1,
  },
  separator: {
    marginRight: "15px",
    height: "100%",
    width: "15px",
    height: "30px",
    borderRight: "1px solid black"
  }
}));

export default function Header() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Container maxWidth="lg">

            <Toolbar>
              <img src="/logo.png" width="180" alt="my image" />
              <div className={classes.separator}></div>
              <Typography variant="h6" className={classes.title}>
                Leet Documentation
            </Typography>
              <Button variant="contained" color="secondary">Docs</Button>
              <Button color="inherit">API</Button>
              <Button color="inherit">About</Button>
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    </>
  );  
}
