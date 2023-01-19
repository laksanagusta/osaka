import React, { useEffect, useState } from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, Gap } from '../../components';
import Item from '../../components/molecules/Item';
import { colors, config, fonts, getData, showError, showSuccess } from '../../utils';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { Alert } from 'react-native/Libraries/Alert/Alert';

const Home = ({navigation}) => {
    const [isScanning, setIsScanning] = useState(false)
    const [item, setItem] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState([]);

    const _getProductByCode = e => {
        // setIsScanning(false);
        setIsLoading(true);
        fetch(config.url+'/api/v1/products/code/'+e.data, {
            method: 'GET',
            headers: {  
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer '+user.token
            }
        })        
        .then(response => response.json())
        .then(res => {
            setIsLoading(false);
            if(res.meta.code !== 200){
                showError(res.meta.message)
            } 
            else{
                const index = searchProductIndex(res.data.code)
                console.log(index)  
                if(index > -1){
                    item[index].qty+=1;
                    console.log(item);
                }else{
                    res.data.qty = 1;
                    setItem([...item, res.data]);
                }
                showSuccess(res.meta.message)
            }  
        })
        .catch((error) => {
            setIsLoading(false);
            showError(error.message)
        })
    };

    function searchProductIndex(val){
        const index = item.findIndex(x => x.code === val);
        return index;
    }

    useEffect (() => {
        getDataUserFromLocal();
    }, []);

    const getDataUserFromLocal = () => {
        getData('user').then(res => {
            setUser(res);
        })
    }

    return !isScanning ? (
        <View style={styles.page}>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
                <Button type="primary" title="Scan" onPress={() => setIsScanning(true)}/>
                <Gap height={20}/>
                <View>          
                    {
                        item.map(items => {
                            return (
                                <Item
                                    key={items.id}
                                    title={items.title}
                                    qty={items.qty}
                                    code={items.code}
                                />
                            )
                        })
                    }
                </View>
            </ScrollView>
        </View> ) : (
            <QRCodeScanner
                onRead={_getProductByCode}
                reactivate={true}
                showMarker={true}
                reactivateTimeout={1000}
                // flashMode={RNCamera.Constants.FlashMode.torch}
                // topContent={
                //     <Text style={styles.centerText}>
                //         Go to{' '}
                //         <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
                //         your computer and scan the QR code.
                //     </Text>
                // }
                bottomContent={
                    <>
                        {/* <TouchableOpacity style={styles.buttonTouchable} onPress={() => scanner.current.reactivate}>
                            <Text style={styles.buttonText}>OK. Got it!</Text>
                        </TouchableOpacity> */}
                        {/* <Button title="Stop" onPress={() => setIsScanning(false)}/> */}
                        <TouchableOpacity style={styles.buttonTouchable} onPress={() => setIsScanning(false)}>
                            <Text style={styles.buttonText}>Stop</Text>
                        </TouchableOpacity>
                    </>
                }
            />
    )
}

export default Home

const styles = StyleSheet.create({
    scroll: {
        backgroundColor:colors.white, 
        flex:1, 
        paddingHorizontal:16,
        paddingTop:24
    },
    page : {
        backgroundColor:colors.tabBar, flex:1
    },
    background : {
        height:414,
        padding:28
    },
    title : {
        fontSize:24, 
        fontFamily:fonts.primary[600], color:colors.white
    }, 
    desc : {
        fontSize:14,
        fontFamily:fonts.primary[300],
        color:colors.white,
        textAlign:'center',
        marginTop:6,
        color:colors.text.subTitle
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