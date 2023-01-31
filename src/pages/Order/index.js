import React, { useEffect, useState } from 'react'
import {StyleSheet, Text, View} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { ItemOrders } from '../../components';
import { colors, config, fonts, getData, showError, showSuccess } from '../../utils';
import { orderServices } from '../../_services/order';

const Order = ({navigation}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState([]);

    const [orders, setOrders] = useState([])

    const orderServ = new orderServices()

    const getOrders = async () => {
        setIsLoading(true);
        let ordersResponse = await orderServ.getOrders(user)
        setOrders(ordersResponse)
        setIsLoading(false);
    };

    useEffect (() => {
        getDataUserFromLocal();
        getOrders()
    }, []);

    const getDataUserFromLocal = () => {
        getData('user').then(res => {
            setUser(res);
        })
    }

    return (isLoading ? (
        <View>
            <Text>...</Text>
        </View>
    ) : (orders.length > 0 ? (
            <View style={styles.page}>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
                    <View>          
                        {
                            orders.map(items => {
                                return (
                                    <ItemOrders key={items.id}/>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </View> ) : <View>
                <Text>Not found orders</Text>
            </View>
        )
    )
}

export default Order

const styles = StyleSheet.create({
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
    }
})