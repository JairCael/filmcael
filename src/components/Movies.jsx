import React, { useState } from 'react'
import { GrPowerCycle } from 'react-icons/gr';
import { useSelector } from 'react-redux';
import { useGetMoviesQuery } from '../services/TMDB';
import { FeaturedMovie } from './FeaturedMovie';
import { MovieList } from './MovieList';
import { Pagination } from './Pagination';
import { SearchInput } from './SearchInput';

export const Movies = () => {

    const [page, setPage] = useState(1);
    const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);
    const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });

    const numberOfMovies = 19

    if (isFetching) {
        return (
            <div className='h-screen flex justify-center items-center text-white'>
                <GrPowerCycle className='invert text-3xl' />
            </div>
        );
    }

    if (!data?.results?.length) {
        return (
            <div className='h-screen flex justify-center items-center text-white' >
                <span>
                    No movies that match that name.
                    <br />
                    Please searh for something else.
                </span>
            </div >
        );
    }

    if (error) return 'An error has occured.';

    return (
        <div className='w-full'>
            <SearchInput />
            <FeaturedMovie movie={data.results[0]} />
            <MovieList movies={data} numberOfMovies={numberOfMovies} excludeFirst />
            <Pagination currentPage={page} setPage={setPage} totalPages={data.total_pages} />
        </div>
    )
}
