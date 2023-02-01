import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, config, fonts, getData, showError, showSuccess, useForm } from '../../../utils'
import { Button, Gap, Header, Input } from '../../../components'
import QRCodeScanner from 'react-native-qrcode-scanner'
import { productServices } from '../../../_services/product'

const EditProduct = ({navigation}) => {
    const [productId, setProductId] = useState(null);
    const [productCode, setProductCode] = useState(null);
    const [title, setTitle] = useState(null);
    const [price, setPrice] = useState(null);
    const [description, setDescription] = useState(null);

    const [user, setUser] = useState([]);
    const [isScanning, setIsScanning] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const productServ = new productServices()

    useEffect (() => {
        getDataUserFromLocal();
    }, []);

    const onSuccess = async e => {
        setIsLoading(true);
        const productRes = await productServ.getProductByCode(e.data, user)

        setProductId(productRes.id)
        setProductCode(productRes.code)
        setTitle(productRes.title)
        setDescription(productRes.description)
        setPrice(String(productRes.unitPrice))

        setIsLoading(false);
        setIsScanning(false)
    };

    const getDataUserFromLocal = () => {
        getData('user').then(res => {
            setUser(res);
        })
    }

    const _saveProduct = async () => {
        setIsLoading(true);

        const reqBody = {
            code:productCode,
            title:title, 
            unitPrice:parseInt(price),
            description:"description"
        }

        await productServ.saveProduct(JSON.stringify(reqBody), user, productId)

        setIsLoading(false);
    };

    return !isScanning ?  (
        <View style={styles.page}>
            <Header title="Update Product" onPress={() => navigation.goBack()}/>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
                <Button type="secondary" title="Scan" onPress={() => setIsScanning(true)}/>
                <Gap height={24}/>
                <Input label='Product ID' value={productCode} onChangeText={value => setProductCode(value)} disable/>
                <Gap height={24}/>
                <Input label='Title' value={title} onChangeText={value => setTitle(value)}/>
                <Gap height={24}/>
                <Input label='Price' value={price} onChangeText={value => setPrice(value)} keyboardType='numeric'/>
                <Gap height={38}/>
                <Button type="primary" title="Save" onPress={_saveProduct} disabled={isLoading}/>
            </ScrollView>
        </View>
    ) : (
        <QRCodeScanner
            onRead={onSuccess}
            showMarker={true}
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

export default EditProduct

const styles = StyleSheet.create({
    page: {
        backgroundColor:colors.white, 
        flex:1
    },
    scroll: {
        backgroundColor:colors.white, 
        flex:1, 
        paddingHorizontal:16,
        paddingTop:24
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