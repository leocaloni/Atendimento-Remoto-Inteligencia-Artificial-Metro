import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import "./App.css";
import { green } from "@material-ui/core/colors";

function MetroWeb() {
  return (
    <body>
      <div className="container">
        <div id="imagem">
          <img src="./image.png" alt="Imagem" />
        </div>

        <div className="content">
          <div className="top">
            <p className="login">Login</p>
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
            <a href="#">
              <p className="esqueceuSenha">Esqueceu sua senha</p>
            </a>
            <Button
              variant="contained"
              className="button"
              sx={{
                backgroundColor: "#1027AF", // Define a cor de fundo
                "&:hover": {
                  backgroundColor: "darkblue", // Define a cor ao passar o mouse
                },
              }}
            >
              Entrar
            </Button>
          </div>
        </div>
      </div>
    </body>
  );
}

export default MetroWeb;
