import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, {useState} from 'react'
import { colors, fonts } from '../../../utils'

const Input = ({label, value, onChangeText, secureTextEntry, disable, placeholder, keyboardType}) => {
  const [border, setBorder] = useState(colors.border)
  const onFocusForm = () => {
      setBorder(colors.tertiary)
  }
  const onBlurForm = () => {
      setBorder(colors.border)
  }
  return (
    <View>
        <Text style={styles.label}>{label}</Text>
        { 
          keyboardType == "numeric" ? <TextInput 
            onFocus={onFocusForm} 
            onBlur={onBlurForm} 
            secureTextEntry={secureTextEntry} 
            style={styles.input(border)} 
            value={value} 
            placeholder={placeholder}
            onChangeText={onChangeText} 
            editable={!disable} 
            selectTextOnFocus={!disable}
            keyboardType="numeric"
          /> : <TextInput 
            onFocus={onFocusForm} 
            onBlur={onBlurForm} 
            secureTextEntry={secureTextEntry} 
            style={styles.input(border)} 
            value={value} 
            placeholder={placeholder}
            onChangeText={onChangeText} 
            editable={!disable} 
            selectTextOnFocus={!disable}
          />
        }
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
    input: border => ({
        borderBottomWidth:1,
        borderColor: border,
        color:colors.text.primary,
        fontFamily: fonts.primary[400]
    }),
    label: {
        fontSize: 14,
        color: colors.text.primary,
        marginBottom: 6,
        fontFamily: fonts.primary[400]
    }
})