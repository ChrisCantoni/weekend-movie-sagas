import {useSelector} from 'react-redux';
import react from 'react';
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Box } from '@mui/material';
import '../MovieList/MovieList.css';


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
        <div className='detailsPage'>
        <h1> Here are your movie details </h1>

        {movieDetails.map((movie) => {
            return (
                <div className="detailDiv" key={movie.id}>
                    <Card sx={{ alignItems: 'center', minWidth: 360, maxWidth: 350, minHeight: 600, maxHeight: 800, margin: '0 auto'}}>
                        <CardContent>
                        <Typography variant="h3" sx={{marginBottom: 5}}>
                            {movie.title}
                        </Typography>
                        
                        <CardMedia sx={{minWidth: 333, maxWidth: 333, height: 500, objectFit: 'contain'}} image={movie.poster} title={movie.title} />
                        </CardContent>
                    </Card>
                        <Box className='detailBox' sx={{width: 700, alignContent: 'center'}}>
                        <Typography className='genreList' variant="h4">
                            Genre(s):<br/> {genreDetails.map((details, i) => {
                                return <li key={i}>{`\u2022`} {details.name} </li>
                            })} 
                        </Typography>
                        <br/>
                        <Typography>
                            <strong>Description: <br/></strong> 
                            {movie.description}
                        </Typography>
                        </Box>
                        
                {/* <h2>{movie.title}</h2>
                <img src={movie.poster}/>
                <p>{movie.description}</p> */}
                </div>
            )
        })}
        <Link to={'/'}><Button variant="contained" onClick={handleClick}>Back to list</Button></Link>
        </div>
    )
}


export default Details;