import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../../utils'
import { IconBackButton } from '../../../assets'

const Header = ({title, onPress}) => {
  return (
    <View style={styles.content}>
      <TouchableOpacity onPress={onPress} style={styles.backButton}>
        <IconBackButton/>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  content: {
    paddingHorizontal:16,
    paddingVertical:20,
    flexDirection:'row',
    backgroundColor:colors.mainColors
  },
  title: {
    fontSize:20,
    fontFamily:fonts.primary[700],
    color:colors.white
  },
  backButton: {
    marginRight:10
  }
})