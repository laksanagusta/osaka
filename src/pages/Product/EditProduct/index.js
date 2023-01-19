import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, config, getData, useForm } from '../../../utils'
import { Button, Gap, Input } from '../../../components'
import QRCodeScanner from 'react-native-qrcode-scanner'

const EditProduct = () => {
    const [form, setForm] = useForm({
        productId : '',
        title : '',
        price: 0,
        description: ''
    })
    const [user, setUser] = useState([]);
    const [isScanning, setIsScanning] = useState(false)

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
        console.log(user.token);
        fetch(config.url+'/api/v1/products', {
            method: 'POST',
            headers: {  
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer '+user.token
            },
            body: JSON.stringify({
                title:form.title, 
                unitPrice:parseInt(form.price),
                description:form.description
            }),
        })        
        .then(response => response.json())
        .then(res => {
            console.log(res.data)
            // dispatch({type:'SET_LOADING', value:false})
            // if(res.meta.code != 200){
                // alert('empty')
                // showError('Cannot found your credentials');
            // } 
            // else{
            //     storeData('user', res.data); 
            //     storeData('isLogin', true)
            //     navigation.replace('MainApp');
            // }  
        })
        .catch((error) => {
            // console.log(error.message);
            // alert(error.message)
            // dispatch({type:'SET_LOADING', value:false})
            // showError(error.message);
        })
    };

    return !isScanning ?  (
        <View style={styles.page}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
                <Input label='Product ID' value={form.productId} onChangeText={value => setForm('productId', value)} disable/>
                <Gap height={24}/>
                <Input label='Name' value={form.title} onChangeText={value => setForm('title', value)}/>
                <Gap height={24}/>
                <Input label='Price' value={form.price} onChangeText={value => setForm('price', value)} keyboardType='numeric'/>
                <Gap height={38}/>
                <Button type="primary" title="Save" onPress={_saveProduct}/>
                <Gap height={16}/>
                <Button type="primary" title="Scan" onPress={() => setIsScanning(true)}/>
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
})