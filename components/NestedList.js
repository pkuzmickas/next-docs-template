import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { TreeView, TreeItem } from '@material-ui/lab';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import { GmailTreeView, StyledTreeItem} from "components/StyledTreeItem";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Label from '@material-ui/icons/Label';
import FolderIcon from '@material-ui/icons/Folder';
const useStyles = makeStyles((theme) => ({

    color: theme.palette.text.secondary,
    '&:hover > $content': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:focus > $content, &$selected > $content': {
        backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
        color: 'var(--tree-view-color)',
    },
    '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
        backgroundColor: 'transparent',
    },
}));

function dfs(curStr, docTree) {
    const docList = docTree[curStr];
    // There are no more children
    if (!docList) {
        return <StyledTreeItem
            nodeId={curStr}
            labelText={curStr}
            labelIcon={DescriptionOutlinedIcon}
        />;
    } else {
        return (
            <StyledTreeItem
                nodeId={curStr}
                labelText={curStr}
                labelIcon={FolderIcon}
                labelInfo={docList.length}
                color="#fff"
                bgColor="#00395D"
            >
                {docList.map(doc => dfs(doc, docTree))}
            </StyledTreeItem>
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
        <>
            <TreeView
                className={classes.root}
                defaultCollapseIcon={<ArrowDropDownIcon />}
                defaultExpandIcon={<ArrowRightIcon />}
                defaultEndIcon={<div style={{ width: 24 }} />}
            >
                {buildComponents(docTree, classes)}
            </TreeView>
        </>
    );
}
