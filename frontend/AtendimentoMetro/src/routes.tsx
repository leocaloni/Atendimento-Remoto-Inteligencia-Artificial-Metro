import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/login';
import Cadastro from './screens/cadastro';
import Camera from './screens/camera'
import EsqueceuSenha from './screens/esqueceusenha'

export type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Camera: undefined;
};

const Stack = createNativeStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
      <Stack.Screen name="EsqueceuSenha" component={EsqueceuSenha} options={{headerShown:false}} />
      <Stack.Screen name="Cadastro" component={Cadastro} options={{headerShown:false}} />
      <Stack.Screen name="Camera" component={Camera} options={{headerShown:false}} />
    </Stack.Navigator>
  );
}