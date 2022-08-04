import React from 'react';
import './Moviecard.css';

const Moviecard = ({movie}) => {

    return (
    
    <div className="moviecard">
        <div className="imagediv">
            <img className="movie_img" src={movie.Poster} alt=""/>
        </div>

        <div className="infodiv">
            <p>{movie.Type}</p>
            <strong>{movie.Title}</strong>
        </div>
    </div>
    
    );
}

export default Moviecard;