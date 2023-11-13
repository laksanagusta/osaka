import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, config, fonts } from '../../../utils'
import { useDispatch } from 'react-redux';
import { decrementItem, incrementItem, setBasket, setIsLoading } from '../../../store/slices/cartSlice';
import { Gap } from '../../atoms';
import { dataHelper } from '../../../_helper/data';
import { cartServices } from '../../../_services/cart';
import _ from 'lodash';

const Item = ({title, qty, code, price, showActions, isLoading, itemId, user, url}) => {

  const helper = new dataHelper();
  const dispatch = useDispatch()

  const cartServ = new cartServices()

  const [newQty, setNewQty] = useState(qty)

  useEffect(() => {
    const timer = setTimeout(async () => {
      cart = await cartServ.updateCartItem(newQty, itemId, user)
      activeCart = await cartServ.getActiveCart(user)
      dispatch(setBasket(activeCart.data))
      dispatch(setIsLoading(false))
    }, 250)

    return(() => {
      clearTimeout(timer)
    })
  }, [newQty])

  const handleDecrement = async () => {
    dispatch(setIsLoading(true))
    setNewQty(newQty-1)
  }

  const handleIncrement = async () => {
    dispatch(setIsLoading(true))
    setNewQty(newQty+1)
  }

  return (
    <View style={styles.list}>
      <View style={styles.contentLeft}>
        <Image 
          source={{ uri : config.url +"/"+ url}}
          style={styles.image}
        />
        <View style={styles.contentMid}>
          <Text style={styles.code}>ID {code}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>IDR {helper.formatNumber(price)}</Text>
        </View>
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
        {
            <Text style={styles.qty}>{newQty}</Text>
        }
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
  image: {
    width: 80, // Set the width as per your requirement
    height: 80, // Set the height as per your requirement
    borderRadius: 10
  },
  edit: {
    fontSize:14,
    color:colors.text.primary,
    fontFamily: fonts.primary[700]
  },
  title: {
    fontSize:14,
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
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white
  },
  contentLeft:{
    flexDirection:'row'
  },
  contentRight:{
    flexDirection:'row',
    alignItems:'flex-end',
    height:'100%',
    marginRight:-14
  },
  contentMid:{
    marginLeft:20
  },
  actionButton: {
    fontSize:16,
    color:colors.text.secondary,
    fontFamily: fonts.primary[700],
    width:22,
    heiht:22,
    marginHorizontal:14,
    borderColor:colors.border,
    backgroundColor:colors.button.secondary.background,
    borderWidth:1,
    borderRadius:4,
    justifyContent:"center",
    alignItems:"center",
    borderRadius: 50
  },
  actionButtonText: {
    fontSize:16,
    color:colors.mainColors,
    fontFamily: fonts.primary[700]
  }
})