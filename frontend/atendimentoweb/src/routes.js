import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login";
import Cadastro from "./cadastro";
import EsqueceuSenha from "./esqueceusenha";
import AdminTela from "./admintela";
import ConsultaFunc from "./consultafunc";
import ConsultaPas from "./consultapas";
import VerificaPas from "./verificapassageiro";
function routes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/esqueceusenha" element={<EsqueceuSenha />} />
        <Route path="/admintela" element={<AdminTela />} />
        <Route path="/consultaFunc" element={<ConsultaFunc />} />
        <Route path="/consultaPas" element={<ConsultaPas />} />
        <Route path="/verificaPas" element={<VerificaPas />} />
      </Routes>
    </Router>
  );
}

export default routes;
