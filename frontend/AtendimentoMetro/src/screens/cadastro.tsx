import { useState } from "react";
import { View, KeyboardAvoidingView, Image, TouchableOpacity, Text, Platform, ScrollView, Dimensions } from "react-native";
import { style } from '../styles/styles';
import { StatusBar } from 'expo-status-bar';
import { TextInput, Button, TouchableRipple } from 'react-native-paper';
import Entypo from '@expo/vector-icons/Entypo';

export default function App(){
    const [nome, setNome] = useState("");
    const [cpf, setCPF] = useState("");
    const [nascimento, setNascimento] = useState("");
    const [gratuidade, setGratuidade] = useState("");
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
                        Cadastro
                    </Text>
                </View>
                <TextInput style={style.input}
                    label="Nome"
                    value={nome}
                    onChangeText={text => setNome(text)}
                />
                <TextInput style={style.input}
                    label="Data de nascimento"
                    value={nascimento}
                    onChangeText={text => setNascimento(text)}
                />
                <TextInput style={style.input}
                    label="CPF"
                    value={cpf}
                    onChangeText={text => setCPF(text)}
                />
                <TextInput style={style.input}
                    label="Tipo de gratuidade"
                    value={gratuidade}
                    onChangeText={text => setGratuidade(text)}
                />
                <View style={{height:150, width:350, backgroundColor:'#1027AF', alignSelf: 'center',marginBottom: 30, marginTop: 30, borderRadius: 15}}>
                <TouchableRipple style={{flex:1, justifyContent: 'center', alignItems: 'center'}}
                    onPress={() => console.log('Pressed')}
                    rippleColor="rgba(0, 0, 0, .32)"
                >
                    <Entypo name="camera" size={60} color="black"/>
                    
                </TouchableRipple>
                </View>
                <View style={{width:'60%',alignSelf:'center'}}>
                    <Text style={{textAlign:'center', color:'white', marginBottom: 30}}>
                    Tire a foto do seu rosto olhando a para a câmera, de preferência em um fundo branco 
                    </Text>
                </View>
                <Button mode="contained" onPress={() => console.log('pressed')} style = {style.botao}>
                    Cadastrar
                </Button>

            </View>
        </View>
    </ScrollView>
        </KeyboardAvoidingView>
    );
}