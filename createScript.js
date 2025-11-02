// 02/11/25 19:27 Sunday
// file for creating a frida script
const fs = require('fs/promises');
const fsSync = require('fs')
const { spawn, exec } = require('node:child_process');
const util = require('util');
const path = require('node:path');

// CONST
const urlRegex = /(https?:\/\/)?(www\.)?([a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5})(:[0-9]{1,5})?(\/.*)?/gi;
const urlRegexExclude = /^(?!.*fetch)(https?:\/\/)?(www\.)?([a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5})(:[0-9]{1,5})?(\/.*)?$/i;
const pathUrlRegex = /https?:\/\/[^\/]+(\/[^?#]*)?/i

function parseFridaJSTemplate(scriptProperties) {
  const fridaJSInitialTemplate = `// ${scriptProperties.ctime}\n// write your script...`
  return fridaJSInitialTemplate;
}

function parseReadmeTemplate(scriptProperties) {
  const readmeInitialTemplate = `# Name
${scriptProperties.name}
# Version
${scriptProperties.version}
# Script Type
${scriptProperties.type}
# Description
${scriptProperties.description}
# Author
@${scriptProperties.author}
# Created date
${scriptProperties.ctime}
`
  return readmeInitialTemplate;
}

const currentDir = process.cwd();
const scriptsDir = path.join(currentDir, 'Scripts')
const execAsync = util.promisify(exec);

const options = {
  author: {
    type: 'string',      // enum type
    short: 'a'
  },
  name: {
    type: 'string',
    short: 'n'
  },
  description: {
    type: 'string',
    short: 'd'
  },
  type: {
    type: 'string',
    short: 't'
  }
};

// MAIN
async function main() {
  // 1) script properties creation
  // GET CURRENT GITHUB USERNAME
  const { gitUser: author } = await getGit();
  // grab values from the terminal
  const args = process.argv.slice(2)
  const { values } = (util.parseArgs({ args, options, allowPositionals: true }))
  if (!values?.name) {
    console.log('name is mandatory, please enter the same command with -n your_script_name')
    process.exit(1)
  }
  const scriptProperties = {
    author: values?.author ?? author,
    ctime: formatDate(),
    version: 1.0,
    type: values?.type ?? 'Frida',
    description: values?.description ?? 'edit me',
    name: values?.name
  }

  // 2 files creation
  try {
    const doesExists = await fs.statfs(path.join(scriptsDir, scriptProperties.name));
    console.log('script name already exists, please choose another name')
    process.exit(1);
  } catch (err) {
    if (err.message.startsWith('ENOENT')) {
      // console.log(err)
      console.log(`creating script ${scriptProperties.name} `)
    }
  }

  try {
    const scriptNameDir = path.join(scriptsDir, scriptProperties.name)
    await fs.mkdir(scriptNameDir)
    await fs.writeFile(path.join(scriptNameDir, 'Frida.js'), parseFridaJSTemplate(scriptProperties))
    await fs.writeFile(path.join(scriptNameDir, 'README.md'), parseReadmeTemplate(scriptProperties))
  } catch (err) {

  }
}

// UTILS
function formatDate(date = new Date()) {
  return `${date.getFullYear()}/${date.getMonth().toString().padStart(2, 0)}/${(date.getDate() + 1).toString().padStart(2, 0)} ${date.getHours().toString().padStart(2, 0)}:${date.getMinutes().toString().padStart(2, 0)}:${date.getSeconds().toString().padStart(2, 0)}`
}
async function getGit() {
  let gitUrl, gitUser;
  const command = "git remote -v "
  try {
    const { stdout, stderr } = await execAsync(command);
    if (stderr) console.error('Error output:', stderr);
    gitURL = stdout.split('\n')[0].split(/[\t ]/)[1];
    if (!gitURL) return process.exit(1);
    const gitPath = gitURL.match(pathUrlRegex)[1];
    if (!gitPath) return process.exit(1);
    gitUser = gitPath.split('/')[1];
    return { gitUser, gitUrl }

  } catch (error) {
    console.error('Exec error:', error);
    return process.exit(1);
  }
}

main()

