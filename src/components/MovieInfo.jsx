import React from 'react'
import { MovieList } from './MovieList'
import { GrPowerCycle } from 'react-icons/gr';
import { Link, useParams } from 'react-router-dom'
import { selectGenreOrCategory } from '../features/currentGenreOrCategory';
import { useGetMovieQuery, useGetRecommendationsQuery } from '../services/TMDB';
import genreIcons from '../assets/genres';
import { VideoModal } from './VideoModal';
import { useDispatch } from 'react-redux';

export const MovieInfo = () => {

    const dispatch = useDispatch();

    const { id } = useParams();
    const { data, isFetching, error } = useGetMovieQuery(id);
    const { data: recommendations } = useGetRecommendationsQuery({ list: '/recommendations', movie_id: id });

    if (isFetching) {
        return (
            <div className='h-96 flex justify-center items-center text-white'>
                <GrPowerCycle className='invert text-5xl animate-spin' />
            </div>
        );
    }

    if (error) return 'An error has occured.';

    return (
        <div className='pt-10'>
            <div className='grid grid-col lg:grid-cols-2'>
                <div className='relative'>
                    <div className='absolute top-0 right-0 bg-gradient-to-r from-transparent via-transparent to-[#070707] w-full h-[500px] lg:h-screen' />
                    <div className='absolute top-0 right-0 bg-gradient-to-t from-transparent via-transparent to-[#070707] w-full h-[500px] lg:h-screen' />
                    <div className='absolute top-0 right-0 bg-gradient-to-l from-transparent via-transparent to-[#070707] w-full h-[500px] lg:h-screen' />
                    <div className='absolute top-0 right-0 bg-gradient-to-b from-transparent via-transparent to-[#070707] w-full h-[500px] lg:h-screen' />
                    <img
                        src={`https://image.tmdb.org/t/p/original/${data?.backdrop_path}`}
                        className='w-full h-[500px] lg:h-screen rounded'
                    />
                </div>
                <div className='flex flex-col justify-center text-white p-5'>
                    <h3 className='text-5xl text-center font-bold text-red-600'>{data?.title}</h3>
                    <h3 className='text-2xl text-center font-bold text-gray-300 mt-4'>{data?.tagline}</h3>
                    <div className="flex justify-around items-center mt-10 text-xs sm:text-lg">
                        <div className='flex'>
                            <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Rating star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            <p className="ml-2 font-bold text-gray-900 dark:text-white">{data?.vote_average} / 10</p>
                        </div>
                        <div className="flex text-white font-semibold">
                            <div className="">{data?.runtime} min</div>
                            <div className="mx-4">{data?.release_date}</div>
                            <div className="">
                                {data?.original_language == 'en' ? 'English'
                                    : data?.original_language == 'fr' ? 'Français'
                                        : data?.original_language == 'es' ? 'Spanish'
                                            : data?.original_language == 'hi' ? 'Hindi'
                                                : ''}
                            </div>
                        </div>
                    </div>

                    <div className='mt-10'>
                        <span className='text-2xl font-bold'>Overview</span>
                        <p className='mt-3 italic'>{data?.overview}</p>
                    </div>
                    <div className='flex justify-around mt-12'>
                        {data?.genres?.map((genre) => (
                            <Link key={genre.name} to="/" onClick={() => dispatch(selectGenreOrCategory(genre.id))}>
                                <div className='flex justify-center'>
                                    <img src={genreIcons[genre.name.toLowerCase()]} className='h-8 invert' />
                                </div>
                                <p className='text-xs sm:text-sm'>{genre?.name}</p>
                            </Link>
                        ))}
                    </div>
                    <VideoModal data={data} />
                </div>
            </div>
            <div className='w-full mt-6 mb-6 md:mt-10'>
                <h4 className='text-3xl lg:text-4xl font-extrabold text-white ml-8'>Top cast</h4>
            </div>
            <div className='grid-cards gap-x-4 2xl:gap-x-6 gap-y-4 text-white text-center'>

                {data && data?.credits?.cast?.map((character, i) => (
                    character.profile_path && (
                        <div key={i} className='mx-auto'>
                            <Link to={`/actor/${character.id}`}>
                                <img
                                    className='w-52 h-80 rounded-2xl hover:scale-105 duration-500'
                                    src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                                    alt={character.name}
                                />
                                <p className='font-semibold mt-2'>{character?.name}</p>
                                <p className='text-gray-500'>
                                    {character.character.split('/')[0]}
                                </p>
                            </Link>
                        </div>
                    )
                )).slice(0, 6)}
            </div>
            <div className='w-full mt-6 mb-6 md:mt-10'>
                <h4 className='text-3xl lg:text-4xl font-extrabold text-red-600 text-center'>You might also like</h4>
            </div>
            {
                recommendations
                    ? <MovieList movies={recommendations} numberOfMovies={12} />
                    : <div className='text-white'>Sorry, nothing was found.</div>
            }
        </div >
    )
}
