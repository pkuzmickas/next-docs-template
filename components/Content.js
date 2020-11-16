import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Container, Grid } from '@material-ui/core';
import SideNav from './SideNav';
import SearchBar from './SearchBar';
import { MDXProvider } from '@mdx-js/react'
import ReactMarkdown from 'react-markdown'
import CodeBlock from "components/CodeBlock";
const components = {
    pre: props => <div {...props} />,
    code: CodeBlock
}

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
                <Grid container spacing={5}>
                    <Grid item xs={4}>
                        <SideNav docData={docData} curDoc={curDoc} />
                    </Grid>
                    <Grid item xs={8}>
                        <Grid container>
                            <Grid item>
                                <SearchBar />
                            </Grid>
                            <Grid item>
                                {/* <h1>{pageTitle}</h1> */}
                                <Typography>
                                    <MDXProvider components={components}>
                                        {text}
                                    </MDXProvider>
                                    {/* {text} */}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </main>
    );
}

