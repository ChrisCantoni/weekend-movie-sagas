import {useSelector} from 'react-redux';
import react from 'react';
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';

function Details() {

    const dispatch = useDispatch();

    const movieDetails = useSelector(store => store.movieDetails);

    function handleClick() {
        console.log(movieDetails[0])
    }


    return (
        <>
        <h1> Here are your movie details </h1>
        {JSON.stringify(movieDetails)}
        <button onClick={handleClick}>Click</button>
        <h2>{movieDetails[0].title}</h2>
        <img src={movieDetails[0].poster}/>
        <p>{movieDetails[0].description}</p>
        <Link to={'/'}><button>Go Back</button></Link>
        </>
    )
}


export default Details;