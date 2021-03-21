let fs = require('fs').promises;
let path = require('path');
let readFile = async () => {
    let Sources = [];
    let Songs = [];
    let data = await fs.readFile(path.join(__dirname, "txtFiles/Touhou Music Sources.txt"), 'utf-8');
    let lines = data.split('\n');
    let sourceRegex = /^[^\d+.]/;
    let songRegex = /^\d+\)/
    let currentSource = {};
    for (let i = 0; i < lines.length; i++) {
        let element = lines[i].replace(/(\r\n|\n|\r|\t)/gm, "");
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
    }

    console.log(Sources.length);
    console.log(Songs.length);
    console.log(Songs);
}
readFile();
