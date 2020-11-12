import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { TreeView, TreeItem } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 240,
        flexGrow: 1,
        maxWidth: 400,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

function dfs(curStr, docTree) {
    const docList = docTree[curStr];
    // There are no more children
    if (!docList) {
        return <TreeItem key={curStr} nodeId={curStr} label={curStr} />;
    } else {
        return (
            <TreeItem key={curStr} nodeId={curStr} label={curStr}>
                {docList.map(doc => dfs(doc, docTree))}
            </TreeItem>
        );
    }
}

function buildComponents(docTree, classes) {
    if (!docTree) return;
    const docList = docTree["root"];
    return docList?.map(doc => dfs(doc, docTree));
}

export default function NestedList({ docFileData, docTree }) {
    const classes = useStyles();
    return (
        <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMore />}
            defaultExpandIcon={<ChevronRight />}
        >
            {buildComponents(docTree, classes)}
        </TreeView>
    );
}
