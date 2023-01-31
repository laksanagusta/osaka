import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button, Gap, Input } from '../../components';
import { config, showError, storeData, useForm } from '../../utils';

const Login = ({navigation}) => {
    const [form, setForm] = useForm({
        email : '',
        password : '',
    })

    const [isLoading, setIsLoading] = useState(false)

    const _signIn = async () =>  {
        setIsLoading(true);

        await fetch(config.url+'/api/v1/sessions', {
            method: 'POST',
            headers: {  
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({email:form.email, password:form.password}),
        })        
        .then(response => response.json())
        .then(res => {
            if(res.meta.code != 200){
                showError(res.meta.message);
            } 
            else{
                storeData('user', res.data); 
                storeData('isLogin', true)
                navigation.replace('MainApp');
            }  
        })
        .catch((error) => {
            console.log(error.message);
        })

        setIsLoading(false)
    }

    return (
        <View style={styles.page}>
            <View style={styles.content}>
                <Gap height={200}/>
                <View>
                    <Input label='Username' value={form.email} onChangeText={value => setForm('email', value)}/>
                    <Gap height={24}/>
                    <Input label='Password' value={form.password} onChangeText={value => setForm('password', value)} secureTextEntry/>
                    <Gap height={40}/>
                    <Button title="Sign In" type="primary" onPress={_signIn} disabled={isLoading}/>
                </View>
            </View>
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    content : {
        paddingHorizontal:10,
    },
    text : {
        alignItems:'center'
    },
    page : {
        backgroundColor: 'white',
        flex:1
    }
})