import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

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
                pathname: '/otp',
                params: { otp, purpose: 'password_reset', phone: phoneNumber }
              });
            }
          }
        ]
      );
    }, 1500);
  };

  return (
    <LinearGradient
      colors={['#E3F2FD', '#F3E5F5', '#FFF3E0', '#F1F8E9']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
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
    color: Colors.light.text,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: Colors.light.icon,
  },
  card: {
    backgroundColor: Colors.light.background,
    borderRadius: 15,
    padding: 25,
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: Colors.light.text,
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
    color: Colors.light.icon,
    fontSize: 16,
  },
  loginLink: {
    color: Colors.light.tint,
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
