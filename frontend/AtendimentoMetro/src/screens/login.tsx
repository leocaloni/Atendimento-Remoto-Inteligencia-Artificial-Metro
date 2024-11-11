import { useEffect, useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  Platform,
} from "react-native";
import { style } from "../styles/styles";
import { StatusBar } from "expo-status-bar";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";

type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Camera: undefined;
  EsqueceuSenha: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

interface LoginProps {
  navigation: LoginScreenNavigationProp;
}

export default function Login({ navigation }: LoginProps) {
  const [funcional, setFuncional] = useState("");
  const [senha, setSenha] = useState("");
  const API_URL = process.env.API_URL ?? "http://192.168.15.116:5000";
  const [data, setData] = useState([{}]);
  const [showSenha, setShowSenha] = useState(false);
  const [loginErro, setLoginErro] = useState(""); // Estado para mensagem de erro

  useEffect(() => {
    fetch(`${API_URL}/register_func`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => console.log("Erro na requisição:", error));
  }, []);

  const toggleShowSenha = () => {
    setShowSenha(!showSenha);
  };

  const handleLogin = async () => {
    if (!funcional || !senha) {
      alert("Por favor, preencha ambos os campos de usuário e senha.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/login_func`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          funcional: funcional,
          senha,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login realizado com sucesso:", data);

        if (data.msg === "Funcionário autenticado com sucesso") {
          navigation.navigate("Cadastro");
        } else {
          setLoginErro("Usuário ou senha inválidos!");
        }
      } else {
        const errorData = await response.json();
        console.log("Erro na resposta do servidor:", errorData);

        // Verifica se a mensagem de erro retornada é específica para senha incorreta
        if (errorData.msg && errorData.msg.includes("Senha incorreta")) {
          setLoginErro(errorData.msg);
        }
        // Verifica se a mensagem de erro é sobre o usuário não estar cadastrado
        else if (errorData.msg && errorData.msg.includes("não encontrado")) {
          setLoginErro(
            `Funcionário do número ${funcional} não está cadastrado`
          );
        } else {
          setLoginErro("Erro ao comunicar com o servidor.");
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log("Erro na requisição:", error.message);
        alert("Erro na requisição: " + error.message);
      } else {
        console.log("Erro desconhecido:", error);
        alert("Erro desconhecido.");
      }
    }
  };

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={style.teste}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <StatusBar style="light" />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={style.teste1}>
            <Image
              style={style.image}
              source={require("../../assets/logo2.png")}
            />
          </View>
          <View style={style.background}>
            <View style={style.container}>
              <Text style={style.textoLogin}>Login</Text>
              <TextInput
                style={style.input}
                label="Funcional"
                value={funcional}
                onChangeText={(text) => setFuncional(text)}
              />
              <TextInput
                style={style.input}
                label="Senha"
                secureTextEntry={!showSenha}
                value={senha}
                onChangeText={(text) => setSenha(text)}
                right={
                  <TextInput.Icon
                    icon={showSenha ? "eye-off" : "eye"}
                    onPress={toggleShowSenha}
                  />
                }
              />
              <TouchableOpacity>
                <Text
                  style={style.esqueceuSenha}
                  onPress={() => navigation.navigate("EsqueceuSenha")}
                >
                  Esqueceu sua senha?
                </Text>
              </TouchableOpacity>
              {loginErro ? (
                <Text style={{ color: "red", marginBottom: 10 }}>
                  {loginErro}
                </Text>
              ) : null}
              <Button
                mode="contained"
                onPress={handleLogin}
                style={style.botao}
              >
                Entrar
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
