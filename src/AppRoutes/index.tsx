import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Signup } from '../pages/Signup';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />}/>
                <Route path='/signup' element={<Signup />}/>
                <Route path='/home' element={<Home />} />
                <Route path='*' element={<h1>404 Not found</h1>}/>
            </Routes>
        </BrowserRouter>
    )
};

export { AppRoutes };