let fs = require('fs').promises;
let path = require('path');
let readFile = async () => {
    let Sources = [];
    let Songs = [];
    let data = await fs.readFile(path.join(__dirname, "txtFiles/Touhou Music Sources.txt"), 'utf-8');
    let lines = data.split('\n');
    let sourceRegex = /^[^\d+.]/;
    let songRegex = /^\d+\)/
    let currentSource={};
    lines.forEach(element => {
        element = element.replace(/(\r\n|\n|\r|\t)/gm, "");
        if (element.match(sourceRegex)) {
            currentSource = element;
            Sources.push(element);
        }
        if (element.match(songRegex)) {
            Songs.push({
                song: element,
                source: currentSource,
            });
        }
    })
    for (let i = 0; i < Sources.length; i++) {
        let source = Sources[i];
        if (source.startsWith('|')) {
            Sources[i - 1] += source;
            Sources.splice(i, 1);
            i--;
        }
    }
    console.log(Sources.length);
    console.log(Songs.length);
   console.log(Songs);
}
readFile();
