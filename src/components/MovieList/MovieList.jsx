import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css'
import { Link } from 'react-router-dom';

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    function handleClick(event) {
        let movieID = event.target.parentElement.parentElement.id;
        // You make the details in redux but move to a new page
       const action = {type: 'FETCH_MOVIE_DETAILS', payload: movieID};
        dispatch(action);
        const genreAction = {type: 'FETCH_GENRE_DETAILS', payload: movieID};
        dispatch(genreAction);
    }

    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} id={movie.id}>
                            <h3>{movie.title}</h3>
                            <Link to={`/movies/${movie.id}`}><img onClick={() => handleClick(event)} src={movie.poster} alt={movie.title}/></Link>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;