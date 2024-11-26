import React, { useState } from "react";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [cpf, setCpf] = useState("");
  const [passageiro, setPassageiro] = useState(null);
  const [loading, setLoading] = useState(false);

  const voltaTela = () => {
    navigate("/admintela");
  };

  const buscarPassageiro = () => {
    if (!cpf.trim()) {
      alert("Por favor, insira o CPF do passageiro.");
      return;
    }

    fetch(`http://localhost:5000/get_passenger/${cpf}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Passageiro não encontrado.");
        }
        return response.json();
      })
      .then((data) => {
        setPassageiro(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar passageiro:", error);
        setPassageiro(null);
        alert("Passageiro não encontrado.");
      });
  };

  const excluirPassageiro = () => {
    if (!passageiro) {
      alert("Nenhum passageiro selecionado para exclusão.");
      return;
    }

    const confirmar = window.confirm(
      `Tem certeza que deseja excluir o passageiro ${passageiro.nome}?`
    );

    if (!confirmar) return;

    setLoading(true); // Inicia o carregamento

    fetch(`http://localhost:5000/delete_passenger/${cpf}`, {
      method: "DELETE",
    })
      .then((response) => {
        setLoading(false); // Finaliza o carregamento
        if (!response.ok) {
          throw new Error("Erro ao excluir passageiro.");
        }
        alert("Passageiro excluído com sucesso.");
        setPassageiro(null);
        setCpf("");
      })
      .catch((error) => {
        setLoading(false); // Finaliza o carregamento
        console.error("Erro ao excluir passageiro:", error);
        alert("Erro ao excluir passageiro.");
      });
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
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
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
                onClick={buscarPassageiro}
              >
                Buscar
              </Button>
            </div>

            <div className="center-panel-pas">
              <div className="center-panel-top">
                {passageiro && passageiro.foto_base64 && (
                  <img
                    src={`data:image/png;base64,${passageiro.foto_base64}`}
                    alt="Foto do Passageiro"
                    className="fotoPassageiro"
                  />
                )}
              </div>

              <div className="center-panel-bottom">
                {passageiro ? (
                  <>
                    <p className="textoCentroPainel">
                      <span className="campoInfo">Nome:</span> {passageiro.nome}
                    </p>
                    <p className="textoCentroPainel">
                      <span className="campoInfo">CPF:</span> {passageiro.cpf}
                    </p>
                    <p className="textoCentroPainel">
                      <span className="campoInfo">Data de nascimento:</span>{" "}
                      {passageiro.data_nascimento}
                    </p>
                    <p className="textoCentroPainel">
                      <span className="campoInfo">Tipo de Gratuidade:</span>{" "}
                      {passageiro.gratuidade}
                    </p>
                  </>
                ) : (
                  <p className="textoCentroPainel">
                    <p>
                      <span className="campoInfo">Nome:</span>
                    </p>
                    <p>
                      <span className="campoInfo">CPF:</span>
                    </p>
                    <p>
                      <span className="campoInfo">Data de nascimento:</span>
                    </p>
                    <p>
                      <span className="campoInfo">Tipo de Gratuidade:</span>
                    </p>
                  </p>
                )}
              </div>
            </div>

            <div className="right-panel-pas">
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
                onClick={excluirPassageiro}
                disabled={loading} // Desativa botão enquanto exclui
              >
                {loading ? "Excluindo..." : "Excluir passageiro atual"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default App;
