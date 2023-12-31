import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList';
import AddMovie from '../AddMovie/AddMovie.jsx';
import Details from '../Details/Details.jsx';

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        {/* Details page */}
        <Route exact path="/details/:id">
          <Details />
        </Route>
        {/* Add Movie page */}
        <Route exact path="/add">
          <AddMovie />
        </Route>
      </Router>
    </div>
  );
}


export default App;
