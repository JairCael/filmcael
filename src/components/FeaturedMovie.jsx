import React from 'react'
import { Link } from 'react-router-dom';

export const FeaturedMovie = ({ movie }) => {

    return (
        <Link to={`/movie/${movie.id}`}>
            <div className='relative'>
                <div className='absolute top-0 right-0 bg-gradient-to-b from-[#070707] via-transparent to-[#070707] w-full h-[500px]' />
                <div className='absolute top-0 right-0 bg-gradient-to-l from-transparent via-transparent to-[#070707] w-full h-[500px]' />
                <img
                    src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                    className='w-full h-[500px]'
                />
                <div className='absolute bottom-10 left-6 z-20 w-11/12 md:w-10/12 lg:w-8/12 xl:w-6/12 2xl:w-5/12 text-white'>
                    <h3 className='text-4xl md:text-5xl mb-10 font-semibold'>{movie.title}</h3>
                    <p className='text-md xl:text-lg'>{movie.overview}</p>
                </div>
            </div>
        </Link>
    )
}
