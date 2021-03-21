let path=require('path');
let tagger=require('music-metadata');

let readMP3=async()=>{
    let testFile=path.join(__dirname,"../musicfiles/Ancient.mp3");
    let metadata= await tagger.parseFile(testFile);
    let Vocalists=metadata.common.comment;
    let Composers=metadata.common.compilation;
    let Circles= metadata.common.albumartist;
    let songTitle=metadata.common.title;
    console.log(metadata);
}
readMP3()