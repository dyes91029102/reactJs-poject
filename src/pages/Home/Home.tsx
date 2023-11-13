import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';


interface HomeProps { }

const Home: FC<HomeProps> = () => (
  <div className='columns-4'>
    <div className='w-full border-solid border-2 border-black rounded bg-blue-100 h-56 '>
      <NavLink  className='w-full h-full flex items-center justify-center' to={`/main/greenhouse`}>溫盤</NavLink>

    </div>
    <div className='w-full border-solid border-2 border-black rounded bg-blue-200 h-56 '>

      <NavLink  className='w-full h-full flex items-center justify-center' to={`/main/carbon`}>碳排</NavLink>
    </div>
    <div className='w-full border-solid border-2 border-black rounded bg-blue-300 h-56 '>
      <NavLink  className='w-full h-full flex items-center justify-center' to={'/main/greenhouse'}>永續</NavLink>
    </div>
    <div className='w-full border-solid border-2 border-black rounded bg-blue-400 h-56 '>
      <NavLink className='w-full h-full flex items-center justify-center' to={'/main/greenhouse'}>問卷</NavLink>
    </div>
  </div>
);

export default Home;
