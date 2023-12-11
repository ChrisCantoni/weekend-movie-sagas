import react, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import TextField from '@mui/material/TextField';
import './AddMovie.css';


function AddMovie() {

    const dispatch = useDispatch();

    const genres = useSelector(store => store.genres);

    let [newMovie, setNewMovie] = useState({title: '', poster: '', description: '', genre: ''});
    let [newImage, setImage] = useState('');
    let [newDesc, setDesc] = useState('');
    let [newGenre, setGenre] = useState('');

    const handleTitleChange = (event) => {
        setNewMovie({...newMovie, title: event.target.value})
    }

    const handleImageChange = (event) => {
        setNewMovie({...newMovie, poster: event.target.value})
    }

    const handleDescChange = (event) => {
        setNewMovie({...newMovie, description: event.target.value})
    }

    const handleGenreChange = (event) => {
        setNewMovie({...newMovie, genre: event.target.value})
        console.log(newMovie)
    }

    useEffect(() => {
        dispatch({ type: 'FETCH_ALL_GENRES' });
    }, []);


    const addNewMovie = () => {
        event.preventDefault();
        console.log(newMovie);
        // Sending the new movie to the Saga that will send to DB
        dispatch({type:'ADD_NEW_MOVIE', payload: newMovie})
        setNewMovie({title: '', poster: '', description: ''})
    } 

// ! Axios GET for genres and then use a .map to list them!

    return (
        <div className="addMovie">
            <form onSubmit={addNewMovie}>
                <label>Movie Title:</label>
                <input value={newMovie.title} onChange={handleTitleChange}/>
                <br/>
                <label>Movie Poster URL:</label>
                <input value={newMovie.poster} onChange={handleImageChange}/>
                <br/>
                <label>Movie Description:</label>
                <TextField sx={{width: 400}} variant="filled" value={newMovie.description} onChange={handleDescChange}/>
                <br/>
                <select onChange={handleGenreChange} name="Genre" value="Select Genre">
                    <option value='' selected hidden>Choose Genre</option>
                    {genres.map((genre, i) => {
                        return <option key={i} value={genre.name}>{genre.name}</option>
                    })}
                </select>
                <br/>
                <button type="submit">Submit new movie!</button>
            </form>
        </div>
        
    )
}

export default AddMovie;