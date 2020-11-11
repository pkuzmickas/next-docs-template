import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function Content({ pageTitle, text }) {
    const classes = useStyles();
    return (
        <main className={classes.content}>
            <Toolbar />
            <Container maxWidth="lg">
                <h1>{pageTitle}</h1>
                <Typography>
                    {text}
                </Typography>
            </Container>
        </main>
    );
}

