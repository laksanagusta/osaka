import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../../utils'
import { Gap } from '../../atoms'

const ItemOrders = ({orderNumber, grandTotal, createdAt, onPress}) => {
  return (
    <View style={styles.content}>
      <Text style={styles.title}>{orderNumber}</Text>
      <Gap height={8}/>
      <Text style={styles.grandTotal}>IDR {grandTotal}</Text>
      <Gap height={8}/>
      <Text style={styles.subTitle}>{createdAt}</Text>
      <Gap height={10}/>
      <Text onPress={onPress} style={styles.detail}>SEE DETAILS</Text>
    </View>
  )
}

export default ItemOrders

const styles = StyleSheet.create({
  content : {
    padding:10,
    backgroundColor:colors.white,
    marginBottom:16,
    borderBottomWidth:1,
    borderBottomColor:colors.border
  },
  title : {
    fontFamily:fonts.primary['400'],
    fontSize:12,
    color:colors.text.primary
  },
  subTitle : {
    fontFamily:fonts.primary['400'],
    fontSize:12,
    color:colors.text.primary
  },
  detail : {
    fontFamily:fonts.primary['700'],
    fontSize:12,
    color:colors.mainColors
  },
  grandTotal : {
    fontFamily:fonts.primary['600'],
    fontSize:16,
    color:colors.text.primary
  }
})