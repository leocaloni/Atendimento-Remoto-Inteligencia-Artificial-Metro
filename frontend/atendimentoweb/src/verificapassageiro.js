import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const irCadastro = () => {
    console.log("Navegando para /cadastro");
    navigate("/cadastro");
  };

  return (
    <body>
      <div className="container">
        <div id="imagem">
          <img src="./image.png" alt="Imagem" />
        </div>

        <div className="content">
          <div className="top">
            <p className="login">Verificação de passageiro</p>
          </div>
        </div>
      </div>
    </body>
  );
}

export default App;
