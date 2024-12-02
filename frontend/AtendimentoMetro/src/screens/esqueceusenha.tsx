import { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  Image,
  Text,
  ScrollView,
  Platform,
  Linking,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { style } from "../styles/styles";
import { StatusBar } from "expo-status-bar";
import { TextInput, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EsqueceuSenha({ navigation }: any) {
  const [nome, setNome] = useState("");
  const [funcional, setFuncional] = useState("");
  const [motivo, setMotivo] = useState("");

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const enviarEmail = () => {
    if (!nome || !funcional || !motivo) {
      alert("Por favor, preencha todos os campos antes de continuar.");
      return;
    }

    const assunto = "Recuperação de Senha";
    const mensagem = `Funcionário: ${nome}\nFuncional: ${funcional}\nMotivo da troca: ${motivo}`;
    const email = "pi.metro.troca.de.senha@gmail.com";
    const mailtoURL = `mailto:${email}?subject=${encodeURIComponent(
      assunto
    )}&body=${encodeURIComponent(mensagem)}`;

    Linking.openURL(mailtoURL).catch((err) =>
      console.error("Erro ao tentar abrir o cliente de e-mail:", err)
    );
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
              <Image
                style={style.image}
                source={require("../../assets/logo2.png")}
              />
            </View>
            <View style={style.background}>
              <View style={style.container}>
                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      style.textoRedefinirSenha,
                      { marginTop: 30, top: 10 },
                    ]}
                  >
                    Redefinir Senha
                  </Text>
                </View>
                <View style={{ flex: 1, alignContent: "center", bottom: 20 }}>
                  <TextInput
                    style={[style.input, { bottom: 25 }]}
                    label="Nome"
                    value={nome}
                    onChangeText={(text) => setNome(text)}
                  />
                  <TextInput
                    style={[style.input, { bottom: 25 }]}
                    label="Funcional"
                    value={funcional}
                    onChangeText={(text) => setFuncional(text)}
                  />
                  <TextInput
                    style={[style.input, { bottom: 25 }]}
                    label="Motivo da troca"
                    value={motivo}
                    onChangeText={(text) => setMotivo(text)}
                  />
                  <Text
                    style={[
                      {
                        color: "white",
                        marginBottom: 30,
                        textAlign: "justify",
                      },
                    ]}
                  >
                    Um e-mail será enviado ao supervisor para a troca de senha.
                  </Text>
                  <Button
                    mode="contained"
                    onPress={enviarEmail}
                    style={[style.botao]}
                  >
                    Continuar
                  </Button>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
