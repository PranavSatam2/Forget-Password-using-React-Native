import { View, Text, Button } from 'react-native'
import React, { useCallback, useReducer, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS, SIZE, FONTS, SIZES} from "../constants"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import  Input  from "../components/Input"
import { validateInput, validationInput } from "../utils/actions/formActions"
import { reducer } from "../utils/reducers/formReducers"
import input from '../components/Input'

const isTestMode = true;

const initalState = {
    inputValues: {
        UserID: isTestMode ? "Pranav7374" : "",
        Password: isTestMode ? "Pranav@1450" : ""
    },
    inputValidities: {
        UserID: false,
        Password: false
    },
    formIsValid: false
}

const Register = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [formState, dispatchFormState] = useReducer(reducer,initalState)

    const inputChangedHandler = useCallback((inputId,inputValue)=>{
        const result = validateInput(inputId,inputValue)
        dispatchFormState({inputId, validationResult: result, inputValue })
    },[dispatchFormState])

  return (
    <SafeAreaView style={{ flex: 1}}>
        <LinearGradient 
        colors = {["rgba(230,81,0,1)","rgba(230,81,0,.8)"]}
        style={{ flex: 1}}>
            <StatusBar hidden/>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Login</Text>
                <Text style={styles.subHeaderTitle}>Please Login with your Account</Text>
            </View>
            <View style={styles.footer}>
                <KeyboardAwareScrollView>
                    <Text style={styles.inputHeader}>User ID</Text>
                    <Input 
                        id="UserID"
                        placeholder="Pranav Satam"
                        placeholderTextColor={COLORS.black}
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities("UserID")}
                    />
                    <Text style={styles.inputHeader}>Password</Text>
                    <Input 
                        id="Password"
                        placeholder="*********"
                        placeholderTextColor={COLORS.black}
                        onInputChanged={inputChangedHandler}
                        errorText={formState.inputValidities("Password")}
                        secureTextEntry={true}
                        autoCapitalize="none"
                    />
                    <Button
                        title="Log In"
                        isLoading={isLoading}
                        onPress={()=>navigation.navigate("Login")}
                    />
                </KeyboardAwareScrollView>
            </View>
        </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
        color: COLORS.white
    },
    subHeaderTitle: {
        ...FONTS.body4,
        color: COLORS.white,
        marginVertical: SIZES.padding,
        textAlign: "center"
    },
    inputHeader: {
        ...FONTS.body4,
        textTransform: "uppercase",
        marginVertical: 4
    }
})

export default Register