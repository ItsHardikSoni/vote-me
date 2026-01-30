import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useColorScheme } from '@/hooks/use-color-scheme';
// @ts-ignore - React 19 compatibility issue with TypeScript
import React, { useEffect } from 'react';

// ✅ prevent auto hide ONCE
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { isDarkColorScheme } = useColorScheme();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const prepare = async () => {
      // allow first frame to paint
      await new Promise(resolve => setTimeout(resolve, 200));
      await SplashScreen.hideAsync();

      // 🔥 FORCE splash on every cold start
      const firstSegment = segments[0];

      if (!firstSegment || firstSegment !== 'splash') {
        router.replace('/splash');
      }
    };

    prepare();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} translucent={true} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="splash" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="otp" options={{ headerShown: false }} />
        <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
        <Stack.Screen name="reset-password" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </SafeAreaProvider>
  );
}
