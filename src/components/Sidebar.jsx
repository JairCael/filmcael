import { useState } from 'react'
import { Link } from 'react-router-dom';

import { useGetGenresQuery } from '../services/TMDB'

import { ImSpinner3 } from "react-icons/im";

import genreIcons from '../assets/genres';
import { GrClose, GrMenu } from 'react-icons/gr';
import { useDispatch } from 'react-redux';
import { selectGenreOrCategory } from '../features/currentGenreOrCategory';

const Sidebar = () => {

    const dispatch = useDispatch();
    const { data, isFetching } = useGetGenresQuery();
    const [navBar, setNavBar] = useState(false);
    const [buttonPos, setButtonPos] = useState(true);

    const categories = [
        { label: 'Popular', value: 'popular' },
        { label: 'Top Rated', value: 'top_rated' },
        { label: 'Upcoming', value: 'upcoming' },
    ];

    const toggleButton = () => {
        setNavBar(!navBar);
        setButtonPos(!buttonPos);
    }

    return (
        <div className="fixed z-30 bg-[#070707]">
            <aside className={`w-56 ${navBar ? '' : '-ml-56'} duration-700 text-white`} aria-label="Sidebar">
                <div className="h-screen overflow-y-auto pb-4 px-3 relative">
                    <Link to="/">
                        <h1 className="text-center text-4xl mb-6 font-bold uppercase border-b border-gray-600 py-8 text-red-600">FilmCael</h1>
                    </Link>
                    <h3 className="mt-4 text-md font-medium ml-2 text-gray-300/90">Categories</h3>
                    <ul className="pt-4 space-y-2 font-normal">
                        {categories.map(({ label, value }) => (
                            <li key={value} onClick={() => dispatch(selectGenreOrCategory(value))}>
                                <Link key={value} to="/" className="flex items-center p-2 rounded-lg transition duration-500 w-full hover:bg-red-600">
                                    <img src={genreIcons[label.toLowerCase()]} className='w-8 invert' />
                                    <span className="ml-4">{label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <h3 className="mt-4 text-md font-medium ml-2 border-t border-gray-600 pt-6 text-gray-300/90">Genres</h3>
                    <ul className="pt-4 space-y-2 font-normal">
                        {isFetching ? (
                            <ImSpinner3 className='invert' />
                        )
                            : data?.genres?.map(({ id, name }) => (
                                <li key={id} onClick={() => dispatch(selectGenreOrCategory(id))}>
                                    <Link key={id} to="/" className="flex items-center p-2 rounded-lg transition duration-500 hover:bg-red-600">
                                        <img src={genreIcons[name.toLowerCase()]} className='w-8 invert' />
                                        <span className="ml-4">{name}</span>
                                    </Link>
                                </li>
                            ))}
                    </ul>
                </div>
            </aside >
            <button onClick={toggleButton} className={`lg:hidden px-2 py-1 bg-black rounded-sm border border-1 absolute top-0 ${buttonPos ? 'ml-56' : 'ml-0'} duration-700`}>
                {navBar ? <GrClose className='invert' /> : <GrMenu className='invert' />}
            </button>
        </div>
    )
}

export default Sidebar