import react, {useState} from 'react';


function AddMovie() {

let [newTitle, setTitle] = useState('');
let [newImage, setImage] = useState('');
let [newDesc, setDesc] = useState('');

const handleTitleChange = (event) => {
    setTitle(event.target.value)
}

const handleImageChange = (event) => {
    setImage(event.target.value)
}

const handleDescChange = (event) => {
    setDesc(event.target.value)
}


const addNewMovie = () => {

    // Here's where we'll send the new info to server
} 

// ! Axios GET for genres and then use a .map to list them!

    return (
        <div>
            <form onSubmit={addNewMovie}>
                <label>Movie Title:</label>
                <input value={newTitle} onChange={handleTitleChange}/>
                <label>Movie Poster URL:</label>
                <input value={newImage} onChange={handleImageChange}/>
                <label>Movie Description:</label>
                <input value={newDesc} onChange={handleDescChange}/>
                <label for="Genre">Genre:</label>
                <select name="Genre">
                    <option value="Adventure">Adventure</option>
                    <option value="Animated">Animated</option>
                    <option value="Biographical">Biographical</option>
                    <option value="Comedy">Comedy</option>
                </select>
            </form>
        </div>
        
    )
}

export default AddMovie;