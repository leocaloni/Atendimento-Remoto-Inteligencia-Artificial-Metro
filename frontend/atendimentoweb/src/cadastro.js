import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import {
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [funcional, setFuncional] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [cadastroErro, setCadastroErro] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const voltaTela = () => {
    navigate("/consultaFunc");
  };

  const handleChange = (event) => {
    setIsAdmin(event.target.value === "admin");
  };

  const cadastrarFuncionario = async () => {
    if (!nome || !funcional || !senha || !confirmarSenha) {
      setCadastroErro("Todos os campos são obrigatórios!");
      return;
    }

    if (senha !== confirmarSenha) {
      setCadastroErro("As senhas não coincidem!");
      return;
    }

    setCadastroErro("");

    const novoFuncionario = {
      nome,
      funcional,
      senha,
      isAdmin,
    };

    console.log("Dados do funcionário:", novoFuncionario);

    try {
      const response = await fetch("http://192.168.15.116:5000/register_func", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoFuncionario),
      });

      if (response.ok) {
        console.log("Funcionário cadastrado com sucesso");
        setMensagemSucesso("Funcionário cadastrado com sucesso!");

        localStorage.setItem(
          "cadastroSucesso",
          "Funcionário cadastrado com sucesso!"
        );

        navigate("/consultaFunc");
      } else {
        setCadastroErro("Erro ao cadastrar o funcionário");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setCadastroErro("Erro ao conectar ao servidor.");
    }
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
          <div className="top">
            <p
              style={{
                color: "white",
                fontSize: "60px",
                paddingRight: "14%",
                marginTop: "-80px",
              }}
            >
              Cadastro
            </p>

            <p>
              <TextField
                className="campoTexto"
                label="Nome"
                variant="filled"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
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

            <p>
              <TextField
                className="campoTexto"
                label="Confirmar senha"
                type="password"
                variant="filled"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                sx={{
                  "& .MuiFilledInput-root:before, & .MuiFilledInput-root:after":
                    {
                      display: "none",
                    },
                }}
              />
            </p>

            <FormControl
              component="fieldset"
              style={{ marginTop: "20px", color: "white" }}
            >
              <FormLabel
                component="legend"
                style={{
                  color: "white",
                  marginBottom: "10px",
                  marginLeft: "60px",
                }}
              >
                Tipo de Funcionário
              </FormLabel>
              <RadioGroup
                aria-label="admin"
                value={isAdmin ? "admin" : "notAdmin"}
                onChange={handleChange}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                <FormControlLabel
                  value="admin"
                  control={<Radio style={{ color: "#1E4CD4" }} />}
                  label="Admin"
                />
                <FormControlLabel
                  value="notAdmin"
                  control={<Radio style={{ color: "#1E4CD4" }} />}
                  label="Funcionário normal"
                />
              </RadioGroup>
            </FormControl>

            {cadastroErro && <p style={{ color: "red" }}>{cadastroErro}</p>}
            {mensagemSucesso && (
              <p style={{ color: "green" }}>{mensagemSucesso}</p>
            )}

            <Button
              variant="contained"
              className="button"
              style={{
                backgroundColor: "#1E4CD4",
                color: "white",
                borderRadius: "8px",
                marginTop: "20px",
              }}
              onClick={cadastrarFuncionario}
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
