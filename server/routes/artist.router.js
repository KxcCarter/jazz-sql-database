const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const moment = require('moment');

router.get('/', (req, res) => {
    console.log(`In /artist GET`);

    let queryText = `SELECT * FROM "artists";`;
    pool
        .query(queryText)
        .then((result) => {
            // send back our query results as an array of objects
            const rows = result.rows;
            for (let each of rows) {
                each.year_born = moment(each.year_born).format('MMM Do YYYY');
                console.log(each);
            }

            res.send(rows); // result.rows will always be an Array
        })
        .catch((error) => {
            console.log(`Error in GET /artists ${error}`);
            // 500 means "server error", generic but effective
            res.sendStatus(500);
        });
});

router.post('/', (req, res) => {
    console.log(`In /artist POST with`, req.body);

    const artistToAdd = req.body;
    const queryText = `INSERT INTO "artists" ("artist_name", "year_born")
                       VALUES ($1, $2);`;
    pool
        .query(queryText, [artistToAdd.name, artistToAdd.born])
        .then((responseFromDatabase) => {
            console.log(responseFromDatabase);
            // 201 means "created"
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error in POST /artist ${error}`);
            res.sendStatus(500);
        });
});

module.exports = router;