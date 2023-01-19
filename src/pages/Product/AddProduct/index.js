import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, config, fonts, getData, showError, showSuccess, useForm } from '../../../utils'
import { Button, Gap, Input } from '../../../components'
import QRCodeScanner from 'react-native-qrcode-scanner'

const AddProduct = () => {
    const [form, setForm] = useForm({
        productId : '',
        title : '',
        price: 0,
        description: ''
    });
    const [user, setUser] = useState([]);
    const [isScanning, setIsScanning] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect (() => {
        getDataUserFromLocal();
    }, []);

    const onSuccess = e => {
        setForm('productId', e.data);
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
                code:form.productId,
                title:form.title, 
                unitPrice:parseInt(form.price),
                description:form.description
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
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
                <Button type="secondary" title="Scan" onPress={() => setIsScanning(true)}/>
                <Gap height={24}/>
                <Input label='Product ID' value={form.productId} onChangeText={value => setForm('productId', value)} disable/>
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