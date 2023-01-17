import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button, Gap, Input } from '../../components';

const Login = ({navigation}) => {
    return (
        <View style={styles.page}>
            <View style={styles.content}>
                <Gap height={200}/>
                <View>
                    <Input label="Username"/>
                    <Gap height={24}/>
                    <Input label="Password"/>
                    <Gap height={40}/>
                    <Button title="Sign In" type="primary" onPress={() => navigation.replace('Home')}/>
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