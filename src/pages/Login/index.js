import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button, Gap, Input } from '../../components';
import { storeData, useForm } from '../../utils';
import { userServices } from '../../_services/user';

const Login = ({navigation}) => {
    const [form, setForm] = useForm({
        email : null,
        password : null,
    })

    const [isLoading, setIsLoading] = useState(false)

    const userSvc = new userServices();

    const _signIn = async () =>  {
        setIsLoading(true);

        const reqBody = JSON.stringify({
            email:form.email, 
            password:form.password
        })

        try {
            const signInRes = await userSvc.signIn(reqBody)

            storeData('user', signInRes.data); 
            storeData('isLogin', true)
            navigation.replace('MainApp');
    
            setIsLoading(false)
            
        } catch (error) {
            setIsLoading(false)
        }


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