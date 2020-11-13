import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { TreeView, TreeItem } from '@material-ui/lab';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import { GmailTreeView, StyledTreeItem } from "components/StyledTreeItem";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Label from '@material-ui/icons/Label';
import FolderIcon from '@material-ui/icons/Folder';
import { Link } from '@material-ui/core';
import LensIcon from '@material-ui/icons/Lens';
const useStyles = makeStyles((theme) => ({

    // color: theme.palette.text.secondary,
    // '&:hover > $content': {
    //     backgroundColor: theme.palette.action.hover,
    // },
    // '&:focus > $content, &$selected > $content': {
    //     backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
    //     color: 'var(--tree-view-color)',
    // },
    // '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
    //     backgroundColor: 'transparent',
    // },
}));

function dfs(curStr, docTree, docFileData, level) {
    const docList = docTree.hierarchyTree[curStr];
    const noExt = curStr.replace(/\.mdx/, "");

    // There are no more children
    if (!docList) {
        let labelText;
        if(docFileData[noExt]) {
            labelText = docFileData[noExt].frontMatter.title;
        }
        if(!labelText) {
            labelText = curStr;
        }
        return (
            <Link href={`/docs/${noExt}`}>
                    <StyledTreeItem
                        key={curStr}
                        nodeId={noExt}
                        spacing={level+2}
                        labelText={labelText}
                        bullet="true"
                        color="#0076B6"
                        bgColor="#fff"
                    />
            </Link>
        );
    } else {
        return (
            <StyledTreeItem
                key={curStr}
                nodeId={noExt}
                spacing={level+2}
                labelText={curStr}
                labelInfo={docList.length + ""}
                color="#0076B6"
                bgColor="#fff"
            >
                {docList.map(doc => dfs(doc, docTree, docFileData, level+1))}
            </StyledTreeItem>
        );
    }
}

function buildComponents(docTree, classes, docFileData) {
    if (!docTree) return;
    const docList = docTree.hierarchyTree["root"];
    return docList?.map(doc => dfs(doc, docTree, docFileData, 0));
}

export default function NestedList({ docFileData, docTree, curDoc }) {
    const classes = useStyles();
    const selected = curDoc?.slug;
    let expandedList = [];
    if(selected) {
        let curNode = selected;
        while(curNode!=="root") {
            expandedList.push(curNode);
            curNode = docTree.parentTree[curNode];
        }
    }

    return (
        <>
            <TreeView
                className={classes.root}
                selected={expandedList}
                defaultExpanded={expandedList}
                defaultCollapseIcon={<ArrowDropDownIcon />}
                defaultExpandIcon={<ArrowRightIcon />}
                defaultEndIcon={<div style={{ width: 24 }} />}
            >
                {buildComponents(docTree, classes, docFileData)}
            </TreeView>
        </>
    );
}
