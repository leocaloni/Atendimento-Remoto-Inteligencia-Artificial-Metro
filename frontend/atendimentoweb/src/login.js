import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [funcional, setFuncional] = useState("");
  const [senha, setSenha] = useState("");
  const [loginErro, setLoginErro] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.15.9:5000/login_func", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ funcional, senha }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.isAdmin) {
          navigate("/admintela");
        } else {
          navigate("/verificaPas");
        }
      } else {
        const errorData = await response.json();
        setLoginErro(errorData.msg || "Erro ao autenticar.");
      }
    } catch (error) {
      setLoginErro("Erro ao conectar ao servidor.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <body onKeyPress={handleKeyPress}>
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
                value={funcional}
                onChange={(e) => setFuncional(e.target.value)}
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
                type="password"
                variant="filled"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
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
              {loginErro && <p style={{ color: "red" }}>{loginErro}</p>}
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
              onClick={handleLogin}
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
