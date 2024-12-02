import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [cpf, setCpf] = useState("");
  const [passageiro, setPassageiro] = useState(null);
  const [erro, setErro] = useState("");
  const [unknownFace, setUnknownFace] = useState(null);

  const sair = () => {
    navigate("/");
  };

  const fetchUnknownFace = () => {
    fetch("http://localhost:5000/get_unknown_face")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar rosto desconhecido.");
        }
        return response.json();
      })
      .then((data) => {
        setUnknownFace(`data:image/jpeg;base64,${data.foto_base64}`);
      })
      .catch((error) => {
        console.error("Erro ao carregar rosto desconhecido:", error);
      });
  };
  useEffect(() => {
    fetchUnknownFace();
  }, []);

  setInterval(fetchUnknownFace, 10000);

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
        setErro("");
      })
      .catch((error) => {
        console.error("Erro ao buscar passageiro:", error);
        setPassageiro(null);
        setErro("Passageiro não encontrado.");
      });
  };

  return (
    <body>
      <div className="container-verifica">
        <div id="imagem">
          <img src="./image.png" alt="Imagem" />
        </div>

        <div className="content-verifica">
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
          <p className="titulo-verifica">Verificação de passageiro</p>

          <div className="top-verifica">
            <div className="left-panel-verifica">
              {unknownFace ? (
                <img
                  src={unknownFace}
                  alt="Rosto Desconhecido"
                  className="rosto-desconhecido"
                />
              ) : (
                <p></p>
              )}
            </div>

            <div className="center-panel-verifica">
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
              {erro && <p style={{ color: "red" }}>{erro}</p>}
            </div>

            <div className="right-panel-verifica">
              <p className="foto-banco-texto">Foto do banco de dados</p>
              {passageiro && passageiro.foto_base64 ? (
                <>
                  <img
                    src={`data:image/png;base64,${passageiro.foto_base64}`}
                    alt="Foto do Passageiro"
                    className="fotoPassageiroVerifica"
                  />
                  <p className="textoNome">
                    <span className="campoInfo">Nome:</span> {passageiro.nome}
                  </p>
                </>
              ) : (
                <>
                  <div className="fotoPassageiro-placeholder"></div>
                  <p className="textoNome">
                    <span className="campoInfo"></span>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default App;
