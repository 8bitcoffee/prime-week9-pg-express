const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// We will switch from using this Array to using a database.
let songs = [
    {
        id: 1,
        rank: 355, 
        artist: 'Ke$ha', 
        track: 'Tik-Toc', 
        published: '1/1/2009'
    },
    {
        id: 2,
        rank: 356, 
        artist: 'Gene Autry', 
        track: 'Rudolph, the Red-Nosed Reindeer', 
        published: '1/1/1949'
    },
    {
        id: 3,
        rank: 357, 
        artist: 'Oasis', 
        track: 'Wonderwall', 
        published: '1/1/1996'
    }
];

router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "songs";';
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    })
    .catch((error) => {
        console.error("Error in GET '/songs'", error);
        res.sendStatus(500);
    })
});

router.post('/', (req, res) => {
    console.log('req.body', req.body);
    // ! DO NOT put ${value} into your query!!!
    let queryText = `
        INSERT INTO "songs" ("rank", "artist", "track", "published")
        VALUES ($1, $2, $3, $4);
    `;
    //                        $1               $2               $3                $4
    pool.query(queryText, [req.body.rank, req.body.artist, req.body.track, req.body.published])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) =>{
            console.error("Error in POST '/songs'", error);
            res.sendStatus(500);
        });
});

router.delete('/:id', (req, res) => {
    // NOTE: This route is incomplete.
    console.log('req.params', req.params);
    let queryText = 'DELETE FROM "songs" WHERE "id" = $1';
    pool.query(queryText,[req.params.id])
        .then((result) =>{
            res.sendStatus(200);
        })
        .catch((error) => {
            console.error("Error in DELETE '/songs'", error);
            res.sendStatus(500);
        });
});

router.put('/:id', (req,res) =>{
    console.log('PUT /songs', req.params, req.body);
    let queryText = `
        UPDATE "songs" SET "artist" = $1, "track" = $2
        WHERE "id" = $3;
    `;
    pool.query(queryText, [req.body.artist, req.body.track, req.params.id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.error("Error in PUT '/songs'", error);
            res.sendStatus(500);
        })
})

module.exports = router;