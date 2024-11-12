import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login'
import Cadastro from './cadastro'
import EsqueceuSenha from './esqueceusenha'
function routes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/cadastro" element={<Cadastro/>} />
        <Route path="/esqueceusenha" element={<EsqueceuSenha/>} />
      </Routes>
    </Router>
  );
}

export default routes;
