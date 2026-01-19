import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';

import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useEffect } from 'react';

// ✅ prevent auto hide ONCE
SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
  const { colorScheme, isDarkColorScheme } = useColorScheme();

  useEffect(() => {
    const hideSplash = async () => {
      // allow first frame to paint (important for iOS)
      await new Promise(resolve => setTimeout(resolve, 200));
      await SplashScreen.hideAsync();
    };

    hideSplash();
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} translucent={true} />
      <Stack initialRouteName="splash">
        <Stack.Screen name="splash" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
