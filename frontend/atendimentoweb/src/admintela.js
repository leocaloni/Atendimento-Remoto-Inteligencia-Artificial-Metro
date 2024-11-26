import React from "react";
import { Button } from "@material-ui/core";
import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const sair = () => {
    navigate("/login");
  };

  const irConsultaFunc = () => {
    console.log("Navegando para /cadastro");
    navigate("/consultaFunc");
  };
  const irConsultaPas = () => {
    console.log("Navegando para /cadastro");
    navigate("/consultapas");
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
            onClick={sair}
          >
            Sair
          </Button>
          <div className="top">
            <p className="admSis">Admiministração do Sistema</p>
            <div className="botoesAdm">
              <p className="botaoConsFunc">
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
                  onClick={irConsultaFunc}
                >
                  Consultar Funcionário
                </Button>
              </p>
              <p className="botaoConsPass">
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
                  onClick={irConsultaPas}
                >
                  Consultar Passageiro
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
