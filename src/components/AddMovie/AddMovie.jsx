import react, {useState} from 'react';
import {useDispatch} from 'react-redux';


function AddMovie() {

    const dispatch = useDispatch();

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


    const addNewMovie = () => {
        event.preventDefault();
        console.log(newMovie);
        // Sending the new movie to the Saga that will send to DB
        dispatch({type:'ADD_NEW_MOVIE', payload: newMovie})
        setNewMovie({title: '', poster: '', description: ''})
    } 

// ! Axios GET for genres and then use a .map to list them!

    return (
        <div>
            <form onSubmit={addNewMovie}>
                <label>Movie Title:</label>
                <input value={newMovie.title} onChange={handleTitleChange}/>
                <br/>
                <label>Movie Poster URL:</label>
                <input value={newMovie.poster} onChange={handleImageChange}/>
                <br/>
                <label>Movie Description:</label>
                <input value={newMovie.description} onChange={handleDescChange}/>
                <br/>
                <label for="Genre">Genre:</label>
                <select onChange={handleGenreChange} name="Genre">
                    <option value="Adventure">Adventure</option>
                    <option value="Animated">Animated</option>
                    <option value="Biographical">Biographical</option>
                    <option value="Comedy">Comedy</option>
                </select>
                <br/>
                <button type="submit">Submit new movie!</button>
            </form>

            <p>{newMovie.title} - {newMovie.poster} - {newMovie.description}</p>
        </div>
        
    )
}

export default AddMovie;