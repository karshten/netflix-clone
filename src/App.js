import React from 'react';
import './App.css';
import Home from './pages/Home/Home';
import { Header } from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
