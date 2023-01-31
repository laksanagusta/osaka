import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils';

const Button = ({title, type, onPress, disabled}) => {
  return (
      <TouchableOpacity style={styles.container(type)} onPress={onPress} disabled={disabled}>
        <Text style={styles.text(type)}>{disabled ? "...." : title}</Text>
      </TouchableOpacity>
  )
}

export default Button;

const styles = StyleSheet.create({
    container: (type) => ({
        backgroundColor: type === 'secondary' ? colors.button.secondary.background : colors.button.primary.background,
        paddingVertical: 20,
        borderRadius:6
    }),
    text: (type) => ({
        fontSize:16,
        textAlign:'center',
        color: type === 'secondary' ? colors.button.secondary.text : colors.button.primary.text,
        fontFamily: fonts.primary[700]
    })
})