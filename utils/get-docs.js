import fs from 'fs'
import path from 'path'
import matter from "gray-matter";

const root = process.cwd();
const contentPath = "content";
const contentExt = ".mdx";

function findAllDocFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function (file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            /* Recurse into a subdirectory */
            results = results.concat(findAllDocFiles(file));
        } else {
            /* Is a file */
            results.push(file);
        }
    });
    return results;
}

export function getContentPath() {
    return contentPath;
}

export function getDocHierarchy(docFile) {
    const docHierarchy = docFile.split(contentPath + path.sep)[1].split(path.sep);
    // removing the actual file from hierarchy
    docHierarchy.pop();
    return docHierarchy;
}

export function getDocs() {
    const contentRoot = path.join(root, contentPath)
    const docFiles = findAllDocFiles(contentRoot);
    return docFiles;
}

function searchForDoc(dir, docBaseName) {
    const list = fs.readdirSync(dir);

    for (let i = 0; i < list.length; i++) {
        let file = list[i];
        if (file === docBaseName + contentExt) {
            return dir + '/' + file;
        }
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            let result = searchForDoc(file, docBaseName);
            if (result !== null) {
                return result;
            }
        }
    };
    return null;

}

export function findDoc(docBaseName) {
    const contentRoot = path.join(root, contentPath)
    return searchForDoc(contentRoot, docBaseName);
}

export function getDocData() {
    const docList = getDocs();
    const docTree = getHierarchyTree(docList);
    let docFileData = {};
    docList.forEach((doc) => {
        const fileContents = fs.readFileSync(doc, 'utf8')
        let fileName = path.basename(doc);
        const hierarchy = getDocHierarchy(doc);
        if (fileName === "index.mdx") {
            if (hierarchy.length - 1 >= 0) {
                fileName = hierarchy[hierarchy.length - 1];
            }
        }
        const slug = fileName.replace(/\.mdx/, '')
        const { content, data } = matter(fileContents);
        docFileData[fileName] = {
            fileName,
            slug,
            content,
            frontMatter: data,
        }
    })
    return { docFileData, docTree };
}

export function getHierarchyTree(docList = null) {
    if (docList === null) {
        docList = getDocs();
    }
    const hierarchyTree = {};
    const parentTree = {};
    docList.forEach(doc => {
        const hierarchy = getDocHierarchy(doc);
        const fileName = path.basename(doc);
        if (fileName !== "index.mdx") {
            const slug = fileName.replace(/\.mdx/, '')
            let lastNode = "root";
            hierarchy.forEach(node => {
                if (!hierarchyTree[lastNode]) {
                    hierarchyTree[lastNode] = [];
                }
                if (!hierarchyTree[node]) {
                    hierarchyTree[lastNode].push(node);
                }
                parentTree[node] = lastNode;
                lastNode = node;
            })
            if (!hierarchyTree[lastNode]) {
                hierarchyTree[lastNode] = [];
            }
            hierarchyTree[lastNode].push(fileName);
            parentTree[fileName] = lastNode;
        }
    });
    return { hierarchyTree, parentTree };
}