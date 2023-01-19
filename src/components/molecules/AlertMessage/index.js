import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { fonts, colors } from '../../../utils'

const AlertMessage = ({message, type}) => {
  return (
    <View style={styles.content(type)}>
      <Text style={styles.text(type)}>{message}</Text>
    </View>
  )
}

export default AlertMessage

const styles = StyleSheet.create({
    text: (type) => ({
        fontFamily:fonts.primary[500],
        color:colors.white
    }), 
    content: (type) => ({
        padding:6,
        borderRadius:10,
        backgroundColor: type === "error" ? colors.error : colors.success
    })
})