import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function EsqueceuSenha() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    funcional: "",
    nome: "",
    motivo: "",
  });

  const voltaTela = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendEmail = () => {
    const { funcional, nome, motivo } = formData;

    if (!funcional || !nome || !motivo) {
      alert("Preencha todos os campos!");
      return;
    }

    const defaultEmail = "pi.metro.troca.de.senha@gmail.com";
    const subject = "Recuperação de Senha";
    const body = `Funcionário: ${nome}\nFuncional: ${funcional}\nDesejo trocar minha senha pois: ${motivo}\n\n`;
    const emailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      defaultEmail
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(emailLink, "_blank");
  };

  return (
    <body style={{ overflow: "hidden" }}>
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
          <div className="top">
            <p className="esqueceuSenhaTexto">Redefinir a senha</p>
            <p>
              <TextField
                className="campoTexto"
                id="filled-basic"
                label="Funcional"
                name="funcional"
                value={formData.funcional}
                onChange={handleChange}
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
                label="Nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
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
                label="Motivo da Troca de Senha"
                name="motivo"
                value={formData.motivo}
                onChange={handleChange}
                variant="filled"
                multiline // Permite múltiplas linhas
                rows={3} // Número de linhas visíveis
                sx={{
                  "& .MuiFilledInput-root:before, & .MuiFilledInput-root:after":
                    {
                      display: "none",
                    },
                }}
              />
            </p>
            <p className="trocarSenhaTexto">
              O email será enviado ao supervisor para a troca da senha
            </p>
            <Button
              variant="contained"
              className="button"
              style={{
                backgroundColor: "#1027AF",
                color: "white",
                borderRadius: "8px",
                marginTop: "30px",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "darkblue")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#1027AF")
              }
              onClick={handleSendEmail}
            >
              Enviar
            </Button>
          </div>
        </div>
      </div>
    </body>
  );
}

export default EsqueceuSenha;
