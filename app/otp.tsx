// @ts-ignore - React 19 compatibility issue with TypeScript
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function OTPVerificationScreen() {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [timer, setTimer] = useState(30);
  const [resendEnabled, setResendEnabled] = useState(false);
  const router = useRouter();
  const params = useLocalSearchParams();
  const [verificationOtp, setVerificationOtp] = useState(params.otp);

  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (verificationOtp) {
      console.log(`Your OTP is: ${verificationOtp}`);
    }
  }, [verificationOtp]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          setResendEnabled(true);
          clearInterval(interval);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [resendEnabled]);

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text.length === 1 && index < 5) {
      inputRefs.current[index + 1]?.focus();
    } else if (text.length === 0 && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join('');
    if (enteredOtp !== verificationOtp) {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
      return;
    }

    try {
      // Check if this is for password reset
      if (params.purpose === 'password_reset') {
        router.push({
          pathname: '/reset-password' as any,
          params: { phone: params.phone }
        });
        return;
      }

      // For registration, update user verification status
      if (params.purpose === 'registration' && params.userId) {
        const { error } = await supabase
          .from('users')
          .update({
            phone_verified: true,
            email_verified: false // Email verification can be done separately
          })
          .eq('id', params.userId);

        if (error) {
          console.error('Error updating user verification status:', error);
          Alert.alert('Verification Error', 'Failed to update verification status. Please contact support.');
          return;
        }
      }

      Alert.alert('Success', 'Account created successfully! Please login to continue.');
      router.replace('/login');

    } catch (error) {
      console.error('Verification error:', error);
      Alert.alert('Verification Error', 'An unexpected error occurred. Please try again.');
    }
  };

  const handleResend = () => {
    setResendEnabled(false);
    setTimer(30);
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setVerificationOtp(newOtp);
    setOtp(new Array(6).fill(''));
    inputRefs.current[0]?.focus();
  };

  const setInputRef = (index: number) => (ref: TextInput | null) => {
    inputRefs.current[index] = ref;
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>
        {params.purpose === 'password_reset' ? 'Reset Password' : 'OTP Verification'}
      </ThemedText>
      <ThemedText style={styles.subtitle}>
        {params.purpose === 'password_reset'
          ? 'Enter the 6-digit code sent to your phone to reset your password.'
          : 'Enter the 6-digit code sent to your registered mobile number.'
        }
      </ThemedText>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={setInputRef(index)}
            style={styles.otpInput}
            value={digit}
            onChangeText={(text) => handleOtpChange(text, index)}
            keyboardType="numeric"
            maxLength={1}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.verifyButtonText}>Verify</Text>
      </TouchableOpacity>
      <View style={styles.resendContainer}>
        <ThemedText style={styles.resendText}>
          {resendEnabled ? "Didn't receive the code? " : `Resend OTP in ${timer}s`}
        </ThemedText>
        {resendEnabled && (
          <TouchableOpacity onPress={handleResend}>
            <Text style={styles.resendButton}>Resend OTP</Text>
          </TouchableOpacity>
        )}
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#000',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#DDE3EC',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: '#f9fafb',
    color: '#000',
  },
  verifyButton: {
    backgroundColor: Colors.light.tint,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendText: {
    fontSize: 16,
    color: '#000',
  },
  resendButton: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
