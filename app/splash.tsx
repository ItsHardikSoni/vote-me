import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as SplashScreen from 'expo-splash-screen';

export default function SplashScreenComponent() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/login');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <LinearGradient
        colors={['rgba(255, 153, 51, 0.2)', 'rgba(255, 255, 255, 0)']}
        style={styles.topGradient}
      />
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Ionicons name="checkmark" size={80} color="white" />
        </View>
        <Text style={styles.logoText}>SecureVote</Text>
        <Text style={styles.tagline}>Your vote. Your voice.</Text>
      </View>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0)', 'rgba(19, 136, 8, 0.2)']}
        style={styles.bottomGradient}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 250,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 250,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 140,
    height: 140,
    borderRadius: 35,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  logoText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  tagline: {
    fontSize: 20,
    color: '#8E8E93',
    marginTop: 10,
  },
});
