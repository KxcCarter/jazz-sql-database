const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const moment = require('moment');

router.get('/', (req, res) => {
    console.log(`In /songs GET`);
    const sqlQuery = `SELECT * FROM songs ORDER BY title ASC;`;

    pool
        .query(sqlQuery)
        .then((dbRes) => {
            const rows = dbRes.rows;
            for (let each of rows) {
                each.date_released = moment(each.date_released).format('MMM Do YYYY');
            }

            res.send(rows);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

router.post('/', (req, res) => {
    const sqlQuery = `INSERT INTO "songs" ("title", "length", "date_released")
                VALUES ($1, $2, $3);`;
    let title, length, date;
    [title, length, date] = [
        req.body.title,
        req.body.length,
        req.body.date_released,
    ];

    pool
        .query(sqlQuery, [title, length, date])
        .then((dbRes) => {
            console.log('in dbRes');
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log(err);
            sendStatus(500);
        });
});

module.exports = router;