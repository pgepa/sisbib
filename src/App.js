import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import AuthService from './services/auth.service';

import NavigationBar from './components/NavigationBar';
import Home from './components/Home';
import ObrasDetalhadas from './components/ObrasDetalhadas';
import ObrasResumidas from './components/ObrasResumidas';
import Usuarios from './components/Usuarios';
import Emprestimos from './components/Emprestimos';
import BuscaObrasDetalhadas from './components/BuscaObrasDetalhadas';
import BuscaObrasResumidas from './components/BuscaObrasResumidas';
import BuscaUsuarios from './components/BuscaUsuarios';
import BuscaEmprestimos from './components/BuscaEmprestimos';
import CadastroObra from './components/CadastroObra';
import CadastroUsuario from './components/CadastroUsuario';
import CadastroEmprestimo from './components/CadastroEmprestimo';
import EditarObra from './components/EditarObra';
import EditarUsuario from './components/EditarUsuario';
import EditarEmprestimo from './components/EditarEmprestimo';
import PageNotFound from './components/PageNotFound';
import Login from './components/Login';

const App = () => {
  const [showAdmin, setShowAdmin] = useState(false);
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setShowAdmin(user.roles.includes('ROLE_ADMIN'));
    }
  },[]);
  return (
    <>
      <Router>
        <NavigationBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/obrasdetalhadas" element={<ObrasDetalhadas />} />
          <Route exact path="/obrasresumidas" element={<ObrasResumidas />} />
          <Route path="/obrasdetalhadas/register" element={<CadastroObra />} />
          <Route path="/obrasdetalhadas/search" element={<BuscaObrasDetalhadas />} />
          <Route path="/obrasresumidas/search" element={<BuscaObrasResumidas />} />
          <Route path="/obrasdetalhadas/edit/:id" element={<EditarObra />} />
          {showAdmin && (
            <Route exact path="/usuarios" element={<Usuarios />} />)}
          {showAdmin && (
            <Route path="/usuarios/register" element={<CadastroUsuario />} />)}
          {showAdmin && (
            <Route path="/usuarios/search" element={<BuscaUsuarios />} />)}
          {showAdmin && (
            <Route path="/usuarios/edit/:id" element={<EditarUsuario />} />)}
          {showAdmin && (
            <Route exact path="/emprestimos" element={<Emprestimos />} />)}
          {showAdmin && (
            <Route path="/emprestimos/register" element={<CadastroEmprestimo />} />)}
          {showAdmin && (
            <Route path="/emprestimos/search" element={<BuscaEmprestimos />} />)}
          {showAdmin && (
            <Route path="/emprestimos/edit/:id" element={<EditarEmprestimo />} />)}
          <Route path="/login" element={<Login />} />
          <Route path="/404" element={<PageNotFound />} />
          <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
