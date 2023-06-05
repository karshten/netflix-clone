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
import { PrivateRoute } from './components/PrivateRoute';
import { useSelector } from 'react-redux';

function App() {
  useUser();
  const {user} = useSelector(state => state.auth);

  return (
    <>
      <Header/>
      <Routes>
        <Route path={PATH.guest} element={
          <PrivateRoute condition={!user} navigatePath={PATH.home}>
            <Guest/>
          </PrivateRoute>
        }/>

        <Route path={PATH.login} element={
          <PrivateRoute condition={!user} navigatePath={PATH.home}>
            <Login/>
          </PrivateRoute>
        }/>

        <Route path={PATH.signUp} element={
          <PrivateRoute condition={!user} navigatePath={PATH.home}>
            <SignUp/>
          </PrivateRoute>
        }/>


        <Route path={PATH.home} element={
          <PrivateRoute condition={user} navigatePath={PATH.guest}>
            <Home/>
          </PrivateRoute>
        }/>

        <Route path={PATH.movieDetail} element={
          <PrivateRoute condition={user} navigatePath={PATH.guest}>
            <MovieDetail/>
          </PrivateRoute>
        }/>
        
        <Route path={PATH.movies} element={
          <PrivateRoute condition={user} navigatePath={PATH.guest}>
            <Movies/>
          </PrivateRoute>
        }/>

        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
  );
}

export default App;
