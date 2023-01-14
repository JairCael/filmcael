import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetActorQuery, useGetMoviesByActorIdQuery } from '../services/TMDB'
import { MovieList } from './MovieList'
import { Pagination } from './Pagination'

export const ActorInfo = () => {

    const { id } = useParams()
    const navigate = useNavigate();
    const [page, setPage] = useState(1)

    const { data } = useGetActorQuery(id);
    const { data: moviesByActor } = useGetMoviesByActorIdQuery({ id, page })

    return (
        <div className='pt-24 px-2'>
            <div className='bg-blue-500'>
                <button className='absolute top-12 right-6 lg:right-12 text-white font-bold w-24 p-1 rounded-md animate-pulse border border-red-600 hover:bg-red-600 duration-600' onClick={() => navigate(-1)}>Back</button>
            </div>
            <div className='grid grid-col lg:grid-cols-2'>

                <div className='relative'>
                    <div className='absolute top-0 right-0 bg-gradient-to-r from-transparent via-transparent to-[#070707] w-full h-[500px]' />
                    <div className='absolute top-0 right-0 bg-gradient-to-t from-transparent via-transparent to-[#070707] w-full h-[500px]' />
                    <div className='absolute top-0 right-0 bg-gradient-to-l from-transparent via-transparent to-[#070707] w-full h-[500px]' />
                    <div className='absolute top-0 right-0 bg-gradient-to-b from-transparent via-transparent to-[#070707] w-full h-[500px]' />
                    <img
                        src={`https://image.tmdb.org/t/p/original/${data?.profile_path}`}
                        className='w-full h-[500px] object-contain'
                    />
                </div>
                <div className='flex flex-col justify-center text-white p-5'>
                    <h3 className='text-4xl lg:text-5xl text-center font-bold text-red-600'>{data?.name}</h3>
                    <h3 className='text-2xl text-center font-bold text-gray-300 mt-4'>Born: {data?.birthday == null ? 'No found' : data?.birthday}</h3>

                    <div className='mt-10'>
                        <span className='text-xl lg:text-2xl font-bold'>Biography</span>
                        <p className='mt-3 italic'>{data?.biography == '' ? 'No biography found...' : data?.biography}</p>
                    </div>
                    <div className='flex justify-center text-center'>
                        <a href={`https://www.imdb.com/name/${data?.imdb_id}`} target='_blank' className="w-full md:w-64 mt-6 text-white font-bold p-2 bg-red-600 hover:bg-red-700 duration-500 rounded-lg">
                            IMDB - More info
                        </a>
                    </div>
                </div>
            </div>
            <div className='w-full mt-6 mb-6 md:mt-16'>
                <h4 className='text-3xl lg:text-4xl font-bold text-white text-center'>Movies</h4>
            </div>
            {moviesByActor
                ? (
                    <>
                        <MovieList movies={moviesByActor} numberOfMovies={12} />
                        <Pagination currentPage={page} setPage={setPage} totalPages={moviesByActor?.total_pages} />
                    </>
                )
                : <div className='text-white'>Sorry, nothing was found.</div>
            }
        </div>
    )
}
