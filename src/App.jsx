
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ActorInfo } from './components/ActorInfo';
import { MovieInfo } from './components/MovieInfo';
import { Movies } from './components/Movies';

import Sidebar from './components/Sidebar';

function App() {

  useEffect(() => {
    window.process = {
      ...window.process,
    };
  }, []);

  return (
    <>
      <Sidebar />
      <div className='lg:ml-56'>
        <Routes>
          <Route exact path='/' element={<Movies />} />
          <Route exact path="/movie/:id" element={<MovieInfo />} />
          <Route exact path="/actor/:id" element={<ActorInfo />} />
        </Routes>
      </div>
    </>

  )
}

export default App
