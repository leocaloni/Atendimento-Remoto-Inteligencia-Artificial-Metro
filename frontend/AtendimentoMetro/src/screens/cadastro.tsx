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
} from "react-native";
import { style } from "../styles/styles";
import { StatusBar } from "expo-status-bar";
import { TextInput, Button, TouchableRipple } from "react-native-paper";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
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

export default function Cadastro({ navigation }: CadastroProps) {
  const [nome, setNome] = useState("");
  const [cpf, setCPF] = useState("");
  const [nascimento, setNascimento] = useState("");
  const [gratuidade, setGratuidade] = useState("");
  const screenHeight = Dimensions.get("window").height;
  const { capturedPhoto } = usePhoto();

  useEffect(() => {
    console.log("Cadastro screen loaded");
    if (capturedPhoto?.base64) {
      console.log("Imagem em Base64:", capturedPhoto.base64);
    } else {
      console.log("Nenhuma foto capturada.");
    }
  }, [capturedPhoto]);
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
            <View style={style.teste1}>
              <Image
                style={[style.image, { marginBottom: 10, marginTop: 10 }]}
                source={require("../../assets/logo2.png")}
              />
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              {capturedPhoto?.base64 ? (
                <Image
                  source={{
                    uri: `data:image/jpg;base64,${capturedPhoto.base64}`,
                  }}
                  style={{ width: 100, height: 100 }}
                />
              ) : (
                <Text>Nao tem foto ainda</Text>
              )}
            </View>
          </View>
          <View style={style.background}>
            <View style={style.container}>
              <View>
                <Text style={style.textoCadastro}>Cadastro</Text>
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
                onChangeText={(text) => setNascimento(text)}
              />
              <TextInput
                style={style.input}
                label="CPF"
                value={cpf}
                onChangeText={(text) => setCPF(text)}
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
                onPress={async () => {
                  try {
                    const response = await fetch(
                      "http://localhost/register_passenger",
                      {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          nome,
                          cpf,
                          data_nascimento: nascimento,
                          gratuidade,
                          foto_base64: capturedPhoto?.base64 || "",
                        }),
                      }
                    );

                    const data = await response.json();
                    if (response.ok) {
                      console.log("Cadastro realizado com sucesso:", data);
                    } else {
                      console.log("Erro no cadastro:", data.msg);
                    }
                  } catch (error) {
                    console.log("Erro na requisição:", error);
                  }
                }}
                style={style.botao}
              >
                Cadastrar
              </Button>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
