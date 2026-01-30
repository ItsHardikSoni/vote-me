// @ts-ignore - React 19 compatibility issue with TypeScript
import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function SplashScreenComponent() {
  const router = useRouter();
  const tapAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/login');
    }, 3000);

    return () => clearTimeout(timer);
  });

  useEffect(() => {
    // Create tapping animation - finger moves down to press button
    const animate = () => {
      Animated.sequence([
        Animated.timing(tapAnimation, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(tapAnimation, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Repeat animation after a delay
        setTimeout(animate, 1500);
      });
    };

    animate();
  }, [tapAnimation]);

  // const onLayoutRootView = useCallback(async () => {
  //   await SplashScreen.hideAsync();
  // }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(255, 153, 51, 0.2)', 'rgba(255, 255, 255, 0)']}
        style={styles.topGradient}
      />
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          {/* Finger */}
          <Animated.View
            style={[
              styles.fingerContainer,
              {
                transform: [
                  {
                    translateY: tapAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 80], // Move finger down to press button
                    }),
                  },
                  {
                    rotate: tapAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '5deg'], // Slight rotation for natural tap
                    }),
                  },
                ],
              },
            ]}
          >
            <Ionicons name="hand-right" size={60} color="#333" />
          </Animated.View>

          {/* Red Vote Button */}
          <Animated.View
            style={[
              styles.voteButton,
              {
                transform: [
                  {
                    scale: tapAnimation.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [1, 0.95, 1], // Button press effect
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={styles.voteButtonText}>VOTE</Text>
          </Animated.View>
        </View>
        <Text style={styles.logoText}>Vote Me</Text>
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
    width: 160,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  fingerContainer: {
    position: 'absolute',
    top: 20, // Position finger above the button
    zIndex: 2,
  },
  voteButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FF3B30', // iOS red
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
    position: 'absolute',
    bottom: 10, // Position button slightly up from bottom
  },
  voteButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 1,
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
