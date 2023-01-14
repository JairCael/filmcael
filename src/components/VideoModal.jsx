import React, { useState } from 'react'
import { BiVideoPlus } from "react-icons/bi";

export const VideoModal = ({ data }) => {
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
        <div className='-mt-10'>
            <button onClick={toggleModal} className="btn-modal w-full md:w-64 text-white font-bold px-6 bg-red-600 hover:bg-red-700 duration-500 rounded-lg">
                <div className='flex h-8 justify-center items-center gap-x-4 text-xl md:text-2xl'>
                    <BiVideoPlus />
                    <p>Watch Trailer</p>
                </div>
            </button>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content w-10/12 lg:w-6/12 text-white">
                        {data?.videos?.results?.length > 0 && (
                            <iframe
                                autoPlay
                                className='w-full h-96'
                                frameBorder="0"
                                title="Trailer"
                                src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
                                allow="autoplay"
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
