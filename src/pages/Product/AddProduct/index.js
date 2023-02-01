import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, config, fonts, getData, showError, showSuccess, useForm } from '../../../utils'
import { Button, Gap, Header, Input } from '../../../components'
import QRCodeScanner from 'react-native-qrcode-scanner'

const AddProduct = ({navigation}) => {
    const [productCode, setProductCode] = useState('');
    const [form, setForm] = useForm({
        title : null,
        price: null,
        description: null
    });
    const [user, setUser] = useState([]);
    const [isScanning, setIsScanning] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect (() => {
        getDataUserFromLocal();
    }, []);

    const onSuccess = e => {
        setProductCode(e.data)
        setForm('reset')
        setIsScanning(false)
    };

    const getDataUserFromLocal = () => {
        getData('user').then(res => {
            setUser(res);
        })
    }

    const _saveProduct = () => {
        setIsLoading(true);
        fetch(config.url+'/api/v1/products', {
            method: 'POST',
            headers: {  
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer '+user.token
            },
            body: JSON.stringify({
                code:productCode,
                title:form.title, 
                unitPrice:parseInt(form.price),
                description:"form.description"
            }),
        })        
        .then(response => response.json())
        .then(res => {
            setIsLoading(false);
            if(res.meta.code !== 200){
                showError(res.meta.message)
            } 
            else{
                showSuccess(res.meta.message)
            }  
        })
        .catch((error) => {
            setIsLoading(false);
            showError(error.message)
        })
    };

    return !isScanning ?  (
        <View style={styles.page}>
            <Header title="Create Product" onPress={() => navigation.goBack()}/>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
                <Button type="secondary" title="Scan" onPress={() => setIsScanning(true)}/>
                <Gap height={24}/>
                <Input label='Product ID' value={productCode} onChangeText={value => setProductCode(value)} disable/>
                <Gap height={24}/>
                <Input label='Name' value={form.title} onChangeText={value => setForm('title', value)}/>
                <Gap height={24}/>
                <Input label='Price' value={form.price} onChangeText={value => setForm('price', value)} keyboardType='numeric'/>
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

export default AddProduct

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
    }
})