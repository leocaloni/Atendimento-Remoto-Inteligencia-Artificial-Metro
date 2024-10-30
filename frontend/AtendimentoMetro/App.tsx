import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

function App() {
  const [loaded, error] = useFonts({
		'Helvetica-Bold': require('./assets/fonts/Helvetica-Bold.ttf'),
		'Helvetica-Regular': require('./assets/fonts/Helvetica.ttf'),
		'Helvetica-Light': require('./assets/fonts/Helvetica-Light.ttf'),
	});

	useEffect(() => {
		if (loaded || error) {
			SplashScreen.hideAsync();
		}
	}, [loaded, error]);

	if (!loaded && !error) {
		return null;
	}

  return (
    <NavigationContainer>
    <Routes/>
    </NavigationContainer>
  );
}
export default App;