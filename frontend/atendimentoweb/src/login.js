import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import "./App.css";
import { useNavigate } from "react-router-dom";

function Login() {
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
            <a href="./esqueceusenha">
              <p className="esqueceuSenha">Esqueceu sua senha</p>
            </a>
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
              onClick={irCadastro}
            >
              Entrar
            </Button>
          </div>
        </div>
      </div>
    </body>
  );
}

export default Login;
