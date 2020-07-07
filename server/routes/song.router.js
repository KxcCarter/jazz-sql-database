const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// static content. this will be replaced with a database table
const songListArray = [{
        title: 'Take Five',
        length: '2:55',
        date_released: '1959-09-29'
    },
    {
        title: 'So What',
        length: '9:22',
        date_released: '1959-08-17'
    }
];




router.get('/', (req, res) => {
    console.log(`In /songs GET`);
    const sqlQuery = `SELECT * FROM "songs" ORDER BY "artist" ASC;`;

    pool.query(sqlQuery)
        .then((dbRes) => {
            res.send(dbRes.rows)
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
});

router.post('/', (req, res) => {

    res.sendStatus(201);
});

module.exports = router;