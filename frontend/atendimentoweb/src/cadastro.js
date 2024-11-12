import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cadastro from './cadastro'

function App() {
  const navigate = useNavigate();

  const irCadastro = () => {
    console.log("Navegando para /cadastro");
    navigate('/cadastro');
  };

  return (
    <body>
      <div className="container">
        <div id="imagem">
          <img src="./image.png" alt="Imagem" />
        </div>

        <div className="content">
          <div className="top">
            <p className="login">Cadastro</p>
            <p>
              <TextField
                className="campoTexto"
                id="filled-basic"
                label="Nome"
                variant="filled"
                sx={{
                  "& .MuiFilledInput-root:before, & .MuiFilledInput-root:after":
                    {
                      display: "none",
                    },
                }}
              />
            </p>
            <p>
              <TextField
                className="campoTexto"
                id="filled-basic"
                label="Funcional"
                variant="filled"
                sx={{
                  "& .MuiFilledInput-root:before, & .MuiFilledInput-root:after":
                    {
                      display: "none",
                    },
                }}
              />
            </p>
            <p>
              <TextField
                className="campoTexto"
                id="filled-basic"
                label="Senha"
                variant="filled"
                sx={{
                  "& .MuiFilledInput-root:before, & .MuiFilledInput-root:after":
                    {
                      display: "none",
                    },
                }}
              />
            </p>
            <p>
              <TextField
                className="campoTexto"
                id="filled-basic"
                label="Confirmar senha"
                variant="filled"
                sx={{
                  "& .MuiFilledInput-root:before, & .MuiFilledInput-root:after":
                    {
                      display: "none",
                    },
                }}
              />
            </p>
            <Button
              variant="contained"
              className="button"
              sx={{
                backgroundColor: "#1027AF", // Define a cor de fundo
                "&:hover": {
                  backgroundColor: "darkblue", // Define a cor ao passar o mouse
                },
              }}
              onClick={console.log("teste")}
            >
              Cadastrar
            </Button>
          </div>
        </div>
      </div>
    </body>
  );
}

export default App;
