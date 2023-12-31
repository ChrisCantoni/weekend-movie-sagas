const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {

  const query = `SELECT * FROM movies ORDER BY "title" ASC`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});

router.get('/:id', (req, res) => {
  // GET route for details of each movie
  const queryText = `SELECT * FROM "movies" WHERE "id" = ${req.params.id};`;
  pool.query(queryText).then((result) => {
    res.send(result.rows);
  }).catch((error) => {
    console.log('Error getting details', error);
    res.sendStatus(500);
  })
})

router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    console.log(req.body.genre);
    
    const createdMovieId = result.rows[0].id
    // Added an additional query to ensure "movies_genres" can match both movie and genre
    const getGenreId = `
    SELECT "id" FROM "genres" 
    WHERE "name" LIKE '%'||$1||'%';`;
    pool.query(getGenreId, [req.body.genre])
    .then(result => {
      console.log('New Genre Id', result.rows); // genre ID
      const createdGenreId = result.rows[0].id;
    // Now handle the genre reference
    const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [createdMovieId, createdGenreId]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })
    }).catch(err => {
      console.log(err)
      res.sendStatus(500);
    })

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

module.exports = router;