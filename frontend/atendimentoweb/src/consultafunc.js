import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [funcional, setFuncional] = useState("");
  const [funcionario, setFuncionario] = useState(null);

  const voltaTela = () => {
    navigate("/admintela");
  };

  const buscarFuncionario = () => {
    if (!funcional.trim()) {
      alert("Por favor, insira a funcional do funcionário.");
      return;
    }

    fetch(`http://localhost:5000/get_func/${funcional}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Funcionário não encontrado.");
        }
        return response.json();
      })
      .then((data) => {
        setFuncionario(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar funcionário:", error);
        setFuncionario(null);
        alert("Funcionário não encontrado.");
      });
  };

  const excluirFuncionario = () => {
    if (!funcionario) {
      alert("Nenhum funcionário selecionado para exclusão.");
      return;
    }

    const confirmar = window.confirm(
      `Tem certeza que deseja excluir o funcionário ${funcionario.nome}?`
    );

    if (!confirmar) return;

    fetch(`http://localhost:5000/delete_func/${funcional}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao excluir funcionário.");
        }
        return response.json();
      })
      .then(() => {
        alert("Funcionário excluído com sucesso.");
        setFuncionario(null);
        setFuncional("");
      })
      .catch((error) => {
        console.error("Erro ao excluir funcionário:", error);
        alert("Erro ao excluir funcionário.");
      });
  };

  useEffect(() => {
    const mensagem = localStorage.getItem("cadastroSucesso");
    if (mensagem) {
      alert(mensagem);
      localStorage.removeItem("cadastroSucesso");
    }
  }, []);

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
            onClick={voltaTela}
          >
            Voltar
          </Button>
          <p className="funcSis">Funcionários no Sistema</p>

          <div className="top-consultaFunc">
            <div className="left-panel">
              <p className="buscarFuncTexto">Buscar Funcionário</p>
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
                onClick={buscarFuncionario}
              >
                Buscar
              </Button>
            </div>

            <div className="center-panel">
              <p className="textoCentroPainel">
                Nome: {funcionario ? funcionario.nome : ""}
              </p>
              <p className="textoCentroPainel">
                Funcional: {funcionario ? funcionario.funcional : ""}
              </p>
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
                  onClick={() => navigate("/cadastro")}
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
                  onClick={excluirFuncionario}
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
