// @ts-ignore - React 19 compatibility issue with TypeScript
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, ScrollView, Modal, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { states } from '@/constants/states';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { supabase, User } from '@/lib/supabase';

export default function SignupScreen() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const [fullName, setFullName] = useState('');
  const [epicNumber, setEpicNumber] = useState('');
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [pincode, setPincode] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isStepValid, setIsStepValid] = useState(false);

  // Error states
  const [epicError, setEpicError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [aadharError, setAadharError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [pincodeError, setPincodeError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const [isGenderPickerVisible, setGenderPickerVisible] = useState(false);
  const [isStatePickerVisible, setStatePickerVisible] = useState(false);
  const [isDistrictPickerVisible, setDistrictPickerVisible] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const genders = ['Male', 'Female', 'Other'];
  const router = useRouter();

  // Validation variables
  const epicRegex = /^[A-Z]{3}[0-9]{7}$/;
  const phoneRegex = /^[0-9]{10}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  const aadharRegex = /^[0-9]{12}$/;
  const pincodeRegex = /^[0-9]{6}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

  const isEpicValid = epicRegex.test(epicNumber);
  const isPhoneValid = phoneRegex.test(phoneNumber);
  const isEmailValid = emailRegex.test(email);
  const isAadharValid = aadharRegex.test(aadharNumber);
  const isAgeValid = parseInt(age, 10) >= 18;
  const isPincodeValid = pincodeRegex.test(pincode);
  const isPasswordStrong = passwordRegex.test(password);
  const doPasswordsMatch = password === confirmPassword; 

  useEffect(() => {
    // Set errors for all fields
    setEpicError(epicNumber && !isEpicValid ? 'EPIC number must be 3 uppercase letters followed by 7 numbers.' : '');
    setPhoneError(phoneNumber && !isPhoneValid ? 'Phone number must be 10 digits.' : '');
    setEmailError(email && !isEmailValid ? 'Email must be a valid @gmail.com address.' : '');
    setAadharError(aadharNumber && !isAadharValid ? 'Aadhar number must be 12 digits.' : '');
    setAgeError(age && !isAgeValid ? 'Age must be 18 or older.' : '');
    setPincodeError(pincode && !isPincodeValid ? 'Pincode must be 6 digits.' : '');
    setPasswordError(password && !isPasswordStrong ? 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.' : '');
    setConfirmPasswordError(confirmPassword && !doPasswordsMatch ? 'Passwords do not match.' : '');

    // Step-specific validation
    let stepValid = false;
    switch (currentStep) {
      case 1:
        stepValid = fullName !== '' && epicNumber !== '' && phoneNumber !== '' && email !== '' &&
                   aadharNumber !== '' && dob !== '' && fatherName !== '' && gender !== '' &&
                   isEpicValid && isPhoneValid && isEmailValid && isAadharValid;
        break;
      case 2:
        stepValid = selectedState !== '' && selectedDistrict !== '' && pincode !== '' &&
                   address !== '' && isPincodeValid;
        break;
      case 3:
        stepValid = password !== '' && confirmPassword !== '' && isPasswordStrong && doPasswordsMatch;
        break;
      default:
        stepValid = false;
    }

    setIsStepValid(stepValid);
  }, [
    currentStep,
    fullName,
    epicNumber,
    phoneNumber,
    email,
    aadharNumber,
    dob,
    fatherName,
    gender,
    selectedState,
    selectedDistrict,
    pincode,
    address,
    password,
    confirmPassword,
    age,
    isEpicValid,
    isPhoneValid,
    isEmailValid,
    isAadharValid,
    isAgeValid,
    isPincodeValid,
    isPasswordStrong,
    doPasswordsMatch,
  ]);

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
    setGenderPickerVisible(false);
  };

  const handleStateSelect = (state) => {
    setSelectedState(state.name);
    setDistricts(state.districts);
    setSelectedDistrict('');
    setStatePickerVisible(false);
  };

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
    setDistrictPickerVisible(false);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
    setDob(currentDate.toISOString().split('T')[0]);

    // Calculate age
    const today = new Date();
    const birthDate = new Date(currentDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    setAge(age.toString());
  };

  const handleNext = () => {
    if (isStepValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRegister = async () => {
    if (!isStepValid) {
      Alert.alert('Error', 'Please fill in all required fields correctly.');
      return;
    }

    setIsRegistering(true);

    try {
      // Hash the password (in production, use a proper hashing library)
      const passwordHash = password; // TODO: Implement proper password hashing

      // Create user object
      const userData: Omit<User, 'id' | 'created_at' | 'updated_at'> = {
        full_name: fullName,
        epic_number: epicNumber,
        age: parseInt(age),
        date_of_birth: dob,
        father_name: fatherName,
        gender: gender,
        phone_number: phoneNumber,
        email: email,
        aadhar_number: aadharNumber,
        state: selectedState,
        district: selectedDistrict,
        pincode: pincode,
        address: address,
        password_hash: passwordHash,
      };

      // Save user data to Supabase
      const { data, error } = await supabase
        .from('users')
        .insert([userData])
        .select()
        .single();

      if (error) {
        console.error('Error saving user data:', error);
        Alert.alert('Registration Failed', 'Failed to save user data. Please try again.');
        return;
      }

      // Generate OTP and proceed to verification
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      console.log('Your OTP is: ', otp);

      // Pass user ID along with OTP for verification
      router.replace({
        pathname: '/otp' as any,
        params: {
          otp,
          userId: data.id,
          purpose: 'registration'
        }
      });

    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Registration Failed', 'An unexpected error occurred. Please try again.');
    } finally {
      setIsRegistering(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <View style={styles.welcomeSection}>
              <ThemedText style={styles.welcomeTitle}>Personal Information</ThemedText>
              <ThemedText style={styles.welcomeSubtitle}>Let&apos;s start with your basic details</ThemedText>
            </View>
            <View style={styles.card}>
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Full Name <Text style={styles.required}>✱</Text></ThemedText>
                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons name="account" size={20} color="#6366F1" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your full name"
                    placeholderTextColor="#9CA3AF"
                    value={fullName}
                    onChangeText={setFullName}
                  />
                </View>
              </View>
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>EPIC Number <Text style={styles.required}>✱</Text></ThemedText>
                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons name="card-text" size={20} color="#6366F1" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your EPIC number"
                    placeholderTextColor="#9CA3AF"
                    value={epicNumber}
                    onChangeText={setEpicNumber}
                    maxLength={10}
                  />
                </View>
                {epicError ? <Text style={styles.errorText}>{epicError}</Text> : null}
              </View>
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Phone Number <Text style={styles.required}>✱</Text></ThemedText>
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
                <ThemedText style={styles.label}>Email Address <Text style={styles.required}>✱</Text></ThemedText>
                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons name="email" size={20} color="#6366F1" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email address"
                    placeholderTextColor="#9CA3AF"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                  />
                </View>
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
              </View>
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Aadhar Number <Text style={styles.required}>✱</Text></ThemedText>
                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons name="card-account-details" size={20} color="#6366F1" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your Aadhar number"
                    placeholderTextColor="#9CA3AF"
                    value={aadharNumber}
                    onChangeText={setAadharNumber}
                    keyboardType="numeric"
                    maxLength={12}
                  />
                </View>
                {aadharError ? <Text style={styles.errorText}>{aadharError}</Text> : null}
              </View>
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Date of Birth <Text style={styles.required}>✱</Text></ThemedText>
                <View style={styles.dateOfBirthWrapper}>
                  <MaterialCommunityIcons name="calendar" size={20} color="#0EA5E9" style={styles.inputIcon} />
                  <TouchableOpacity style={styles.dateOfBirthTouchable} onPress={() => setShowDatePicker(true)}>
                    <Text style={dob ? styles.dateOfBirthText : styles.dateOfBirthPlaceholder}>
                      {dob || 'Select Date of Birth'}
                    </Text>
                  </TouchableOpacity>
                </View>
                {showDatePicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onDateChange}
                  />
                )}
              </View>
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Age <Text style={styles.required}>✱</Text></ThemedText>
                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons name="calendar-account" size={20} color="#6366F1" style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, {backgroundColor: 'transparent'}]}
                    placeholder="Your age will be calculated"
                    placeholderTextColor="#9CA3AF"
                    value={age}
                    editable={false}
                  />
                </View>
                {ageError ? <Text style={styles.errorText}>{ageError}</Text> : null}
              </View>
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Father&apos;s Name <Text style={styles.required}>✱</Text></ThemedText>
                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons name="account-group" size={20} color="#6366F1" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your father's name"
                    placeholderTextColor="#9CA3AF"
                    value={fatherName}
                    onChangeText={setFatherName}
                  />
                </View>
              </View>
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Gender <Text style={styles.required}>✱</Text></ThemedText>
                <View style={styles.genderWrapper}>
                  <MaterialCommunityIcons name="gender-male-female" size={20} color="#EC4899" style={styles.inputIcon} />
                  <TouchableOpacity style={styles.genderTouchable} onPress={() => setGenderPickerVisible(true)}>
                    <Text style={gender ? styles.genderText : styles.genderPlaceholder}>
                      {gender || 'Select Gender'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Modal
                  transparent={true}
                  visible={isGenderPickerVisible}
                  animationType="slide"
                  onRequestClose={() => setGenderPickerVisible(false)}
                >
                  <View style={styles.modalContainer}>
                    <View style={styles.pickerContainer}>
                      {genders.map((g) => (
                        <TouchableOpacity key={g} style={styles.pickerOption} onPress={() => handleGenderSelect(g)}>
                          <Text style={styles.pickerOptionText}>{g}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => setGenderPickerVisible(false)}>
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </Modal>
              </View>
            </View>
          </>
        );
      case 2:
        return (
          <>
            <View style={styles.welcomeSection}>
              <ThemedText style={styles.welcomeTitle}>Location Details</ThemedText>
              <ThemedText style={styles.welcomeSubtitle}>Tell us where you&apos;re located</ThemedText>
            </View>
            <View style={styles.card}>
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>State <Text style={styles.required}>✱</Text></ThemedText>
                <View style={styles.stateWrapper}>
                  <MaterialCommunityIcons name="map" size={20} color="#0284C7" style={styles.inputIcon} />
                  <TouchableOpacity style={styles.stateTouchable} onPress={() => setStatePickerVisible(true)}>
                    <Text style={selectedState ? styles.stateText : styles.statePlaceholder}>
                      {selectedState || 'Select State'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Modal
                  transparent={true}
                  visible={isStatePickerVisible}
                  animationType="slide"
                  onRequestClose={() => setStatePickerVisible(false)}
                >
                  <View style={styles.modalContainer}>
                    <View style={styles.pickerContainer}>
                      <ScrollView>
                        {states.map((s) => (
                          <TouchableOpacity key={s.name} style={styles.pickerOption} onPress={() => handleStateSelect(s)}>
                            <Text style={styles.pickerOptionText}>{s.name}</Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => setStatePickerVisible(false)}>
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </Modal>
              </View>
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>District <Text style={styles.required}>✱</Text></ThemedText>
                <View style={[styles.districtWrapper, !selectedState && styles.disabledInput]}>
                  <MaterialCommunityIcons name="map-marker" size={20} color="#16A34A" style={styles.inputIcon} />
                  <TouchableOpacity
                    style={styles.districtTouchable}
                    onPress={() => setDistrictPickerVisible(true)}
                    disabled={!selectedState}
                  >
                    <Text style={selectedDistrict ? styles.districtText : styles.districtPlaceholder}>
                      {selectedDistrict || 'Select District'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Modal
                  transparent={true}
                  visible={isDistrictPickerVisible}
                  animationType="slide"
                  onRequestClose={() => setDistrictPickerVisible(false)}
                >
                  <View style={styles.modalContainer}>
                    <View style={styles.pickerContainer}>
                      <ScrollView>
                        {districts.map((d) => (
                          <TouchableOpacity key={d} style={styles.pickerOption} onPress={() => handleDistrictSelect(d)}>
                            <Text style={styles.pickerOptionText}>{d}</Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => setDistrictPickerVisible(false)}>
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </Modal>
              </View>
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Pincode <Text style={styles.required}>✱</Text></ThemedText>
                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons name="map-marker-radius" size={20} color="#6366F1" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your pincode"
                    placeholderTextColor="#9CA3AF"
                    value={pincode}
                    onChangeText={setPincode}
                    keyboardType="numeric"
                    maxLength={6}
                  />
                </View>
                {pincodeError ? <Text style={styles.errorText}>{pincodeError}</Text> : null}
              </View>
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Full Address <Text style={styles.required}>✱</Text></ThemedText>
                <View style={[styles.inputWrapper, {alignItems: 'flex-start'}]}>
                  <MaterialCommunityIcons name="home" size={20} color="#6366F1" style={[styles.inputIcon, {marginTop: 14}]} />
                  <TextInput
                    style={[styles.input, {minHeight: 80, textAlignVertical: 'top'}]}
                    placeholder="Enter your full address"
                    placeholderTextColor="#9CA3AF"
                    value={address}
                    onChangeText={setAddress}
                    multiline
                    numberOfLines={3}
                  />
                </View>
              </View>
            </View>
          </>
        );
      case 3:
        return (
          <>
            <View style={styles.welcomeSection}>
              <ThemedText style={styles.welcomeTitle}>Create Password</ThemedText>
              <ThemedText style={styles.welcomeSubtitle}>Secure your account with a strong password</ThemedText>
            </View>
            <View style={styles.card}>
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Create Password <Text style={styles.required}>✱</Text></ThemedText>
                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons name="lock" size={20} color="#6366F1" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor="#9CA3AF"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity style={styles.eyeButton} onPress={() => setShowPassword(!showPassword)}>
                    <MaterialCommunityIcons
                      name={showPassword ? 'eye-off' : 'eye'}
                      size={20}
                      color="#6B7280"
                    />
                  </TouchableOpacity>
                </View>
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
              </View>
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Confirm Password <Text style={styles.required}>✱</Text></ThemedText>
                <View style={styles.inputWrapper}>
                  <MaterialCommunityIcons name="lock-check" size={20} color="#6366F1" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm your password"
                    placeholderTextColor="#9CA3AF"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                  />
                  <TouchableOpacity style={styles.eyeButton} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <MaterialCommunityIcons
                      name={showConfirmPassword ? 'eye-off' : 'eye'}
                      size={20}
                      color="#6B7280"
                    />
                  </TouchableOpacity>
                </View>
                {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
              </View>
            </View>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1}}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
        <ThemedView style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.overlay}>
              <View style={styles.headerContainer}>
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons name="account-plus-outline" size={35} color="#000" />
                </View>
                <ThemedText style={styles.title}>Create Account</ThemedText>
                <ThemedText style={styles.subtitle}>Join SecureVote today</ThemedText>
              </View>

            <View style={styles.contentWrapper}>

            {/* Progress Indicator */}
            <View style={styles.progressContainer}>
              {[...Array(totalSteps)].map((_, index) => (
                <View key={index} style={styles.progressStep}>
                  <View style={[
                    styles.progressCircle,
                    currentStep > index + 1 && styles.progressCircleCompleted,
                    currentStep === index + 1 && styles.progressCircleActive
                  ]}>
                    <Text style={[
                      styles.progressText,
                      (currentStep > index + 1 || currentStep === index + 1) && styles.progressTextActive
                    ]}>
                      {index + 1}
                    </Text>
                  </View>
                  {index < totalSteps - 1 && (
                    <View style={[
                      styles.progressLine,
                      currentStep > index + 1 && styles.progressLineCompleted
                    ]} />
                  )}
                </View>
              ))}
            </View>

            {renderStepContent()}

            {/* Navigation Buttons */}
            <View style={styles.buttonContainer}>
              {currentStep > 1 && (
                <TouchableOpacity
                  style={[styles.navButton, styles.previousButton]}
                  onPress={handlePrevious}
                >
                  <MaterialCommunityIcons name="arrow-left" size={20} color="#fff" />
                  <Text style={styles.navButtonText}>Previous</Text>
                </TouchableOpacity>
              )}

              {currentStep < totalSteps ? (
                <TouchableOpacity
                  style={[styles.navButton, styles.nextButton, !isStepValid && styles.disabledButton]}
                  onPress={handleNext}
                  disabled={!isStepValid}
                >
                  <Text style={styles.navButtonText}>Next</Text>
                  <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[styles.navButton, styles.registerButton, (!isStepValid || isRegistering) && styles.disabledButton]}
                  onPress={handleRegister}
                  disabled={!isStepValid || isRegistering}
                >
                  <Text style={styles.navButtonText}>
                    {isRegistering ? 'Creating Account...' : 'Create Account'}
                  </Text>
                  <MaterialCommunityIcons name="check" size={20} color="#fff" />
                </TouchableOpacity>
              )}
            </View>

            {currentStep === 1 && (
              <TouchableOpacity
                style={styles.loginContainer}
                onPress={() => router.replace('/login')}
              >
                <Text style={styles.loginText}>
                  Already have an account? <Text style={styles.loginLink}>Login</Text>
                </Text>
              </TouchableOpacity>
            )}
            </View>
          </View>
        </ScrollView>
      </ThemedView>
    </KeyboardAvoidingView>
    </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 50,
    paddingBottom: 70,
  },
  contentWrapper: {
    width: '100%',
    maxWidth: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
    color: '#000',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
    marginHorizontal: 40,
    paddingHorizontal: 20,
  },
  progressStep: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  progressCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  progressCircleActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  progressCircleCompleted: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  progressText: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '700',
  },
  progressTextActive: {
    color: '#fff',
  },
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#E0E4E8',
    marginHorizontal: 8,
    borderRadius: 1,
  },
  progressLineCompleted: {
    backgroundColor: '#4CAF50',
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 13,
    color: '#000',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: Colors.light.text,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#000',
  },
  required: {
    color: '#EF4444',
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
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: '#000',
  },
  eyeButton: {
    padding: 8,
  },
  disabledInput: {
    backgroundColor: '#F3F4F6',
    borderColor: '#D1D5DB',
    opacity: 0.6,
  },
  multilineInput: {
    backgroundColor: '#F0F4F8',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    gap: 15,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    flex: 1,
    borderRadius: 12,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  previousButton: {
    backgroundColor: '#6B7280',
  },
  nextButton: {
    backgroundColor: Colors.light.tint,
  },
  registerButton: {
    backgroundColor: '#4CAF50',
  },
  disabledButton: {
    backgroundColor: '#A9A9A9',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    maxHeight: '50%',
  },
  pickerOption: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  pickerOptionText: {
    fontSize: 18,
    color: Colors.light.tint,
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 20,
    padding: 20,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
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
  overlay: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  dateOfBirthWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#0EA5E9',
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  genderWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FCE7F3',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EC4899',
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dateOfBirthTouchable: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  genderTouchable: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  dateOfBirthText: {
    color: '#1F2937',
    fontSize: 15,
    fontWeight: '500',
  },
  genderText: {
    color: '#1F2937',
    fontSize: 15,
    fontWeight: '500',
  },
  dateOfBirthPlaceholder: {
    color: '#64748B',
    fontSize: 15,
  },
  genderPlaceholder: {
    color: '#64748B',
    fontSize: 15,
  },
  stateWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F2FE',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#0284C7',
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  districtWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#16A34A',
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  stateTouchable: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  districtTouchable: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  stateText: {
    color: '#1F2937',
    fontSize: 15,
    fontWeight: '500',
  },
  districtText: {
    color: '#1F2937',
    fontSize: 15,
    fontWeight: '500',
  },
  statePlaceholder: {
    color: '#64748B',
    fontSize: 15,
  },
  districtPlaceholder: {
    color: '#64748B',
    fontSize: 15,
  },

  // Modern overlay styles
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#000',
    fontWeight: '500',
    marginBottom: 16,
  }
});
