let query = require('../DB/access').query;
let router = require('express').Router();
let musicParser = require('music-metadata');
let fs = require('fs').promises;
let path = require('path');
let Jimp = require('jimp');

router.get('/getSongs', async (req, res) => {
    let data = await query(`SELECT * FROM SONGS ORDER BY id ASC`);
    let firstSong;
    [firstSong] = await fs.readdir(path.join(__dirname, '../../musicfiles'));
    let metadata = await musicParser.parseFile(path.join(__dirname, `../../musicfiles/${firstSong}`));
    console.log(metadata.common.picture[0])
    data = data.rows;
    let img = { format: metadata.common.picture[0].format, base: metadata.common.picture[0].data.toString('base64') }
    //console.log(img.base)
    // console.log(data);
    res.render('viewSongs', { data, img })
})

router.get('/viewSong', async (req, res) => {
    let metadata = await musicParser.parseFile(path.join(__dirname, `../../musicfiles/-Everlasting Happiness-.mp3`));
    ({ rows: [img] } = await query(`SELECT name imgformat,imgdata FROM SONGS LIMIT 1`));
    console.log(metadata.common.picture[0])
    console.log(img)
    console.log(img.imgdata.length);
    let data = { format: img.imgformat, base: img.imgdata.toString('base64') }
    res.render('view1song', { data })
})

router.get('/test', async (req, res) => {
    let metadata = await musicParser.parseFile(path.join(__dirname, `../../musicfiles/-Everlasting Happiness-.mp3`));
    let image = await Jimp.read(metadata.common.picture[0].data)
    let imgArray = [];
    for (let i = 5; i <= 100; i+=5) {
        console.log(i)
        image.quality(i);
        let buffer = await image.getBufferAsync(Jimp.MIME_JPEG);
        console.log(buffer.length)
        buffer=buffer.toString('base64');
        imgArray.push(buffer)
    }
    res.render('test', {imgArray})
})
module.exports = router;