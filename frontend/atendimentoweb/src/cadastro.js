import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const irAdm = () => {
    console.log("Navegando para /cadastro");
    navigate("/admintela");
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
              style={{
                backgroundColor: "#1027AF",
                color: "white",
                borderRadius: "8px",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "darkblue")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#1027AF")
              }
              onClick={irAdm}
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
