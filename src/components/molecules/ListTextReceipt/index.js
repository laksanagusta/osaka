import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../../utils'
import { dataHelper } from '../../../_helper/data'
import { Skeleton } from '@rneui/base'

const ListTextReceipt = ({leftText, rightText, isLoading}) => {

  const helper = new dataHelper()

  return (
    <View style={styles.list}>
      <View style={styles.contentLeft}>
        <Text style={styles.text}>{leftText}</Text>
      </View>

      {
        isLoading ? (
          <Skeleton
            animation="wave"
            width={80}
            height={20}
          />
        ) : (
          <View style={styles.contentRight}>
            <Text style={styles.text}>{isNaN(rightText) ? rightText : helper.formatNumber(rightText)}</Text>
          </View>
        )
      }
    </View>
  )
}

export default ListTextReceipt

const styles = StyleSheet.create({
  text: {
    fontSize:14,
    color:colors.text.primary,
    fontFamily: fonts.primary[600]
  },
  list: {
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  contentRight:{
    flexDirection:'row'
  }
})