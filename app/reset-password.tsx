import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ResetPasswordScreen() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    const isPasswordValid = passwordRegex.test(newPassword);
    const isConfirmValid = newPassword === confirmPassword && confirmPassword.length > 0;

    setPasswordError(newPassword && !isPasswordValid ?
      'Password must be strong (at least 8 characters, with uppercase, lowercase, number, and special character).' : '');

    setConfirmError(confirmPassword && !isConfirmValid ? 'Passwords do not match.' : '');

    setIsFormValid(isPasswordValid && isConfirmValid);
  }, [newPassword, confirmPassword]);

  const handleResetPassword = () => {
    if (!isFormValid) {
      Alert.alert('Invalid Input', 'Please check your password requirements.');
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Password Reset Successful',
        'Your password has been reset successfully. You can now login with your new password.',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/login')
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

      <ThemedText style={styles.title}>Reset Password</ThemedText>
      <ThemedText style={styles.subtitle}>
        Create a new strong password for your account
      </ThemedText>

      <View style={styles.card}>
        <View style={styles.inputGroup}>
          <ThemedText style={styles.label}>New Password <Text style={styles.required}>*</Text></ThemedText>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter new password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showNewPassword}
            />
            <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
              <MaterialCommunityIcons name={showNewPassword ? 'eye-off' : 'eye'} size={24} color={Colors.light.icon} />
            </TouchableOpacity>
          </View>
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        </View>

        <View style={styles.inputGroup}>
          <ThemedText style={styles.label}>Confirm Password <Text style={styles.required}>*</Text></ThemedText>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <MaterialCommunityIcons name={showConfirmPassword ? 'eye-off' : 'eye'} size={24} color={Colors.light.icon} />
            </TouchableOpacity>
          </View>
          {confirmError ? <Text style={styles.errorText}>{confirmError}</Text> : null}
        </View>

        <TouchableOpacity
          style={[styles.resetButton, !isFormValid && styles.disabledButton]}
          onPress={handleResetPassword}
          disabled={!isFormValid || isLoading}
        >
          <Text style={styles.resetButtonText}>
            {isLoading ? 'Resetting...' : 'Reset Password'}
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
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: Colors.light.text,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F4F8',
    borderRadius: 10,
    paddingRight: 15,
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: Colors.light.tint,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#A9A9A9',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
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
