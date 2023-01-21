import React, { useEffect, useState } from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, Gap, ListTextReceipt } from '../../components';
import Item from '../../components/molecules/Item';
import { colors, config, fonts, getData, showError, showSuccess } from '../../utils';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { useDispatch } from 'react-redux';
import { addItem } from '../../store/slices/cartSlice';
import { useSelector } from "react-redux"

const Home = ({navigation}) => {
    const [isScanning, setIsScanning] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState([]);

    const {isCartOpen, cartItems, subTotal} = useSelector((state) => state.cart)

    const dispatch = useDispatch();

    const _getProductByCode = e => {
        setIsLoading(true);
        fetch(config.url+'/api/v1/products/code/'+e.data, {
            method: 'GET',
            headers: {  
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer '+user.token
            }
        })        
        .then(response => response.json())
        .then(res => {
            setIsLoading(false);
            if(res.meta.code !== 200){
                showError(res.meta.message)
            } 
            else{
                dispatch(addItem(res.data))
                showSuccess(res.meta.message)
            }  
        })
        .catch((error) => {
            setIsLoading(false);
            showError(error.message)
        })
    };

    useEffect (() => {
        getDataUserFromLocal();
    }, [cartItems]);

    const getDataUserFromLocal = () => {
        getData('user').then(res => {
            setUser(res);
        })
    }

    return !isScanning ? (
        <View style={styles.page}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
                <Button type="primary" title="Scan" onPress={() => setIsScanning(true)}/>
                <Gap height={20}/>
                <View>          
                    {
                        cartItems.map(items => {
                            return (
                                <Item
                                    key={items.id}
                                    title={items.title}
                                    qty={items.qty}
                                    code={items.code}
                                    price={items.unitPrice}
                                    productId={items.id}
                                    navigation={navigation}
                                />
                            )
                        })
                    }
                </View>
                <Gap height={30}/>
                {
                    cartItems.length > 0 && (
                        <View>
                            <ListTextReceipt leftText="Item Count" rightText={cartItems.length}/>
                            <ListTextReceipt leftText="Grandtotal" rightText={subTotal}/>
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