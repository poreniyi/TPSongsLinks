let path = require('path');
let tagger = require('music-metadata');
let readTexts = require('./readSourcesTxt').readFile;
let fs = require('fs').promises;
const { createHash } = require('crypto')
let Jimp = require('jimp');


let readMP3 = async () => {
    let name='-Everlasting Happiness-.mp3'
    let name2='Little Love Girl.mp3';
    let testFile = path.join(__dirname, "../musicfiles/"+name);
    let metadata = await tagger.parseFile(testFile);

    let image = await Jimp.read(metadata.common.picture[0].data)
    console.log(metadata.common.picture)
    let quality = 20;
    image.quality(quality);
    let buffer = await image.getBufferAsync(Jimp.MIME_JPEG);
    console.log(`Quality: ${quality} OLD: ${metadata.common.picture[0].data.length} New: ${buffer.length} \nThe size differnce is ${metadata.common.picture[0].data.length - buffer.length} bytes`)
}

let readAllMP3 = async () => {
    let musicFileList = await fs.readdir(path.join(__dirname, '../musicfiles'));
    let mp3SongList = [];
    let testValue;
    for (let i = 0; i < musicFileList.length; i++) {
        let metadata = await tagger.parseFile(path.join(__dirname, `../musicfiles/${musicFileList[i]}`));
        let data = metadata.common.title.replace(/\s+/g, '').toLowerCase();
        console.log(metadata.common.title)
        let image = await Jimp.read(metadata.common.picture[0].data)
        let quality = 60;
        image.quality(quality);
        let buffer = await image.getBufferAsync(Jimp.AUTO);
        console.log(`OLD: ${metadata.common.picture[0].data.length} New: ${buffer.length} \n The size differnce i
        s ${metadata.common.picture[0].data.length - buffer.length} bytes`)
        // const hash = createHash('sha256' )
        // hash.update(data)
        // let hashValue = hash.digest('hex');
        // console.log(hashValue)
        // mp3SongList.push(hashValue);
    }

    // let textFileSongList = await readTexts();
    // let badValues = [];
    // textFileSongList.forEach(element => {
    //     let data = element.replace(/\s+/g, '')
    //     const hash = createHash('sha256')
    //     hash.update(data)
    //     let hashValue = hash.digest('hex');
    //     if (!mp3SongList.includes(hashValue)) {
    //         badValues.push(element)
    //         console.log(element)
    //     }
    // })
    // console.log(`Textfile${badValues[0]} is equal to ${testValue}\n${badValues[0] == testValue}`)
    // console.log(badValues.length)
    //console.log(textFileSongList)

}
readMP3()
// readAllMP3()
