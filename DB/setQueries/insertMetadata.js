let musicParser = require('music-metadata');
let query = require('../access').query
let fs = require('fs').promises
let path = require('path');

let insertData = async () => {
    let musicFileList = await fs.readdir(path.join(__dirname, '../../../musicfiles'));
    for (let i = 0; i < musicFileList.length; i++) {
        let metadata = await musicParser.parseFile(path.join(__dirname, `../../../musicfiles/${musicFileList[i]}`));
        let title = metadata.common.title.trim();
        let album = metadata.common.album;
        let Vocalists = metadata.common.comment[0].split('/');//array
        let Arrangers = metadata.common.composer;//array
        let Circles = metadata.common.albumartist;//should be an array but not
        query(`INSERT INTO SONGS(Name)
               VALUES($1)`, [title])
        query(`INSERT INTO ALBUMS(Name)
               VALUES($1)`, [album])
        Vocalists.forEach(element => {
            query(`INSERT INTO VOCALISTS(Name)
            VALUES($1)`, [element])
        });      
        Arrangers.forEach(element=>{
            query(`INSERT INTO ARRANGERS(Name)
            VALUES($1)`, [element])
        }) 
        // query(`INSERT INTO CIRCLES(Name)
        //        VALUES($1)`, [title])
    }


}
insertData()
// query(`CREATE TABLE IF NOT EXISTS VOCALISTS(
//     id SERIAL PRIMARY KEY,
//     Name TEXT
// );`)
// query(`CREATE TABLE IF NOT EXISTS SONGS(
//     id SERIAL PRIMARY KEY,
//     Name TEXT,
//     Year SMALLINT
// );`)
// query(`CREATE TABLE IF NOT EXISTS ARRANGERS(
//     id SERIAL PRIMARY KEY,
//     Name TEXT
// );`)
// query(`CREATE TABLE IF NOT EXISTS CIRCLES(
//     id SERIAL PRIMARY KEY,
//     Name TEXT
// );`)
// query(`CREATE TABLE IF NOT EXISTS ALBUMS(
//     id SERIAL PRIMARY KEY,
//     Name TEXT
// );`)
