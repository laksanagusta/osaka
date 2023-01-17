import React, { useEffect, useState } from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, Gap } from '../../components';
import Item from '../../components/molecules/Item';
import { colors, fonts } from '../../utils';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { Alert } from 'react-native/Libraries/Alert/Alert';

const Home = ({navigation}) => {
    const [isScanning, setIsScanning] = useState(false)
    const [result, setResult] = useState(null)
    const [item, setItem] = useState([
        {
            id: 1,
            name: "Indomie",
        },
        {
            id: 2,
            name: "Indomie",
        },
        {
            id: 3,
            name: "Indomie",
        },
        {
            id: 4,
            name: "Indomie",
        },
    ]);

    const onSuccess = e => {
        setResult(e);
        // setIsScanning(false);

        const newItem = {
            name:e.data,
            id:5
        };

        setItem([...item, newItem]);

        // Linking.openURL(e.data).catch(err =>
        //     console.error('An error occured', err)
        // );
    };

    useEffect (() => {
        setResult(null)
    }, []);

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
                                    title={items.name}
                                />
                            )
                        })
                    }
                </View>
            </ScrollView>
        </View> ) : (
            <QRCodeScanner
                onRead={onSuccess}
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