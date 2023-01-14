import React, { useState } from 'react'
import { GrSearch } from 'react-icons/gr';
import { useDispatch } from 'react-redux';
import { searchMovie } from '../features/currentGenreOrCategory';

export const SearchInput = () => {

    const dispatch = useDispatch();
    const [query, setQuery] = useState('');

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            dispatch(searchMovie(query));
        }
    };

    return (
        <div className='flex justify-end gap-x-6 items-center p-6 h-24 bg-[#070707]'>
            <GrSearch color='plain' className='text-xl invert' />
            <input
                type='search'
                className="bg-transparent text-white text-sm outline-none border-b-2 w-full md:w-96 border-[#494949] focus:border-red-600 duration-700"
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
            />
        </div>
    )
}
