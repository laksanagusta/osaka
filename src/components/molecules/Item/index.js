import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../../utils'
import { color } from 'react-native-reanimated'

const Item = ({title}) => {
  return (
    <View style={styles.list}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

export default Item

const styles = StyleSheet.create({
  title: {
    fontSize:16,
    color:colors.text.primary,
    fontFamily: fonts.primary[500]
  },
  list: {
    borderRadius:6,
    padding:6,
    marginBottom:6,
    borderWidth:1,
    borderColor:colors.border
  }
})