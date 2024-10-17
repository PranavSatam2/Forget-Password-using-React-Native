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
import Input from '../components/Input'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Checkbox from 'expo-checkbox'

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

const PasswordResetSuccessfully = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [formState, dispatchFormState] = useReducer(reducer,initalState)
    const [isChecked, setChecked] = useState(false)

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
                <Text style={styles.headerTitle}>Login Successfully</Text>
                <Text style={styles.subHeaderTitle}>It's mandatory for you to set a new password,</Text>
                <Text style={styles.subHeaderTitle}>which is not the same as the password provided by the admin</Text>
            </View>
            <View style={styles.footer}>
                <KeyboardAwareScrollView>
                    <Text style={styles.inputHeader}>Password Reset Successfully</Text>
                    <Text style={styles.inputHeader}>Your password has been Successfully Reset</Text>
                    <Text style={styles.inputHeader}>Click below to login with credential</Text>
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
    },
    checkedContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 18
    },
    checkbox: {
        marginRight: 8,
        height: 16,
        width: 16
    }
})

export default PasswordResetSuccessfully