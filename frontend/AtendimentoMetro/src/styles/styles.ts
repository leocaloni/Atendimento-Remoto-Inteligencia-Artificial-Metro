import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";


const { width } = Dimensions.get('window');

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
        fontFamily:'Helvetica-Regular',
        marginBottom: 35
    },
    input:{
        marginTop: 20,
        borderRadius: 7
    },
    esqueceuSenha:{
        padding: 7,
        marginBottom: 15,
        color: 'white',
        textDecorationLine: 'underline',
        fontFamily:'Helvetica-Regular'
    },
    botao:{
        backgroundColor:"#1027AF",
    },
    textoCadastro: {
        fontSize: 50,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontFamily:'Helvetica-Regular',
        padding:0
        
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
      },
      camera: {
        flex: 1,
      },
      buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
      },
      button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
      },
      text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
      },
      textoRedefinirSenha: {
        padding: 0,
        //bottom: '25%',
        fontSize: 45,
        color: 'white',
        fontFamily:'Helvetica-Regular',
        marginBottom: 35
      },
})