import { View, Text } from 'react-native'
import React from 'react'
import { COLORS,SIZES } from '../constants'
import { TextInput } from 'react-native-gesture-handler'

const input = (props) => {

  const onChangeText = (Text) => {
    props.onInputChanged(props.id,text)
  }
  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, { borderColor: "gray"}]}>
        <TextInput 
          {...props}
          style={styles.input}
          onChangeText={onChangeText}
          placeholder={props.placeholder}
          placeholderTextColor={props.placeholderTextColor}
        />
      </View>
      {
        props.errorText && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{props.errorText[0]}</Text>
          </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%"
  },
  inputContainer: {
    width: "100%",
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding2,
    borderRadius: 2,
    borderWidth: 7,
    marginVertical: 5,
    flexDirection: "row"
  },
  input: {
    color: COLORS.black,
    flex: 1,
    fontFamily: "regular",
    paddingTop: 0,
  },
  errorContainer: {
    marginVertical: 4
  },
  errorText: {
    color: "red",
    fontSize: 12
  }
})

export default input