const readline = require('readline');
const fs = require('fs');
const path = require('path');

const pathToFiles = path.join(__dirname, 'files');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.prompt();
rl.on("line", onLineReceived);
rl.on("close", () => console.log("bye"));

function onLineReceived(data) {
    const [pathRaw, ...filecontentRaw] = data.split(' ');
    const content = filecontentRaw.join(' ');
    const { dir, base } = path.parse(pathRaw);
    if (dir) {
        const pathToDir = path.join(pathToFiles, dir);
        fs.mkdirSync(pathToDir, { recursive: true })
    }

    const pathToFile = dir
        ? path.join(pathToFiles, dir, base)
        : path.join(pathToFiles, base);
        

    fs.writeFileSync(pathToFile, content)

    rl.prompt();
}