let query = require('../DB/access').query;
let router = require('express').Router();


router.get('/getSongs',async (req, res) => {
    let data = await query(`SELECT * FROM SONGS`);
    data=data.rows;
    console.log(data);
    res.render('viewSongs',{data})
})

module.exports=router;