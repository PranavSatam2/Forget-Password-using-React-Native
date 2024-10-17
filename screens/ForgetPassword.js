import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useCallback, useReducer, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES, FONTS } from '../constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Input from '../components/Input';
import { validateInput } from '../utils/actions/formActions'; 
import { reducer } from '../utils/reducers/formReducers';

const isTestMode = true;

const initialState = {
  inputValues: {
    OldPassword: '',
    NewPassword: '',
    ConfirmPassword: ''
  },
  inputValidities: {
    OldPassword: false,
    NewPassword: false,
    ConfirmPassword: false
  },
  errorMessages: {
    OldPassword: '',
    NewPassword: '',
    ConfirmPassword: ''
  },
  formIsValid: false
};

const ForgetPassword = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const { isValid, errorMessage } = validateInput(inputId, inputValue, formState);
      dispatchFormState({
        inputId,
        validationResult: isValid,
        inputValue,
        errorMessage
      });
    },
    [dispatchFormState, formState]
  );

  const handlePasswordReset = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('PasswordResetSuccessfully');
    }, 2000); 
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={['rgba(0,81,230,1)', 'rgba(0,81,230,.8)']} style={{ flex: 1 }}>
        <StatusBar hidden />

        <View style={styles.header}>
          <Text style={styles.headerTitle}>Login successful!</Text>
          <Text style={styles.subHeaderTitle}>
            It is mandatory for you to set a new password, which is not the same as the password provided by the admin.
          </Text>
        </View>

        <View style={styles.footer}>
          <KeyboardAwareScrollView>
            <Text style={styles.inputHeader}>Old password</Text>
            <Input
              id="OldPassword"
              placeholder="*********"
              placeholderTextColor={COLORS.black}
              onInputChanged={inputChangedHandler}
              errorText={formState.errorMessages.OldPassword}
              secureTextEntry={true}
              autoCapitalize="none"
            />

            <Text style={styles.inputHeader}>New password</Text>
            <Input
              id="NewPassword"
              placeholder="*********"
              placeholderTextColor={COLORS.black}
              onInputChanged={inputChangedHandler}
              errorText={formState.errorMessages.NewPassword}
              secureTextEntry={true}
              autoCapitalize="none"
            />

            <Text style={styles.inputHeader}>Confirm password</Text>
            <Input
              id="ConfirmPassword"
              placeholder="*********"
              placeholderTextColor={COLORS.black}
              onInputChanged={inputChangedHandler}
              errorText={formState.errorMessages.ConfirmPassword}
              secureTextEntry={true}
              autoCapitalize="none"
            />

            <TouchableOpacity
              onPress={handlePasswordReset}
              disabled={!formState.formIsValid || isLoading}
              style={[styles.button, !formState.formIsValid && { backgroundColor: COLORS.gray }]}
            >
              <Text style={styles.buttonText}>
                {isLoading ? 'Setting...' : 'Set new password'}
              </Text>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 4
  },
  footer: {
    flex: 3,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 22,
    paddingVertical: 30
  },
  headerTitle: {
    ...FONTS.h2,
    color: COLORS.white,
    marginVertical: SIZES.padding
  },
  subHeaderTitle: {
    ...FONTS.body4,
    color: COLORS.white,
    textAlign: 'center'
  },
  inputHeader: {
    ...FONTS.body4,
    textTransform: 'capitalize',
    marginVertical: 10
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default ForgetPassword;
