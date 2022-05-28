import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import Obras from './components/Obras';
import Usuarios from './components/Usuarios';
import BuscaObras from './components/BuscaObras';
import BuscaUsuarios from './components/BuscaUsuarios';
import CadastroObra from './components/CadastroObra';
import CadastroUsuario from './components/CadastroUsuario';
import PageNotFound from './components/PageNotFound';
import LoginUsuario from './components/Login';

const App = () => {
    return (
        <Router>
            <NavigationBar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/obras" element={<Obras />} />
                <Route exact path="/obras/register" element={<CadastroObra />} />
                <Route exact path="/obras/search" element={<BuscaObras />} />
                <Route exact path="/usuarios" element={<Usuarios />} />
                <Route exact path="/usuarios/register" element={<CadastroUsuario />} />
                <Route exact path="/usuarios/search" element={<BuscaUsuarios />} />
                <Route exact path="/login" element={<LoginUsuario/>}/>
                <Route exact path="/404" element={<PageNotFound />} />
                <Route exact path="*" element={<Navigate replace to="/404" />} />
            </Routes>
        </Router>
    );
};

export default App;
