import {useSelector} from 'react-redux';
import react from 'react';
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';

function Details() {

    const dispatch = useDispatch();

    const movieDetails = useSelector(store => store.movieDetails);

    const genreDetails = useSelector(store => store.genreDetails);

    function handleClick() {
        //Dispatch to empty the stored details
        console.log(movieDetails)
        console.log(genreDetails);
    }


    return (
        <div>
        <h1> Here are your movie details </h1>

        {movieDetails.map((movie) => {
            return (
                <div key={movie.id}>
                <h2>{movie.title}</h2>
                <img src={movie.poster}/>
                <p>{movie.description}</p>
                </div>
            )
        })}
            <ul>Genre: {genreDetails.map((details, i) => {
                return <li key={i}>{details.name}</li>
            })}</ul>
        <Link to={'/'}><button onClick={handleClick}>Go Back</button></Link>
        </div>
    )
}


export default Details;