import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../../utils'
import { useDispatch } from 'react-redux';
import { decrementItem, incrementItem } from '../../../store/slices/cartSlice';
import { Gap } from '../../atoms';

const Item = ({title, qty, code, price, productId, showActions}) => {
  const dispatch = useDispatch()

  const handleDecrement = () => {
    dispatch(decrementItem(productId))
  }

  const handleIncrement = () => {
    dispatch(incrementItem(productId))
  }

  return (
    <View style={styles.list}>
      <View style={styles.contentLeft}>
        <Text style={styles.code}>ID {code}</Text>
        <Gap height={8}/>
        <Text style={styles.title}>{title}</Text>
        <Gap height={8}/>
        <Text style={styles.price}>IDR {price}</Text>
      </View>
      <View style={styles.contentRight}>
        {
          showActions ? (
            <TouchableOpacity style={styles.actionButton} onPress={handleDecrement}>
              <Text style={styles.actionButtonText}>-</Text>
            </TouchableOpacity>
          ) : (
            <></>
          )
        }
        <Text style={styles.qty}>{qty}</Text>
        {
          showActions ? (
            <TouchableOpacity style={styles.actionButton} onPress={handleIncrement}>
              <Text style={styles.actionButtonText}>+</Text>
            </TouchableOpacity>
          ) : (
            <></>
          )
        }
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
    fontSize:16,
    color:colors.text.secondary,
    fontFamily: fonts.primary[700]
  },
  price: {
    fontSize:12,
    color:colors.text.secondary,
    fontFamily: fonts.primary[500]
  },
  code: {
    fontSize:12,
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
  },
  contentRight:{
    flexDirection:'row',
    marginRight:-14
  },
  actionButton: {
    fontSize:16,
    color:colors.text.secondary,
    fontFamily: fonts.primary[700],
    width:20,
    heiht:20,
    marginHorizontal:14,
    borderColor:colors.border,
    backgroundColor:colors.button.secondary.background,
    borderWidth:1,
    borderRadius:4,
    justifyContent:"center",
    alignItems:"center"
  },
  actionButtonText: {
    fontSize:16,
    color:colors.mainColors,
    fontFamily: fonts.primary[700]
  }
})