import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../../utils'

const ListTextReceipt = ({leftText, rightText}) => {

  return (
    <View style={styles.list}>
      <View style={styles.contentLeft}>
        <Text style={styles.text}>{leftText}</Text>
      </View>
      <View style={styles.contentRight}>
        <Text style={styles.text}>{rightText}</Text>
      </View>
    </View>
  )
}

export default ListTextReceipt

const styles = StyleSheet.create({
  text: {
    fontSize:16,
    color:colors.text.primary,
    fontFamily: fonts.primary[700]
  },
  list: {
    paddingHorizontal:12,
    marginBottom:12,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  contentRight:{
    flexDirection:'row'
  }
})