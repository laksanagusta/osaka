import React, { useEffect, useState } from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, Gap, ListTextReceipt, Item } from '../../components';
import { colors, config, fonts, getData, showError, showSuccess } from '../../utils';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { useDispatch } from 'react-redux';
import { addItem, clearItem } from '../../store/slices/cartSlice';
import { useSelector } from "react-redux"
import { orderServices } from '../../_services/order';
import { dataHelper } from '../../_helper/data';
import { productServices } from '../../_services/product';

const Home = ({navigation}) => {
    const [isScanning, setIsScanning] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState([]);

    const {basket, subTotal} = useSelector((state) => state.cart)

    const orderServ     = new orderServices();
    const productServ   = new productServices()
    const dataHelpers   = new dataHelper();

    const dispatch = useDispatch();

    const _getProductByCode = async (e) => {
        setIsLoading(true);
        const response = await productServ.getProductByCode(e.data, user)
        dispatch(addItem(response))
        setIsLoading(false)
    };

    const _placeOrder = async () => {
        setIsLoading(true);

        const reqBody = JSON.stringify({
            order: {
                status: "done",
                grandTotal: subTotal,
                customerName: "",
                userId: user.id,
                orderNumber: dataHelpers.randomizeString(8).toUpperCase()
            },
            basket
        })

        const newOrder = await orderServ.saveOrder(reqBody, user);

        dispatch(clearItem());

        setIsLoading(false);

        navigation.navigate('OrderDetail', newOrder)
    }

    useEffect (() => {
        getDataUserFromLocal();
    }, []);

    const getDataUserFromLocal = () => {
        getData('user').then(res => {
            setUser(res);
        })
    }

    return !isScanning ? (
        <View style={styles.page}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
                <Button type="primary" title="SCAN" onPress={() => setIsScanning(true)}/>
                <Gap height={20}/>
                <View>        
                    {
                        basket.map(items => {
                            return (
                                <Item
                                    key={items.id}
                                    title={items.title}
                                    qty={items.qty}
                                    code={items.code}
                                    price={items.unitPrice}
                                    productId={items.id}
                                    navigation={navigation}
                                    showActions={true}
                                />
                            )
                        })
                    }
                </View>
                <Gap height={30}/>
                {
                    basket.length > 0 ? (
                        <View>
                            <ListTextReceipt leftText="Item Count" rightText={basket.length}/>
                            <ListTextReceipt leftText="Grandtotal" rightText={subTotal}/>
                            <Gap height={20}/>
                            <Button type="primary" title="Place Order" onPress={_placeOrder} disabled={isLoading}/>
                        </View>
                    ) : (
                        <View>
                            <Gap height={200}/>
                            <Text style={styles.title}>Item is Empty, scan to start transaction.</Text> 
                        </View>
                    ) 
                }
            </ScrollView>
        </View> ) : (
            <QRCodeScanner
                onRead={_getProductByCode}
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
    subTotal : {
        color: colors.text.primary
    },
    scroll: {
        backgroundColor:colors.white, 
        flex:1, 
        paddingHorizontal:10,
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