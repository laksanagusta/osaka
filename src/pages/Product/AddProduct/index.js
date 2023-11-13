import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {Picker} from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react'
import { colors, config, fonts, getData, showError, showSuccess, useForm } from '../../../utils'
import { Button, Gap, Header, Input } from '../../../components'
import QRCodeScanner from 'react-native-qrcode-scanner'

const AddProduct = ({navigation}) => {
    const [productCode, setProductCode] = useState('');
    const [form, setForm] = useForm({
        title : null,
        price: null,
        description: null,
        category_id:null
    });
    const [user, setUser] = useState([]);
    const [isScanning, setIsScanning] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([])

    useEffect (() => {
        getCategories()
    }, []);

    const onSuccess = e => {
        setProductCode(e.data)
        setForm('reset')
        setIsScanning(false)
    };

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

    const getCategories = async () => {
        const userData = await getUserDataFromLocal()
        if (userData) {
            try {
                const response = await fetch(config.url+'/api/v1/categories', {
                    method: 'GET',
                    headers: {  
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': 'Bearer '+userData.token
                    }
                })
    
                if (response.ok) {
                    const data = await response.json();
                    setCategories(data.data)
                } else {
                    console.error('API request failed:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('API request error:', error);
            }
        }
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
                serialNumber:productCode,
                title:form.title, 
                unitPrice:parseInt(form.price),
                description:"form.description",
                attributes:[],
                categoryId:form.category_id ?? categories[0].id
            }),
        })        
        .then(response => response.json())
        .then(res => {
            setIsLoading(false);
            if(res.meta.code !== 200){
                showError(res.data.errors[0])
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
                <View style={styles.pickerwrapper}>
                    <Picker
                        style={styles.picker}
                        selectedValue={form.category_id}
                        onValueChange={(itemValue, itemIndex) => setForm("category_id",itemValue)}
                    >
                        {
                            categories.map(item => {
                                return (
                                    <Picker.Item key={item.id} label={item.title} value={item.id} />
                                )
                            })
                        }
                    </Picker>
                </View>
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
    }, 
    pickerwrapper: {
        borderWidth:1,
        borderColor: colors.border,
        backgroundColor: colors.grey0,
        borderRadius:10
    },
    picker: {
        color:colors.black,
        fontFamily: fonts.primary[400]
    }
})