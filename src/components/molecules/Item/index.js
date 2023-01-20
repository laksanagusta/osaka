import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../../utils'
import { color } from 'react-native-reanimated'

const Item = ({title, qty, code, price}) => {
  return (
    <View style={styles.list}>
      <View style={styles.contentLeft}>
        <Text style={styles.code}>ID {code}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>IDR {price}</Text>
        <Text style={styles.qty}>qty : {qty}</Text>
      </View>
      <View style={styles.contentRight}>
        <Text style={styles.edit}>Edit</Text>
      </View>
    </View>
  )
}

export default Item

const styles = StyleSheet.create({
  edit: {
    fontSize:14,
    color:colors.text.primary,
    fontFamily: fonts.primary[700]
  },
  title: {
    fontSize:16,
    color:colors.text.primary,
    fontFamily: fonts.primary[700]
  },
  qty: {
    fontSize:12,
    color:colors.text.secondary,
    fontFamily: fonts.primary[500]
  },
  price: {
    fontSize:12,
    color:colors.text.secondary,
    fontFamily: fonts.primary[500]
  },
  code: {
    fontSize:10,
    color:colors.text.secondary,
    fontFamily: fonts.primary[400]
  },
  list: {
    padding:12,
    marginBottom:6,
    borderBottomWidth:1,
    borderColor:colors.border,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})