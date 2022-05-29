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
import EditarObra from './components/EditarObra';
import EditarUsuario from './components/EditarUsuario';
import PageNotFound from './components/PageNotFound';
import LoginUsuario from './components/Login';

const App = () => {
    return (
        <>
            <Router>
                <NavigationBar />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/obras" element={<Obras />} />
                    <Route path="/obras/register" element={<CadastroObra />} />
                    <Route path="/obras/search" element={<BuscaObras />} />
                    <Route path="/obras/:id" element={<EditarObra />} />
                    <Route exact path="/usuarios" element={<Usuarios />} />
                    <Route path="/usuarios/register" element={<CadastroUsuario />} />
                    <Route path="/usuarios/search" element={<BuscaUsuarios />} />
                    <Route path="/usuarios/:id" element={<EditarUsuario />} />
                    <Route path="/login" element={<LoginUsuario/>} />
                    <Route path="/404" element={<PageNotFound />} />
                    <Route path="*" element={<Navigate replace to="/404" />} />
                </Routes>
            </Router>        
        </>
    );
};

export default App;
