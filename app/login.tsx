import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const phoneRegex = /^[0-9]{10}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

    const isPhoneValid = phoneRegex.test(phoneNumber);
    const isPasswordValid = passwordRegex.test(password);

    setPhoneError(phoneNumber && !isPhoneValid ? 'Phone number must be 10 digits.' : '');
    setPasswordError(password && !isPasswordValid ? 'Password must be strong (at least 8 characters, with uppercase, lowercase, number, and special character).' : '');

    setIsFormValid(isPhoneValid && isPasswordValid);
  }, [phoneNumber, password]);

  const handleLogin = () => {
    if (isFormValid) {
      router.replace('/(tabs)');
    } else {
      Alert.alert('Login Failed', 'Please check your credentials and try again.');
    }
  };

  return (
    <LinearGradient
      colors={['#667EEA', '#764BA2', '#F093FB', '#F5576C']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.overlay}>
              <View style={styles.headerContainer}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="vote-outline" size={40} color="#fff" />
            </View>
                <ThemedText style={styles.title}>SecureVote</ThemedText>
                <ThemedText style={styles.subtitle}>Your Voice, Your Vote</ThemedText>
              </View>

              <View style={styles.card}>
                <View style={styles.welcomeSection}>
                  <ThemedText style={styles.welcomeTitle}>Welcome Back!</ThemedText>
                  <ThemedText style={styles.welcomeSubtitle}>Please sign in to your account</ThemedText>
                </View>

                <View style={styles.inputGroup}>
                  <ThemedText style={styles.label}>
                    Phone Number <Text style={styles.required}>✱</Text>
                  </ThemedText>
                  <View style={styles.inputWrapper}>
                    <MaterialCommunityIcons name="phone" size={20} color="#6366F1" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your phone number"
                      placeholderTextColor="#9CA3AF"
                      value={phoneNumber}
                      onChangeText={setPhoneNumber}
                      keyboardType="phone-pad"
                      maxLength={10}
                    />
                  </View>
                  {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
                </View>

                <View style={styles.inputGroup}>
                  <ThemedText style={styles.label}>
                    Password <Text style={styles.required}>✱</Text>
                  </ThemedText>
                  <View style={styles.inputWrapper}>
                    <MaterialCommunityIcons name="lock" size={20} color="#6366F1" style={styles.inputIcon} />
                    <TextInput
                      style={styles.passwordInput}
                      placeholder="Enter your password"
                      placeholderTextColor="#9CA3AF"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                      style={styles.eyeButton}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <MaterialCommunityIcons
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={20}
                        color="#6B7280"
                      />
                    </TouchableOpacity>
                  </View>
                  {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                </View>

                <TouchableOpacity
                  style={[styles.loginButton, !isFormValid && styles.disabledButton]}
                  onPress={handleLogin}
                  disabled={!isFormValid}
                >
                  <MaterialCommunityIcons name="login" size={20} color="#fff" style={styles.loginIcon} />
                  <Text style={styles.loginButtonText}>Sign In</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.forgotPasswordContainer} onPress={() => router.push('/forgot-password')}>
                  <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
                </TouchableOpacity>

                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>or</Text>
                  <View style={styles.dividerLine} />
                </View>

                <TouchableOpacity style={styles.registerContainer} onPress={() => router.push('/signup')}>
                  <Text style={styles.registerText}>
                    New to SecureVote? <Text style={styles.registerLink}>Create Account</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    minHeight: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 40, // Extra padding for keyboard
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 6,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 12,
    marginBottom: 20, // Ensure space for keyboard
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 6,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#374151',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: '#1F2937',
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: '#1F2937',
  },
  eyeButton: {
    padding: 8,
  },
  loginButton: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 20,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  loginIcon: {
    marginRight: 6,
  },
  disabledButton: {
    backgroundColor: '#D1D5DB',
    shadowOpacity: 0.1,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  forgotPasswordContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#6366F1',
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    paddingHorizontal: 12,
    color: '#6B7280',
    fontSize: 13,
    fontWeight: '500',
  },
  registerContainer: {
    alignItems: 'center',
  },
  registerText: {
    textAlign: 'center',
    color: '#6B7280',
    fontSize: 14,
  },
  registerLink: {
    color: '#6366F1',
    fontWeight: '600',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 13,
    marginTop: 6,
    marginLeft: 4,
  },
  required: {
    color: '#EF4444',
  },
});
