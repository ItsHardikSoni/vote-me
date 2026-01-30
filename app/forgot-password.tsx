// @ts-ignore - React 19 compatibility issue with TypeScript
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';

export default function ForgotPasswordScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const phoneRegex = /^[0-9]{10}$/;
    const isValid = phoneRegex.test(phoneNumber);

    setPhoneError(phoneNumber && !isValid ? 'Phone number must be 10 digits.' : '');
    setIsPhoneValid(isValid);
  }, [phoneNumber]);

  const handleSendResetCode = () => {
    if (!isPhoneValid) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit phone number.');
      return;
    }

    setIsLoading(true);

    // Generate OTP and navigate to OTP verification
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'OTP Sent',
        'A reset code has been sent to your phone number.',
        [
          {
            text: 'OK',
            onPress: () => {
              router.push({
                pathname: '/otp' as any,
                params: { otp, purpose: 'password_reset', phone: phoneNumber }
              });
            }
          }
        ]
      );
    }, 1500);
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color={Colors.light.icon} />
        </TouchableOpacity>
      </View> */}

      <ThemedText style={styles.title}>Forgot Password</ThemedText>
      <ThemedText style={styles.subtitle}>
        Enter your phone number and we&apos;ll send you a reset code
      </ThemedText>

      <View style={styles.card}>
        <View style={styles.inputGroup}>
          <ThemedText style={styles.label}>Phone Number <Text style={styles.required}>*</Text></ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            maxLength={10}
          />
          {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
        </View>

        <TouchableOpacity
          style={[styles.resetButton, !isPhoneValid && styles.disabledButton]}
          onPress={handleSendResetCode}
          disabled={!isPhoneValid || isLoading}
        >
          <Text style={styles.resetButtonText}>
            {isLoading ? 'Sending...' : 'Send Reset Code'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginContainer}
          onPress={() => router.replace('/login')}
        >
          <Text style={styles.loginText}>
            Remember your password? <Text style={styles.loginLink}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  backButton: {
    padding: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#000',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  input: {
    backgroundColor: '#F0F4F8',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: Colors.light.tint,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#A9A9A9',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    marginTop: 20,
  },
  loginText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 16,
  },
  loginLink: {
    color: '#000',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  required: {
    color: 'red',
  },
});
