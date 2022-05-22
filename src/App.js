import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import Obras from './components/Obras';
import Usuarios from './components/Usuarios';
import PageNotFound from './components/PageNotFound';

const App = () => {
    return (
        <Router>
            <NavigationBar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/obras" element={<Obras />} />
                <Route exact path="/usuarios" element={<Usuarios />} />
                <Route exact path="/404" element={<PageNotFound />} />
                <Route exact path="*" element={<Navigate replace to="/404" />} />
            </Routes>
        </Router>
    );
};

export default App;
