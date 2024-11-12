import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import "./App.css";
import { useNavigate } from "react-router-dom";

function EsqueceuSenha() {
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
            <p className="esqueceuSenhaTexto">Esqueceu sua senha</p>
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
              Enviar
            </Button>
          </div>
        </div>
      </div>
    </body>
  );
}

export default EsqueceuSenha;
