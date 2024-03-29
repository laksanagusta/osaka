import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../utils'
import { Menu } from '../../components'
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler'

const Master = ({navigation}) => {
  return (
    <GestureHandlerRootView style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        <Menu icon="green" title="Add Product" onPress={() => navigation.navigate("AddProduct")}/>
        <Menu title="Edit Product" onPress={() => navigation.navigate("EditProduct")}/>
      </ScrollView>
    </GestureHandlerRootView>
  )
}

export default Master

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