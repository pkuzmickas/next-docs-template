import fs from 'fs'
import path from 'path'

const root = process.cwd();
const contentPath = "content";
const contentExt = ".mdx";

function findAllDocFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
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
        if(file === docBaseName + contentExt) {
            return dir + '/' + file;
        }
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            let result = searchForDoc(file, docBaseName);
            if(result!==null) {
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