import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../../../utils/colors';
import { fonts } from '../../../utils';

const FloatActionButton = ({title, type, onPress, disabled}) => {
  return (
      <TouchableOpacity style={styles.container(type)} onPress={onPress} disabled={disabled}>

      </TouchableOpacity>
  )
}

export default FloatActionButton;

const styles = StyleSheet.create({
    container: (type) => ({
        backgroundColor: type === 'secondary' ? colors.button.secondary.background : colors.button.primary.background,
        paddingVertical: 12,
        width:50,
        height:50,
        position: 'absolute',
        bottom: 20,
        right: 10,
        padding: 10,
        borderRadius: 30,
        zIndex: 1,
    }),
    text: (type) => ({
        fontSize:16,
        textAlign:'center',
        color: type === 'secondary' ? colors.button.secondary.text : colors.button.primary.text,
        fontFamily: fonts.primary[700]
    })
})