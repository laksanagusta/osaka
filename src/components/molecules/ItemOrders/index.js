import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../../utils'

const ItemOrders = ({id}) => {
  return (
    <View style={styles.content}>
      <Text style={title}>{id}</Text>
    </View>
  )
}

export default ItemOrders

const styles = StyleSheet.create({
  content : {
    backgroundColor:colors.white,
    flexDirection:'row',
    marginBottom:28
  },
})