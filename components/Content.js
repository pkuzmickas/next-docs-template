import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Container, Grid } from '@material-ui/core';
import SideNav from './SideNav';
import SearchBar from './SearchBar';

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(8),
    },
}));

export default function Content({ docData, pageTitle, text, curDoc }) {
    const classes = useStyles();
    return (
        <main className={classes.content}>
            <Toolbar />
            <Container maxWidth="lg">
                <Grid container spacing={10}>
                    <Grid item xs={3}>
                        <SideNav docData={docData} curDoc={curDoc} />
                    </Grid>
                    <Grid item xs={9}>
                        <Grid container>
                            <Grid item xs={12}>
                                <SearchBar />
                            </Grid>
                            <Grid item xs={12}>
                                <h1>{pageTitle}</h1>
                                <Typography>
                                    {text}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </main>
    );
}

