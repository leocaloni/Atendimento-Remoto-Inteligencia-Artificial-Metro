import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/login';

const Stack = createNativeStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
    </Stack.Navigator>
  );
}