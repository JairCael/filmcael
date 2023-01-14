import React from 'react'
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

export const Pagination = ({ currentPage, setPage, totalPages }) => {

    const handlePrev = () => {
        if (currentPage !== 1) { setPage((prevPage) => prevPage - 1); }
    };
    const handleNext = () => {
        if (currentPage !== totalPages) { setPage((prevPage) => prevPage + 1); }
    };

    if (totalPages === 0) return null;

    return (
        <div className='flex w-full justify-center items-center mb-6'>
            <button onClick={handlePrev} className='p-2 bg-red-600 rounded-full hover:bg-red-700 duration-300'><GrLinkPrevious className='text-xl invert' /></button>
            <label className='text-white text-2xl mx-4'>{currentPage}</label>
            <button onClick={handleNext} className='p-2 bg-red-600 rounded-full hover:bg-red-700 duration-300'><GrLinkNext className='text-xl invert' /></button>
        </div>
    )
}
