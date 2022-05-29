import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import Obras from './components/Obras';
import Usuarios from './components/Usuarios';
import Emprestimos from './components/Emprestimos';
import BuscaObras from './components/BuscaObras';
import BuscaUsuarios from './components/BuscaUsuarios';
import BuscaEmprestimos from './components/BuscaEmprestimos';
import CadastroObra from './components/CadastroObra';
import CadastroUsuario from './components/CadastroUsuario';
import CadastroEmprestimo from './components/CadastroEmprestimo';
import EditarObra from './components/EditarObra';
import EditarUsuario from './components/EditarUsuario';
import EditarEmprestimo from './components/EditarEmprestimo';
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
                    <Route path="/obras/edit/:id" element={<EditarObra />} />
                    <Route exact path="/usuarios" element={<Usuarios />} />
                    <Route path="/usuarios/register" element={<CadastroUsuario />} />
                    <Route path="/usuarios/search" element={<BuscaUsuarios />} />
                    <Route path="/usuarios/edit/:id" element={<EditarUsuario />} />
                    <Route exact path="/emprestimos" element={<Emprestimos />} />
                    <Route path="/emprestimos/register" element={<CadastroEmprestimo />} />
                    <Route path="/emprestimos/search" element={<BuscaEmprestimos />} />
                    <Route path="/emprestimos/edit/:id" element={<EditarEmprestimo />} />
                    <Route path="/login" element={<LoginUsuario/>} />
                    <Route path="/404" element={<PageNotFound />} />
                    <Route path="*" element={<Navigate replace to="/404" />} />
                </Routes>
            </Router>        
        </>
    );
};

export default App;
