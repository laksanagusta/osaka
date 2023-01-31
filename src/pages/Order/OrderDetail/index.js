import React, { useEffect, useState } from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, Gap, ListTextReceipt, Item } from '../../../components';
import { colors, fonts, getData } from '../../../utils';
import { orderServices } from '../../../_services/order';

const OrderDetail = ({navigation, route}) => {
    const newOrder = route.params;
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState([]);
    const [basketAndOrder, setBasketAndOrder] = useState([]);

    const orderServ = new orderServices();

    const getOrderDetails = async () => {
      setIsLoading(true)
      let response = await orderServ.getOrderById(user, newOrder.id)
      setBasketAndOrder(response)
      setIsLoading(false)
    }

    useEffect (() => {
      getDataUserFromLocal()
      getOrderDetails()
    }, []);

    const getDataUserFromLocal = () => {
        getData('user').then(res => {
            setUser(res);
        })
    }

    return (
      <View style={styles.page}>
          <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
              <View>          
                  {
                      basketAndOrder.map(items => {
                          return (
                              <Item
                                  key={items.id}
                                  title={items.product.title}
                                  qty={items.qty}
                                  code={items.code}
                                  price={items.unitPrice}
                                  productId={items.product.id}
                                  navigation={navigation}
                                  showActions={false}
                              />
                          )
                      })
                  }
              </View>
              <Gap height={30}/>
              {
                basketAndOrder.length > 0 && (
                  <View>
                      <ListTextReceipt leftText="Item Count" rightText={basketAndOrder.length}/>
                      <ListTextReceipt leftText="Grandtotal" rightText={basketAndOrder[0].order.grandTotal}/>
                  </View>
                )
              }
          </ScrollView>
      </View> 
    )
}

export default OrderDetail

const styles = StyleSheet.create({
    subTotal : {
        color: colors.text.primary
    },
    scroll: {
        backgroundColor:colors.white, 
        flex:1, 
        paddingHorizontal:16,
        paddingTop:24
    },
    page : {
        backgroundColor:colors.tabBar, flex:1
    },
    background : {
        height:414,
        padding:28
    },
    title : {
        fontSize:24, 
        fontFamily:fonts.primary[600], color:colors.white
    }, 
    desc : {
        fontSize:14,
        fontFamily:fonts.primary[300],
        color:colors.white,
        textAlign:'center',
        marginTop:6,
        color:colors.text.subTitle
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
        fontFamily:fonts.primary[600]
    },
    buttonTouchable: {
        padding: 16,
    }
})