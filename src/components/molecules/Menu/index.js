import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../../utils'

const Menu = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.list} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Menu

const styles = StyleSheet.create({
  title: {
    fontSize:16,
    color:colors.primary,
    fontFamily: fonts.primary[500]
  },
  list: {
    borderRadius:6,
    padding:10,
    marginBottom:6,
    borderBottomWidth:1,
    borderColor:colors.border
  }
})