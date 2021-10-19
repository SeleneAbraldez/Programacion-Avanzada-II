import React from 'react';
import PropTypes from "prop-types";
import Movie from './Movie';

const MoviesList = ({ lista }) => {

    return (
        <div className="movieslist-container">
            {lista.map((peli =>
            <div className="movieslist-item" key={peli.imdbID} >
                <Movie movie={peli} />
            </div>
        ))}
        </div>
    );
}

MoviesList.propTypes = {
    lista: PropTypes.array
}

export default MoviesList;