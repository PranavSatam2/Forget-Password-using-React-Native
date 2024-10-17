import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { COLORS, SIZES, FONTS } from '../constants'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Button = () => {
    const isLoading = props.isLoading | false
  return (
    <TouchableOpacity 
        style={{
        ...styles.btn,
        ...props.styles
    }}

    onPress={props.onPress}
    >
        {
            isLoading && isLoading == true ? (
              <ActivityIndicator size="small" color={COLORS.white} />
            ) : (
              <Text style={{ ...FONTS.body2, color: COLORS.white}}>{props.title}</Text>
            )
        }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    btn: {
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding,
        borderColor: COLORS.primary,
        borderWidth: 1,
        borderRadius: SIZES.padding,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.primary,
        marginVertical: 12
    }
})

export default Button