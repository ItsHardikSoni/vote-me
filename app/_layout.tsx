import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Alert, Linking, View } from 'react-native';
import * as Location from 'expo-location';

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

      // 🔐 Ask user to enable location (GPS) on app start
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          Alert.alert(
            'Location Required',
            'Please enable location access to get the best experience. You can turn it on in your device settings.'
          );
          return;
        }

        const servicesEnabled = await Location.hasServicesEnabledAsync();
        if (!servicesEnabled) {
          Alert.alert(
            'Turn On Location',
            'Your GPS/location is turned off. Please turn it on in settings for accurate information.',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'On',
                onPress: () => {
                  // Open app/system location settings
                  Linking.openSettings().catch(err => {
                    console.warn('Unable to open settings', err);
                  });
                },
              },
            ]
          );
        }
      } catch (e) {
        console.warn('Error requesting location permission', e);
      }
    };

    prepare();
  }, []);

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
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
      </View>
    </SafeAreaProvider>
  );
}
