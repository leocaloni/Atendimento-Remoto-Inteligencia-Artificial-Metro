import { useEffect, useState } from 'react';
import { View, KeyboardAvoidingView, Image, TouchableOpacity, Text, ScrollView, Dimensions, Platform, Keyboard } from 'react-native';
import { style } from '../styles/styles';
import { StatusBar } from 'expo-status-bar';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routes';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function App(){
    const [usuario, setUsuario] = useState("");
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const screenHeight = Dimensions.get('window').height;
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            console.log('Teclado mostrado');
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            console.log('Teclado escondido');
        });

        // Limpeza ao desmontar
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);
    
    return (
        <KeyboardAvoidingView 
        style={style.teste}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 50}
    >
        <StatusBar style="light" />
        <ScrollView contentContainerStyle={{ flexGrow: 1, height:screenHeight }}>
        <View style = {style.teste1}>
        <Image style={style.image}
                source={require('../../assets/logo2.png')}
        />
        </View>
        <View style={style.background}>
            <View style = {style.container}>
                <View>
                    <Text style={style.textoLogin}>
                        Login
                    </Text>
                </View>
                <TextInput style={style.input}
                    label="Usuário"
                    value={usuario}
                    onChangeText={text => setUsuario(text)}
                />
                <TextInput style={style.input}
                    label="Senha"
                    secureTextEntry
                    right={<TextInput.Icon icon="eye" />}
                    />
                <TouchableOpacity>
                    <Text style={style.esqueceuSenha}>
                        Esqueceu sua senha?
                    </Text>
                </TouchableOpacity>
                <Button mode="contained" onPress={() => navigation.navigate('Cadastro')} style = {style.botao}>
                    Entrar
                </Button>
            </View>
        </View>
    </ScrollView>
        </KeyboardAvoidingView>
    );
}