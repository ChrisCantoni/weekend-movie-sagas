import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    // handleClick runs on both the movie picture and on the button below
    function handleClick(event) {
        let movieID = event
        //You make the details in redux but move to a new page
       const action = {type: 'FETCH_MOVIE_DETAILS', payload: movieID};
        dispatch(action);
        const genreAction = {type: 'FETCH_GENRE_DETAILS', payload: movieID};
        dispatch(genreAction);
    }

    return (
        <main>
            <h1>Movie List</h1>
            <Link to='/add'><Button variant="contained">Add Movie</Button></Link>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} id={movie.id}>
                            <Card className='cardContent' style={{backgroundColor: '#AEC3B0'}} sx={{margin: 2, minWidth: 185, maxWidth: 185, minHeight: 420, maxHeight: 450}}>
                                <CardActionArea component={Link} to={`/details/${movie.id}`} onClick={() => handleClick(movie.id)}>
                                    <CardMedia sx={{height: 274}} image={movie.poster} title={movie.title}/>
                                    <Link to={`/details/${movie.id}`}/>
                                    <CardContent>
                                        <Typography variant="h6">
                                            {movie.title}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions className="detailsButton" style={{justifyItems: 'center', justifyContent: 'center', alignContent: 'space-evenly'}}>
                                <Link to={`/details/${movie.id}`}><Button onClick={() => handleClick(movie.id)} size="small" variant="contained">More Details</Button></Link>
                                </CardActions>
                                
                            </Card>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;