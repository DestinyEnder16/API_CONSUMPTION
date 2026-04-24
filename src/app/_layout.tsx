import Ionicons from '@expo/vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from '../store';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'Montserrat-Thin': require('../fonts/Montserrat-Thin.ttf'),
    'Montserrat-Regular': require('../fonts/Montserrat-Regular.ttf'),
    'Montserrat-Medium': require('../fonts/Montserrat-Medium.ttf'),
    'Montserrat-SemiBold': require('../fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Bold': require('../fonts/Montserrat-Bold.ttf'),
    ...Ionicons.font,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false, statusBarStyle: 'dark' }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="user" />
        </Stack>
      </SafeAreaProvider>
    </Provider>
  );
}
