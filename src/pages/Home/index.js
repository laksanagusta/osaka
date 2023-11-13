import React, { useEffect, useState } from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import { Button, Gap, ListTextReceipt, Item, Input, ScanInput, FloatActionButton } from '../../components';
import { colors, config, fonts, getData, showError, showSuccess } from '../../utils';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { useDispatch } from 'react-redux';
import { addItem, clearItem, setIsLoading, setBasket } from '../../store/slices/cartSlice';
import { useSelector } from "react-redux"
import { productServices } from '../../_services/product';
import { cartServices } from '../../_services/cart';
import _ from 'lodash';
import { Skeleton } from '@rneui/themed';

const Home = ({navigation}) => {
    const [isScanning, setIsScanning] = useState(false)
    const [user, setUser] = useState([]);
    const [code, setCode] = useState("")

    const {basket, subTotal, isLoading} = useSelector((state) => state.cart)

    const productServ   = new productServices()
    const cartServ      = new cartServices()

    const dispatch = useDispatch();

    const _addToCart = async (e) => {
        dispatch(setIsLoading(true))
        const userData = await getUserDataFromLocal()
        if (userData) {
            try {
                const activeCart = await cartServ.getActiveCart(userData)
                if (activeCart.meta.code == 422){
                    const newEmptyCart = await cartServ.createEmptyCart(userData)
                    const product = await productServ.getProductByCode(e.data, userData)
        
                    const buildAddItem = {
                        product : product,
                        cartId : newEmptyCart.id,
                        user : userData
                    }
    
                    cart = await cartServ.addToCart(buildAddItem)
                    dispatch(setBasket(cart))
    
                    return
                }

                const product = await productServ.getProductByCode(e.data, userData)

                const buildAddItem = {
                    product : product,
                    cartId : activeCart.data.id,
                    user : userData
                }
    
                cart = await cartServ.addToCart(buildAddItem)
                dispatch(setBasket(cart))
        
                dispatch(setIsLoading(false))
        
                return
            } catch (error) {
                dispatch(setIsLoading(false))
                showError(error.message)
            }
        }
    };

    useEffect (() => {
        _getCart()
    }, []);

    const getUserDataFromLocal = async () => {
        try {
          const userData = await getData('user'); // Replace 'userData' with your specific key
          if (userData) {
            setUser(userData)
            return userData
          }
          return null;
        } catch (error) {
          console.error('Error reading user data from local storage:', error);
          return null;
        }
    };

    const _getCart = async () => {
        dispatch(setIsLoading(true))
        const userData = await getUserDataFromLocal()
        if (userData) {
            try {
                const activeCart = await cartServ.getActiveCart(userData)
                dispatch(setBasket(activeCart.data))
                dispatch(setIsLoading(false))
            } catch (error) {
                console.error('API request error:', error);
                dispatch(setIsLoading(false))
            }
        }
    }

    return !isScanning ? (
        <GestureHandlerRootView style={styles.page}>
            <FloatActionButton onPress={() => setIsScanning(true)}/>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
                <Gap height={20}/>
                <View>        
                    {    
                        basket?.cartItems?.map((items, index) => {
                            return (
                                <Item
                                    index={index}
                                    key={items.id}
                                    title={items.product.title}
                                    qty={items.qty}
                                    code={items.product.serialNumber}
                                    price={items.unitPrice}
                                    productId={items.id}
                                    navigation={navigation}
                                    showActions={true}
                                    isLoading={isLoading}
                                    itemId={items.id}
                                    user={user}
                                    url={items.product.images.length > 0 ? items.product.images[0].url : ""}
                                />
                            )
                        })
                    }
                </View>
                <Gap height={26}/>
                {
                    basket?.cartItems?.length > 0 ? (
                        <View style={styles.totalCard}>
                            <ListTextReceipt leftText="Item Count" rightText={basket.TotalItem} isLoading={isLoading}/>
                            <Gap height={6}/>
                            <ListTextReceipt leftText="Grandtotal" rightText={basket.baseAmount} isLoading={isLoading}/>
                            <Gap height={20}/>
                            <Button type={ !isLoading ? "primary" : "secondary"} title="place order" disabled={isLoading}/>
                        </View>
                    ) : (
                        <View>
                            <Gap height={200}/>
                            <Text style={styles.title}>Item is Empty, scan to start transaction.</Text> 
                        </View>
                    ) 
                }
            </ScrollView>
        </GestureHandlerRootView> ) : (
            <QRCodeScanner
                onRead={_addToCart}
                reactivate={true}
                showMarker={true}
                reactivateTimeout={2000}
                bottomContent={
                    <>
                        <TouchableOpacity style={styles.buttonTouchable} onPress={() => setIsScanning(false)}>
                            <Text style={styles.buttonText}>Stop</Text>
                        </TouchableOpacity>
                    </>
                }
            />
    )
}

export default Home

const styles = StyleSheet.create({
    totalCard: {
        backgroundColor: colors.white,
        padding: 12,
    },
    scanComponent : {
        flexDirection: "row",
        flex: 1
    },
    subTotal : {
        color: colors.text.primary
    },
    scroll: {
        backgroundColor:colors.background, 
        flex:1, 
        paddingVertical:10,
    },
    page : {
        backgroundColor:colors.tabBar, flex:1
    },
    background : {
        height:414,
        padding:28
    },
    title : {
        fontSize:14,
        textAlign:'center',
        fontFamily:fonts.primary[600], 
        color:colors.text.secondary
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