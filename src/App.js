import React from 'react';
import './App.css';
import Home from './pages/Home/Home';
import { Header } from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import { MovieDetail } from './pages/MovieDetail/MovieDetail';
import { PATH } from './constants/constants';

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path={PATH.home} element={<Home />} />
        <Route path={PATH.movieDetail} element={<MovieDetail/>}/>
      </Routes>
    </>
  );
}

export default App;
