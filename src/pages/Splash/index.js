import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect} from 'react'

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Product');
    }, 2000);
  }, [navigation]);
  
  return (
    <View style={{backgroundColor: 'white', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={styles.text}>OSAKA</Text>
    </View>
  )
}

export default Splash;

const styles = StyleSheet.create({
  text: {
    fontSize:28,
    fontFamily: 'OpenSans-SemiBold'
  }
})