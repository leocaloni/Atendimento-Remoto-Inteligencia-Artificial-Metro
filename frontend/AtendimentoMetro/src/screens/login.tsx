import { useEffect, useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
  Platform,
  Keyboard,
} from "react-native";
import { style } from "../styles/styles";
import { StatusBar } from "expo-status-bar";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
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
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const API_URL = process.env.API_URL ?? "http://localhost:5000";
  const toggleShowSenha = () => {
    setShowSenha(!showSenha);
  };
  const screenHeight = Dimensions.get("window").height;
  const [showSenha, setShowSenha] = useState(false);

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
                label="Usuário"
                value={usuario}
                onChangeText={(text) => setUsuario(text)}
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
              <Button
                mode="contained"
                onPress={async () => {
                  try {
                    const response = await fetch(API_URL, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        usuario,
                        senha,
                      }),
                    });

                    const data = await response.json();
                    if (response.ok) {
                      console.log("Login realizado com sucesso:", data);
                      navigation.navigate("Cadastro");
                    } else {
                      console.log("Erro no login:", data.msg);
                    }
                  } catch (error) {
                    console.log("Erro na requisição:", error);
                  }
                }}
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
