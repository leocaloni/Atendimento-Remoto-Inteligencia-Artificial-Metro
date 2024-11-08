import { useEffect, useState } from 'react';
import { View, KeyboardAvoidingView, Image, TouchableOpacity, Text, ScrollView, Dimensions, Platform, Keyboard } from 'react-native';
import { style } from '../styles/styles';
import { StatusBar } from 'expo-status-bar';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView } from 'react-native-safe-area-context';

type RootStackParamList = {
    Login: undefined;
    Cadastro: undefined;
    Camera: undefined;
    EsqueceuSenha: undefined;
};

type EsqueceuSenhaScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'EsqueceuSenha'
>;

interface LoginProps {
    navigation: EsqueceuSenhaScreenNavigationProp;
}

export default function Login({navigation}:LoginProps) {
    const [email, setEmail] = useState("");
    const screenHeight = Dimensions.get('window').height;
    const [showSenha, setShowSenha] = useState(false);

    return (
        <SafeAreaView edges={['top']} style={{flex:1}}>
        <KeyboardAvoidingView
            style={style.teste}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} 
        >
            <StatusBar style="light" />
            <ScrollView 
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} 
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={style.teste1}>
                    <Image style={style.image} source={require('../../assets/logo2.png')} />
                </View>
                <View style={style.background}>
                    <View style={style.container}>
                        <View style={{flex:1}}>
                        <Text style={[style.textoRedefinirSenha, {top:20}]}>
                            Redefinir Senha
                        </Text>
                        </View>
                        <View style={{flex:1, alignContent:'center',bottom:20}}>
                        <TextInput 
                            style={[style.input, {bottom: 25}]}
                            label="e-mail"
                            value={email}
                            onChangeText={text => setEmail(text)}
                            
                        />
                        <Button mode="contained" onPress={() => console.log("Pressed")} style={[style.botao]}>
                            Continuar
                        </Button>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
