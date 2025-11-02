const fs = require('fs');
const uuid = require('uuid');

/**
 * Extract information from file content and generate storage objects.
 * @param {string} filePath File Path
 * @returns {Array<Object>|null} An array storing objects; returns null if no information can be retrieved.
 */
function generateStoreObject(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');

    const nameMatch = content.match(/^# (Name|名称)\s+(.*)$/m);
    const versionMatch = content.match(/^# Version\s+(.*)$/m);
    const scriptTypeMatch = content.match(/^# (Script Type|脚本类型)\s+(.*)$/m);
    const authorMatch = content.match(/^# (Author|作者)\s+@(.*)$/m);
    const descriptionMatch = content.match(/^# (Description|描述)\s+([\s\S]*?)# (Author|作者)/m);
    const ctimeMatch = content.match(/^# (Created date|更新时间)\s+(.*)$/m);

   
    if (!nameMatch || !versionMatch || !scriptTypeMatch || !authorMatch || !descriptionMatch || !ctimeMatch) {
        return null;
    }

    const name = nameMatch[2];
    const version = versionMatch[2];
    const scriptType = scriptTypeMatch[2];
    const author = authorMatch[2];
    const description = descriptionMatch[2];
    const ctime = ctimeMatch[2];
    // 取102-999随机数
    const down_count = Math.floor(Math.random() * 898) + 102;
    const branch = "main";
    const githubUser = 'cabiamdos'
    const store = {
        "author": author,
        "markdown": `https://raw.githubusercontent.com/${githubUser}/JsHook-Script-Repo/${branch}/Scripts/${name}/README.md`,
        "ctime": ctime,
        "source": `https://github.com/${githubUser}/JsHook-Script-Repo/tree/${branch}/Scripts/${name}`,
        "id": uuid.v3(name, uuid.v3.DNS),
        "title": name,
        "type": scriptType,
        "version": version,
        "url": `https://raw.githubusercontent.com/${githubUser}/JsHook-Script-Repo/${branch}/Scripts/${name}/${scriptType}.js`,
        "desc": description,
        "down_count": down_count
    };
    // const store_cdn = {
    //     "author": author,
    //     "markdown": "https://cdn.jsdelivr.net/gh/${githubUser}/JsHook-Script-Repo@" + branch + "/Scripts/" + name + "/README.md",
    //     "ctime": ctime,
    //     "source": "https://github.com/${githubUser}/JsHook-Script-Repo/tree/" + branch + "/Scripts/" + name,
    //     "id": name,
    //     "title": name,
    //     "type": scriptType,
    //     "version": version,
    //     "url": "https://cdn.jsdelivr.net/gh/${githubUser}/JsHook-Script-Repo@" + branch + "/Scripts/" + name + "/" + scriptType + ".js",
    //     "desc": description,
    //     "down_count": down_count
    // };
    const store_cdn = {
        "author": author,
        "markdown": `https://gh-proxy.com/https://raw.githubusercontent.com/${githubUser}/JsHook-Script-Repo/${branch}/Scripts/${name}/README.md`,
        "ctime": ctime,
        "source": `https://github.com/${githubUser}/JsHook-Script-Repo/tree/${branch}/Scripts/${name}`,
        "id": uuid.v3(name, uuid.v3.DNS),
        "title": name,
        "type": scriptType,
        "version": version,
        "url": `https://gh-proxy.com/https://raw.githubusercontent.com/${githubUser}/JsHook-Script-Repo/${branch}/Scripts/${name}/${scriptType}.js`,
        "desc": description,
        "down_count": down_count
    };
    // if (nameMatch[0].includes('first_script')) {
        console.log('are we here ', nameMatch)
        // console.log('are we here ', nameMatch, store, store_cdn)
    // }
    return [store, store_cdn];
}

function main() {
    const stores = [];
    const stores_cdn = [];
    let allFiles = getAllFiles('./Scripts');
    console.log(`文件数量|Number of files: ${allFiles.length}`);
    // return
    for (let i = 0; i < allFiles.length; i++) {
        if (allFiles[i].indexOf("README.md") >= 0 && allFiles[i] != "./README.md") {
            // 生成存储对象
            let store = generateStoreObject(allFiles[i]);
            if (store) {
                stores.push(store[0]);
                stores_cdn.push(store[1]);
            }
        }
    }
    fs.writeFileSync('Store.json', JSON.stringify(stores, null, "\t"));
    fs.writeFileSync('Store-cdn.json', JSON.stringify(stores_cdn, null, "\t"));
}

/**
 * 获取指定目录下的所有文件
 * @param {string} directory 目录路径
 * @returns {string[]} 文件路径数组
 */
function getAllFiles(directory) {
    let allFilePaths = [];
    if (fs.existsSync(directory)) {
        let files = fs.readdirSync(directory);
        for (let i = 0; i < files.length; i++) {
            let file = files[i]; // 文件名称（不包含文件路径）
            let currentFilePath = directory + '/' + file;
            let stats = fs.lstatSync(currentFilePath);
            if (stats.isDirectory()) {
                allFilePaths = allFilePaths.concat(getAllFiles(currentFilePath));
            } else {
                allFilePaths.push(currentFilePath);
            }
        }
    } else {
        console.warn(`指定的目录${directory}不存在！`);
    }

    return allFilePaths;
}

main();