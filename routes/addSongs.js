let query = require('../DB/access').query;
let router = require('express').Router();
let musicParser = require('music-metadata');
let fs = require('fs').promises;
let path = require('path');

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

module.exports = router;