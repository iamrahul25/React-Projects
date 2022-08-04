import React, { useEffect, useState} from 'react';
import Moviecard from './Moviecard';
import './App.css';

import './Moviecard.css';

const apikey = 'ca7fa979';

const api_url = `https://www.omdbapi.com/?apikey=${apikey}`;

const App = () => {

    //useState hook - to store the data of Movies
    const [movie, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState('');
  
    //Fetch API  
    const searchMovies = async (movieName) => {
        const response = await fetch(api_url+`&s=${movieName}`);
        const data = await response.json();

        console.log('🎬 Movies Result: ',data.Search);
        
        //Setting the Empty Array to the data. 
        setMovies(data.Search);
    }

    //UseEffect is a hook that runs a piece of code based on a specific condition.
    useEffect( () =>{
      searchMovies('Batman');
    },[]);

    return (
    <div className="App">
        <h1>MovieLand</h1>

        <div className='searchdiv'>

            <input type="search" name="" id="" 
            placeholder="Search for a Movie..."
            value={searchValue} 
            //Very very Important!!!👇
            onChange={(e) => setSearchValue(e.target.value)} />


            <button onClick={()=>{searchMovies(searchValue)}}>Search</button>

        </div>

        <div className='container'>

            {movie.map((movie) => (
                <Moviecard key={movie.imdbID} movie={movie} />
            ))}
        </div>

    </div>
    );
}

export default App;
