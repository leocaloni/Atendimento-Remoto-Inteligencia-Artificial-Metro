import { StyleSheet } from "react-native";
export const style = StyleSheet.create({
    teste:{
        flex:1
    },
    teste1:{
        flex:1, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    image:{
        width: 200,
        height: 54,
    },
    background:{
        flex: 5,
        borderTopRightRadius: 100,
        backgroundColor: '#001489',
        justifyContent: 'center',
        paddingHorizontal:20,
    },
    container:{
        flex: 1,
        justifyContent: 'center',
    },
    textoLogin:{
        padding: 0,
        alignItems: 'flex-start',
        fontSize: 52,
        color: 'white',
        fontFamily:'Helvetica-Light',
        marginBottom: 35
    },
    input:{
        marginTop: 20,
        borderRadius: 10
    },
    esqueceuSenha:{
        padding: 7,
        marginBottom: 15,
        color: 'white',
        textDecorationLine: 'underline',
        fontFamily:'Helvetica-Light'
    },
    botao:{
        backgroundColor:"#1027AF",
    },
})