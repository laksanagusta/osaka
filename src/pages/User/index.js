import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, storeData } from '../../utils'
import { Menu } from '../../components'
import { ScrollView } from 'react-native-gesture-handler'

const User = ({navigation}) => {
  const logout = () => {
    storeData('user', null).then(res => {
        storeData('isLogin', false).then(res => {
            navigation.replace('Login')
        })
    })
  }

  return (
    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        <Menu title="Logout" onPress={logout}/>
      </ScrollView>
    </View>
  )
}

export default User

const styles = StyleSheet.create({
  page : {
    backgroundColor:colors.white, 
    flex:1
  },
  scroll: {
    backgroundColor:colors.white, 
    flex:1,
    paddingTop:24,
    paddingHorizontal:10
  },
})