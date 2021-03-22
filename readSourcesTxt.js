let fs = require('fs').promises;
let path = require('path');
let readFile = async () => {
    let Sources = [];
    let data = await fs.readFile(path.join(__dirname, "txtFiles/Touhou Music Sources.txt"), 'utf-8');
    let lines = data.split('\n');
    let sourceRegex = /^[^\d+.]/;
    let songRegex = /^\d+\)/
    let sourceCounter = -1;
    for (let i = 4; i < lines.length; i++) {
        let element = lines[i].replace(/(\r\n|\n|\r|\t)/gm, "");
        if (element.startsWith('|')) {
            Sources[sourceCounter].source += element;
            continue;
        }
        if (element.match(sourceRegex)) {
            Sources.push({ source: element, songs: [] });
            sourceCounter++;
        }
        if (element.match(songRegex)) {
            let value = element.replace(songRegex, "").toLowerCase();
            value=value.replace(/\s+/g, '')
            Sources[sourceCounter].songs.push(value.trim());
        }
    }
   // console.log(Sources);
    let songCounter = (accumulator, currentValue) => accumulator + currentValue.songs.length
    let songsCount = Sources.reduce(songCounter, 0)
    //console.log(songsCount);
    let uniqueSongs=[];
    Sources.forEach(row=>{
        row.songs.forEach(element=>{
            if(!uniqueSongs.includes(element))uniqueSongs.push(element)
        })
    })
   // console.log(uniqueSongs.length)
    return uniqueSongs;
}
//readFile();
module.exports={
    readFile:readFile,
}