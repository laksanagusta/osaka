import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button, Gap, Input } from '../../components';
import { config, storeData, useForm } from '../../utils';

const Login = ({navigation}) => {
    const [form, setForm] = useForm({
        email : '',
        password : '',
    })

    const _signIn = () =>  {
        // dispatch({type:'SET_LOADING', value:true})
        fetch(config.url+'/api/v1/sessions', {
            method: 'POST',
            headers: {  
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({email:form.email, password:form.password}),
        })        
        .then(response => response.json())
        .then(res => {
            // dispatch({type:'SET_LOADING', value:false})
            if(res.meta.code != 200){
                alert('empty')
                // showError('Cannot found your credentials');
            } 
            else{
                storeData('user', res.data); 
                storeData('isLogin', true)
                navigation.replace('MainApp');
            }  
        })
        .catch((error) => {
            console.log(error.message);
            // alert(error.message)
            // dispatch({type:'SET_LOADING', value:false})
            // showError(error.message);
        })
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
                    <Button title="Sign In" type="primary" onPress={_signIn}/>
                </View>
            </View>
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    content : {
        paddingHorizontal:28,
    },
    text : {
        alignItems:'center'
    },
    page : {
        backgroundColor: 'white',
        flex:1
    }
})