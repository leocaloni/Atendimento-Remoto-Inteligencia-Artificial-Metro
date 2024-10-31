import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/login';
import Cadastro from './screens/cadastro';

export type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
};

const Stack = createNativeStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
      <Stack.Screen name="Cadastro" component={Cadastro} options={{headerShown:false}} />
    </Stack.Navigator>
  );
}