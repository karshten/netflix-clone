import React from 'react';
import './App.css';
import Home from './pages/Home/Home';
import { Header } from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import { MovieDetail } from './pages/MovieDetail/MovieDetail';
import { PATH } from './constants/constants';
import { Movies } from './pages/Movies/Movies';
import { Guest } from './pages/Guest/Guest';
import { Login } from './pages/Login/Login';
import { SignUp } from './pages/SignUp/SignUp';
import { useUser } from './helpers/getUser';
import { NotFound } from './pages/NotFound/NotFound';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';

function App() {
  useUser();

  return (
    <>
      <Header/>
      <Routes>
        <Route path={PATH.guest} element={<Guest/>}/>
        <Route path={PATH.login} element={<Login/>}/>
        <Route path={PATH.signUp} element={<SignUp/>}/>
        
        <Route path={PATH.home} element={
          <PrivateRoute>
            <Home/>
          </PrivateRoute>
        }/>

        <Route path={PATH.movieDetail} element={
          <PrivateRoute>
            <MovieDetail/>
          </PrivateRoute>
        }/>
        
        <Route path={PATH.movies} element={
          <PrivateRoute>
            <Movies/>
          </PrivateRoute>
        }/>

        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
  );
}

export default App;
