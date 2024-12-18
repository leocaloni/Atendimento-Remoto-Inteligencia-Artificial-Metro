import { useEffect, useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  Text,
  Platform,
  ScrollView,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { style } from "../styles/styles";
import { StatusBar } from "expo-status-bar";
import { TextInput, Button, TouchableRipple } from "react-native-paper";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePhoto } from "./PhotoContext";

type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Camera: undefined;
};

type CadastroScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Cadastro"
>;

interface CadastroProps {
  navigation: CadastroScreenNavigationProp;
}

function applyMaskCPF(value: string): string {
  const numericValue = value.replace(/\D/g, "").slice(0, 11);
  return numericValue
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function applyMaskDate(value: string): string {
  const numericValue = value.replace(/\D/g, "").slice(0, 8);
  return numericValue
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d{1,4})$/, "$1/$2");
}

function removeMaskCPF(value: string): string {
  return value ? value.replace(/\D/g, "") : ""; // Remove caracteres não numéricos, ou retorna uma string vazia
}


export default function Cadastro({ navigation }: CadastroProps) {
  const [nome, setNome] = useState("");
  const [cpf, setCPF] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [gratuidade, setGratuidade] = useState("");
  const screenHeight = Dimensions.get("window").height;
  const { capturedPhoto } = usePhoto();
  const API_URL = process.env.API_URL ?? "http://192.168.15.116:5000";

  useEffect(() => {
    console.log("Cadastro screen loaded");
    if (capturedPhoto?.base64) {
      console.log("Foto capturada");
    } else {
      console.log("Nenhuma foto capturada.");
    }
  }, [capturedPhoto]);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleCadastro = async () => {
    try {
      const cpfSemMascara = removeMaskCPF(cpf);
      const response = await fetch(`${API_URL}/register_passenger`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          cpf: cpfSemMascara,
          data_nascimento: nascimento,
          gratuidade,
          foto_base64: capturedPhoto?.base64 || "",
        }),
      });

      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        if (response.ok) {
          console.log("Cadastro realizado com sucesso:", data);
          alert("Cadastro realizado com sucesso!");
          navigation.navigate("Login");
        } else {
          console.log("Erro no cadastro:", data.msg);
          alert("Erro no cadastro: " + data.msg);
        }
      } else {
        const text = await response.text();
        console.log("Resposta inesperada do servidor:", text);
        alert(
          "Erro inesperado do servidor. Consulte o log para mais detalhes."
        );
      }
    } catch (error) {
      console.log("Erro na requisição:", error);
      alert("Erro na requisição: " + error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <StatusBar style="light" />
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={style.teste1}>
              <View style={style.teste1}>
                <Image
                  style={[style.image, { marginBottom: 10, marginTop: 10 }]}
                  source={require("../../assets/logo2.png")}
                />
              </View>
            </View>
            <View style={style.background}>
              <View style={style.container}>
                <View>
                  <Text style={[style.textoCadastro, { top: 10 }]}>
                    Cadastro
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: "#1027AF",
                    width: 65,
                    height: 65,
                    alignSelf: "flex-end",
                    borderRadius: 10,
                    flexDirection: "row",
                  }}
                >
                  <TouchableRipple
                    style={{ width: 65, height: 65 }}
                    onPress={() => navigation.navigate("Login")}
                    rippleColor="rgba(0, 0, 0, .32)"
                  >
                    <Ionicons
                      name="exit-sharp"
                      size={24}
                      color="white"
                      style={{ top: 20, alignSelf: "center", flex: 1 }}
                    />
                  </TouchableRipple>
                </View>
                <TextInput
                  style={style.input}
                  label="Nome"
                  value={nome}
                  onChangeText={(text) => setNome(text)}
                />
                <TextInput
                  style={style.input}
                  label="Data de nascimento"
                  value={nascimento}
                  onChangeText={(text) => setNascimento(applyMaskDate(text))}
                  keyboardType="numeric"
                />
                <TextInput
                  style={style.input}
                  label="CPF"
                  value={cpf}
                  onChangeText={(text) => setCPF(applyMaskCPF(text))}
                  keyboardType="numeric"
                />
                <TextInput
                  style={style.input}
                  label="Tipo de gratuidade"
                  value={gratuidade}
                  onChangeText={(text) => setGratuidade(text)}
                />
                <View
                  style={{
                    height: 150,
                    width: 350,
                    backgroundColor: "#1027AF",
                    alignSelf: "center",
                    marginBottom: 30,
                    marginTop: 30,
                    borderRadius: 15,
                  }}
                >
                  <TouchableRipple
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={() => navigation.navigate("Camera")}
                    rippleColor="rgba(0, 0, 0, .32)"
                  >
                    <Entypo name="camera" size={60} color="white" />
                  </TouchableRipple>
                </View>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                    padding: 10,
                  }}
                >
                  {capturedPhoto?.base64 ? (
                    <Image
                      source={{
                        uri: `data:image/jpg;base64,${capturedPhoto.base64}`,
                      }}
                      style={{ width: 100, height: 150 }}
                    />
                  ) : (
                    <Text></Text>
                  )}
                </View>
                <View style={{ width: "60%", alignSelf: "center" }}>
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      marginBottom: 30,
                    }}
                  >
                    Tire a foto do seu rosto olhando a para a câmera, de
                    preferência em um fundo branco
                  </Text>
                </View>
                <Button
                  mode="contained"
                  onPress={handleCadastro}
                  style={[style.botao]}
                >
                  Cadastrar
                </Button>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
