import {useState} from 'react';
import {View, KeyboardAvoidingView, Image, TouchableOpacity, Text, Platform, ScrollView, Dimensions} from 'react-native';
import { style } from '../styles/styles';
import { StatusBar } from 'expo-status-bar';
import { TextInput, Button } from 'react-native-paper';

export default function App(){
    const [usuario, setUsuario] = useState("");
    const screenHeight = Dimensions.get('window').height;
    return (
    <KeyboardAvoidingView style= {style.teste}>
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
                    label="Password"
                    secureTextEntry
                    right={<TextInput.Icon icon="eye" />}
                    />
                <TouchableOpacity>
                    <Text style={style.esqueceuSenha}>
                        Esqueceu sua senha?
                    </Text>
                </TouchableOpacity>
                <Button mode="contained" onPress={() => console.log('Pressed')} style = {style.botao}>
                    Entrar
                </Button>
            </View>
        </View>
    </ScrollView>
        </KeyboardAvoidingView>
    );
}