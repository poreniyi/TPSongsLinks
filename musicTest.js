let path=require('path');
let tagger=require('music-metadata');
let readTexts=require('./readSourcesTxt').readFile;
let fs=require('fs').promises;

let readMP3=async()=>{
    let testFile=path.join(__dirname,"../musicfiles/Ancient.mp3");
    let metadata= await tagger.parseFile(testFile);
    let Vocalists=metadata.common.comment;
    let Composers=metadata.common.compilation;
    let Circles= metadata.common.albumartist;
    let songTitle=metadata.common.title;
    console.log(metadata);
}
//readMP3()

let readAllMP3=async()=>{
    let musicFileList=await fs.readdir(path.join(__dirname,'../musicfiles'));
    let mp3SongList=[];
    for(let i=0;i<musicFileList.length;i++){
        let metadata=await tagger.parseFile(path.join(__dirname,`../musicfiles/${musicFileList[i]}`));
       let data= metadata.common.title.trim().toLowerCase();
       data=data.replace(/\s+/g, '')
        mp3SongList.push(data);
    }
    console.log(mp3SongList.length)
    let songList=await readTexts();
    let counter=0;
    songList.forEach(element=>{
        if(!(mp3SongList.indexOf(element))){
            console.log(`${element} is not in the mp3list`)
            counter++
        }
    })
    mp3SongList.sort()
    songList.sort()
    for(let i=0;i<songList.length;i++){
        let truthy=songList[i]==mp3SongList[i];
        if(!truthy){
            console.log(`txt file is ${songList[i]}|${mp3SongList[i]}`)
            break;
        }
    }
    console.log(`There are ${counter} discrepencies`);  
    console.log(songList[29]==mp3SongList[29]);  
}

readAllMP3()