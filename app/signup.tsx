import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, ScrollView, Modal, KeyboardAvoidingView, Platform, Alert, SafeAreaView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { states } from '@/constants/states';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

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

  const handleRegister = () => {
    if (isStepValid) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      console.log('Your OTP is: ', otp);
      router.push({ pathname: '/otp', params: { otp } });
    } else {
      Alert.alert('Error', 'Please fill in all required fields correctly.');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <ThemedText style={styles.stepTitle}>Personal Information</ThemedText>
            <ThemedText style={styles.stepDescription}>Let&apos;s start with your basic details</ThemedText>
            <View style={styles.card}>
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Full Name <Text style={styles.required}>*</Text></ThemedText>
                <TextInput style={styles.input} placeholder="Enter your full name" value={fullName} onChangeText={setFullName} />
              </View>
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>EPIC Number <Text style={styles.required}>*</Text></ThemedText>
                <TextInput style={styles.input} placeholder="Enter your EPIC number" value={epicNumber} onChangeText={setEpicNumber} maxLength={10}/>
                {epicError ? <Text style={styles.errorText}>{epicError}</Text> : null}
              </View>
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Phone Number <Text style={styles.required}>*</Text></ThemedText>
                <TextInput style={styles.input} placeholder="Enter your phone number" value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" maxLength={10}/>
                {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
              </View>
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Email Address <Text style={styles.required}>*</Text></ThemedText>
                <TextInput style={styles.input} placeholder="Enter your email address" value={email} onChangeText={setEmail} keyboardType="email-address" />
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
              </View>
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Aadhar Number <Text style={styles.required}>*</Text></ThemedText>
                <TextInput style={styles.input} placeholder="Enter your Aadhar number" value={aadharNumber} onChangeText={setAadharNumber} keyboardType="numeric" maxLength={12}/>
                {aadharError ? <Text style={styles.errorText}>{aadharError}</Text> : null}
              </View>
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Date of Birth <Text style={styles.required}>*</Text></ThemedText>
                <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
                  <Text style={{ color: dob ? '#000' : '#999' }}>{dob || 'Select Date of Birth'}</Text>
                </TouchableOpacity>
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
                <ThemedText style={styles.label}>Age <Text style={styles.required}>*</Text></ThemedText>
                <TextInput style={[styles.input, {backgroundColor: '#E0E4E8'}]} placeholder="Your age will be calculated" value={age} editable={false} />
                {ageError ? <Text style={styles.errorText}>{ageError}</Text> : null}
              </View>
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Father&apos;s Name <Text style={styles.required}>*</Text></ThemedText>
                <TextInput style={styles.input} placeholder="Enter your father's name" value={fatherName} onChangeText={setFatherName} />
              </View>
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Gender <Text style={styles.required}>*</Text></ThemedText>
                <TouchableOpacity style={styles.input} onPress={() => setGenderPickerVisible(true)}>
                  <Text style={{ color: gender ? '#000' : '#999' }}>{gender || 'Select Gender'}</Text>
                </TouchableOpacity>
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
            <ThemedText style={styles.stepTitle}>Location Details</ThemedText>
            <ThemedText style={styles.stepDescription}>Tell us where you&apos;re located</ThemedText>
            <View style={styles.card}>
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>State <Text style={styles.required}>*</Text></ThemedText>
                <TouchableOpacity style={styles.input} onPress={() => setStatePickerVisible(true)}>
                  <Text style={{ color: selectedState ? '#000' : '#999' }}>{selectedState || 'Select State'}</Text>
                </TouchableOpacity>
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
                <ThemedText style={styles.label}>District <Text style={styles.required}>*</Text></ThemedText>
                <TouchableOpacity
                  style={[styles.input, !selectedState && styles.disabledInput]}
                  onPress={() => setDistrictPickerVisible(true)}
                  disabled={!selectedState}
                >
                  <Text style={{ color: selectedDistrict ? '#000' : '#999' }}>{selectedDistrict || 'Select District'}</Text>
                </TouchableOpacity>
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
                <ThemedText style={styles.label}>Pincode <Text style={styles.required}>*</Text></ThemedText>
                <TextInput style={styles.input} placeholder="Enter your pincode" value={pincode} onChangeText={setPincode} keyboardType="numeric" maxLength={6}/>
                {pincodeError ? <Text style={styles.errorText}>{pincodeError}</Text> : null}
              </View>
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Full Address <Text style={styles.required}>*</Text></ThemedText>
                <TextInput style={styles.multilineInput} placeholder="Enter your full address" value={address} onChangeText={setAddress} multiline />
              </View>
            </View>
          </>
        );
      case 3:
        return (
          <>
            <ThemedText style={styles.stepTitle}>Create Password</ThemedText>
            <ThemedText style={styles.stepDescription}>Secure your account with a strong password</ThemedText>
            <View style={styles.card}>
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Create Password <Text style={styles.required}>*</Text></ThemedText>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <MaterialCommunityIcons name={showPassword ? 'eye-off' : 'eye'} size={24} color={Colors.light.icon} />
                  </TouchableOpacity>
                </View>
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
              </View>
              <View style={styles.inputGroup}>
                <ThemedText style={styles.label}>Confirm Password <Text style={styles.required}>*</Text></ThemedText>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                  />
                  <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                    <MaterialCommunityIcons name={showConfirmPassword ? 'eye-off' : 'eye'} size={24} color={Colors.light.icon} />
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
    <LinearGradient
      colors={['#E3F2FD', '#F3E5F5', '#FFF3E0', '#F1F8E9']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }}>
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
            <View style={styles.contentWrapper}>
            <ThemedText style={styles.title}>Create Account</ThemedText>

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
                  style={[styles.navButton, styles.registerButton, !isStepValid && styles.disabledButton]}
                  onPress={handleRegister}
                  disabled={!isStepValid}
                >
                  <Text style={styles.navButtonText}>Create Account</Text>
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
        </ScrollView>
      </ThemedView>
    </KeyboardAvoidingView>
    </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: Colors.light.text,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
    width: '100%',
  },
  progressStep: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  progressCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E4E8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E4E8',
  },
  progressCircleActive: {
    backgroundColor: Colors.light.tint,
    borderColor: Colors.light.tint,
  },
  progressCircleCompleted: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  progressText: {
    color: '#999',
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressTextActive: {
    color: '#fff',
  },
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#E0E4E8',
    marginHorizontal: 10,
  },
  progressLineCompleted: {
    backgroundColor: '#4CAF50',
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: Colors.light.text,
  },
  stepDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: Colors.light.icon,
  },
  card: {
    backgroundColor: Colors.light.background,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: Colors.light.text,
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
  required: {
    color: 'red',
  },
  input: {
    backgroundColor: '#F0F4F8',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    justifyContent: 'center',
  },
  disabledInput: {
    backgroundColor: '#E0E4E8',
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
    padding: 15,
    flex: 1,
    gap: 8,
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
    fontSize: 16,
    fontWeight: 'bold',
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
    color: 'red',
    marginTop: 5,
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
});
