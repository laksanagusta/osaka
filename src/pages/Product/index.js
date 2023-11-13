import React, { useEffect, useState } from 'react'
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native'
import { CardProduct, Gap, SearchProduct } from '../../components'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'
import { colors } from '../../utils'
import { productServices } from '../../_services/product'
import { useDispatch, useSelector } from 'react-redux'
import { setProducts } from '../../store/slices/productSlice'
import { setIsLoading } from '../../store/slices/cartSlice'
import { ActivityIndicator } from 'react-native'


const Product = () => {
    const {products} = useSelector((state) => state.product)
    const {isLoading} = useSelector((state) => state.cart)

    useEffect(() => {
        loadProducts()
    }, [])

    const productServ   = new productServices()

    const dispatch = useDispatch()

    const loadProducts = async () => {
        const userDummy = {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVudGlzQGdtYWlsLmNvbSIsInVzZXJfaWQiOjF9.nRk_vimVr98VmmyEvcj_O99Aj2dUA7CVbDZ_2wFBRGE"
        }

        const productsData = await productServ.getProducts(userDummy)
        if(productsData){
            dispatch(setProducts(productsData))
        }   
    }

    const loadMore = () => {
        dispatch(setIsLoading(true))

        setTimeout(() => {
            dispatch(setIsLoading(false))
        }, 2000)
    }

    const renderFooter = () => {
        return isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Gap height={30}/>
          </View>
        ) : <Gap height={20}/>;
      };

    return (
        <View style={styles.page}>
            <View style={styles.sProductWrapper}>
                <SearchProduct placeholder="search products"/>
            </View>
            <FlatList
                style={styles.scroll}
                data={products} 
                numColumns={2}
                keyExtractor={e => e}
                renderItem={({item}) => (
                    <CardProduct price={item.unitPrice} title={item.title} description={item.description} url={item.images.length > 0 ? item.images[0].url : ""}/>
                )}
                onEndReached={loadMore}
                ListFooterComponent={renderFooter}
            />
        </View>
    )
}

export default Product

const styles = StyleSheet.create({
    page: {
        backgroundColor:colors.white, 
        flex:1
    },
    scroll: {
        padding:20,
        backgroundColor:colors.background, 
        flex:1
    },
    loadingContainer: {
        padding: 10,
        alignItems: 'center',
    },
    sProductWrapper : {
        padding:20
    }
})