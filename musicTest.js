let path = require('path');
let tagger = require('music-metadata');
let readTexts = require('./readSourcesTxt').readFile;
let fs = require('fs').promises;
const {createHash}= require('crypto')

let readMP3 = async () => {
    let testFile = path.join(__dirname, "../musicfiles/Night that can be Danced.mp3");
    let metadata = await tagger.parseFile(testFile);
    let Vocalists = metadata.common.comment;
    let Composers = metadata.common.compilation;
    let Circles = metadata.common.albumartist;
    let songTitle = metadata.common.title;
    //console.log(metadata.native['ID3v2.3']);
    //console.log(metadata.format.duration);
    hash.update(songTitle);
    let hashValue= hash.digest('hex')
    console.log(hashValue);
    //console.log(metadata.native['ID3v2.3']);
    //console.log(metadata.common)//comments not broken up
}

let readAllMP3 = async () => {
    let musicFileList = await fs.readdir(path.join(__dirname, '../musicfiles'));
    let mp3SongList = [];
    let testValue;
    for (let i = 0; i < musicFileList.length; i++) {
        let metadata = await tagger.parseFile(path.join(__dirname, `../musicfiles/${musicFileList[i]}`));
        let data = metadata.common.title.replace(/\s+/g, '').toLowerCase();
        if (i==209){
            testValue=metadata.common.title.toLowerCase();
        }
       // console.log(data)
        const hash=createHash('sha256')
        hash.update(data)
        let hashValue=hash.digest('hex');
        mp3SongList.push(hashValue);
    }

    let textFileSongList = await readTexts();
    let badValues=[];
    textFileSongList.forEach(element=>{
        let data=element.replace(/\s+/g, '')
        const hash=createHash('sha256')
        hash.update(data)
        let hashValue=hash.digest('hex');
        if(!mp3SongList.includes(hashValue)) {
            badValues.push(element)
            console.log(element)
        }
    })
    console.log(`Textfile${badValues[0]} is equal to ${testValue}\n${badValues[0]==testValue}`)
    // console.log(badValues.length)
    //console.log(textFileSongList)

}
//readMP3()
readAllMP3()