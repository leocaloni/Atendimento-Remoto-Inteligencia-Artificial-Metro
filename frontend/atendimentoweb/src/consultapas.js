import React from "react";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const voltaTela = () => {
    navigate("/admintela");
  };

  return (
    <body>
      <div className="container">
        <div id="imagem">
          <img src="./image.png" alt="Imagem" />
        </div>

        <div className="content">
          <Button
            variant="contained"
            className="button"
            style={{
              backgroundColor: "#1E4CD4",
              color: "white",
              borderRadius: "8px",
              marginTop: "5px",
            }}
            onClick={voltaTela}
          >
            Voltar
          </Button>
          <p className="funcSis">Passageiros no Sistema</p>
          <div className="top-consultaFunc">
            <div className="left-panel">
              <p className="buscarFuncTexto">Buscar Passageiro</p>
              <TextField
                className="campoTexto"
                id="filled-basic"
                label="CPF"
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
              <p className="textoCentroPainel">CPF: </p>
              <p className="textoCentroPainel">Data de nascimento: </p>
              <p className="textoCentroPainel">Tipo de Gratuidade: </p>
            </div>

            <div className="right-panel-pas">
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
                  Exlcuir passageiro
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
