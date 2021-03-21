const { Pool, Client } = require('pg');
let path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const pool = new Pool({
    user: process.env.psql_user,
    host: process.env.psql_host,
    database: process.env.psql_database,
    password: process.env.psql_password,
    port: process.env.psql_port,
    ssl: { rejectUnauthorized: false }
})


let testQuery = async () => {
    let data = await pool.query('SELECT * FROM cards');
    console.log(data.rows);
    console.log(`finsished`);
    //let data=client.query('INSERT INTO cards(letter)VALUES ($1)',['apple']);
}
testQuery()

module.exports = {
    query: (text, params) => pool.query(text, params),
}
