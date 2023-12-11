import react, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import TextField from '@mui/material/TextField';
import './AddMovie.css';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from "@mui/material/InputLabel";
import FormControl from '@mui/material/FormControl';

function AddMovie() {

    const dispatch = useDispatch();
    const history = useHistory();

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
        if (newMovie.title == '' || newMovie.poster == '' || newMovie.description == '' || newMovie.genre == '') {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You have to fill in all the information!",
              });
        } else {
        console.log(newMovie);
        // Sending the new movie to the Saga that will send to DB
        dispatch({type:'ADD_NEW_MOVIE', payload: newMovie})
        setNewMovie({title: '', poster: '', description: ''})
        history.push('/');
    }} 

    const cancelNewMovie = () => {
        setNewMovie({title: '', poster: '', description: ''})
        history.push('/'); 
    }

// ! Axios GET for genres and then use a .map to list them!

    return (
        <div className="addMovie">
            <form onSubmit={addNewMovie}>
                <label>Movie Title: </label>
                <input value={newMovie.title} onChange={handleTitleChange}/>
                <br/>
                <label>Movie Poster URL: </label>
                <input value={newMovie.poster} onChange={handleImageChange}/>
                <br/>
                <label>Movie Description: </label>
                <TextField sx={{width: 400}} variant="filled" value={newMovie.description} onChange={handleDescChange}/>
                <br/>
                <FormControl variant="filled">
                <InputLabel id="select-genre">Select Genre</InputLabel>
                <Select sx={{width: 175, color: 'white'}} style={{backgroundColor: '#AEC3B0'}} inputProps={{MenuProps: {PaperProps: {sx: {backgroundColor: '#AEC3B0'}}}}} id="select-genre" onChange={handleGenreChange} label="Genre" value={newMovie.genre}>
                    {genres.map((genre, i) => {
                        return <MenuItem key={i} value={genre.name}>{genre.name}</MenuItem>
                    })}
                </Select>
                </FormControl>
                <br/>
                <div className="addButtons">
                <Button variant="contained" onClick={cancelNewMovie}>Cancel</Button>
                <div className="divider"></div>    
                <Button variant="contained" type="submit">Save</Button>
                </div>
            </form>
        </div>
        
    )
}

export default AddMovie;