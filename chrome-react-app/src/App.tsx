import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Register from './components/Register';
import Home from './components/Home';
import Login from './components/Login';

function App() {
  return (
    <>
     <Nav></Nav>
      <Routes>
        <Route path='/' element={ <Home/> }></Route>
        <Route path='/register' element={ <Register/> }></Route>
        <Route path='/login' element={ <Login/> }></Route>
      </Routes>
    </>
  );
}

export default App;