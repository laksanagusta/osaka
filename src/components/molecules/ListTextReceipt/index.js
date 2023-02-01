import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../../utils'
import { dataHelper } from '../../../_helper/data'

const ListTextReceipt = ({leftText, rightText}) => {

  const helper = new dataHelper()

  return (
    <View style={styles.list}>
      <View style={styles.contentLeft}>
        <Text style={styles.text}>{leftText}</Text>
      </View>
      <View style={styles.contentRight}>
        <Text style={styles.text}>{isNaN(rightText) ? rightText : helper.formatNumber(rightText)}</Text>
      </View>
    </View>
  )
}

export default ListTextReceipt

const styles = StyleSheet.create({
  text: {
    fontSize:16,
    color:colors.text.primary,
    fontFamily: fonts.primary[600]
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