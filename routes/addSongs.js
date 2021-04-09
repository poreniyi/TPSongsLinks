let query = require('../DB/access').query;
let router = require('express').Router();
let musicParser = require('music-metadata');


router.get('/getSongs',async (req, res) => {
    let data = await query(`SELECT * FROM SONGS ORDER BY id ASC`);
    let musicFileList = await fs.readdir(path.join(__dirname, '../../../musicfiles'));
    data=data.rows;
    console.log(data);
    res.render('viewSongs',{data})
})

module.exports=router;