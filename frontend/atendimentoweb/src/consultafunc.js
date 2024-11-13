import React from "react";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <body>
      <div className="container">
        <div id="imagem">
          <img src="./image.png" alt="Imagem" />
        </div>

        <div className="content">
          <p className="funcSis">Funcionários no Sistema</p>
          <div className="top-consultaFunc">
            <div className="left-panel">
              <p className="buscarFuncTexto">Buscar Funcionário</p>
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
              <Button
                variant="contained"
                className="botao-buscarFunc"
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
                onClick={() => console.log("aperto")}
              >
                Buscar
              </Button>
            </div>

            <div className="center-panel">
              <p className="textoCentroPainel">Nome: </p>
              <p className="textoCentroPainel">Funcional: </p>
            </div>

            <div className="right-panel">
              <p>
                <Button
                  variant="contained"
                  className="botao-opcaoFunc"
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
                  onClick={() => console.log("aperto")}
                >
                  Cadastrar novo funcionário
                </Button>
              </p>
              <p>
                <Button
                  variant="contained"
                  className="botao-opcaoFunc"
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
                  onClick={() => console.log("aperto")}
                >
                  Excluir funcionário atual
                </Button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default App;
