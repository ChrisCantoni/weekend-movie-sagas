const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/:id', (req, res) => {
  const genreID = req.params.id
  const queryText = `SELECT "genres"."name" FROM "genres"
  JOIN "movies_genres" ON "movies_genres"."genre_id" = "genres"."id"
  JOIN "movies" ON "movies_genres"."movie_id" = "movies"."id"
  WHERE "movies"."id" = $1
  GROUP BY "genres"."name";`
  pool.query(queryText, [genreID]).then((result) =>{
    console.log(result.rows);
    res.send(result.rows)
  }).catch((error) => {
    console.log('Error fetching genre', error);
    res.sendStatus(500);
  })
});

router.get('/', (req, res) => {
  const queryText = `SELECT "genres"."name" FROM "genres";`;
  pool.query(queryText).then((result) => {
    res.send(result.rows);
  }).catch((error) => {
    console.log('error fetching all genres', error);
    res.sendStatus(500);
  })
})

module.exports = router;