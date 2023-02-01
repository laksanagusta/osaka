import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../../utils'
import { IconOptionBlue, IconOptionGreen, IconOptionPurple } from '../../../assets'

const Menu = ({title, onPress, icon}) => {

  const Icon = () => {
    switch(icon) {
      case "green" :
        return <IconOptionGreen/>
      case "blue" :
        return <IconOptionBlue/>
      case "purple" :
        return <IconOptionPurple/>
      default :
        return <IconOptionBlue/>
    }
  }

  return (
    <TouchableOpacity style={styles.list} onPress={onPress}>
      <Icon/>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Menu

const styles = StyleSheet.create({
  title: {
    fontSize:16,
    color:colors.text.primary,
    fontFamily: fonts.primary[600], 
    marginLeft: 10
  },
  list: {
    borderRadius:6,
    padding:10,
    marginBottom:6,
    flexDirection:'row',
    alignItems:'center'
  }
})