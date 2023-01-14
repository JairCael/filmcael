import React from 'react'
import { Movie } from './Movie';

export const MovieList = ({ movies, numberOfMovies, excludeFirst }) => {

    const startFrom = excludeFirst ? 1 : 0;

    return (

        <div className='grid-cards gap-x-4 2xl:gap-x-6 gap-y-4'>
            {movies.results.slice(startFrom, numberOfMovies).map((movie, i) => (
                <Movie key={i} movie={movie} i={i} />
            ))}
        </div>

    )
}
