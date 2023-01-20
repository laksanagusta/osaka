import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../utils'
import { Menu } from '../../components'
import { ScrollView } from 'react-native-gesture-handler'

const Master = ({navigation}) => {
  return (
    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        <Menu title="Add Product" onPress={() => navigation.navigate("AddProduct")}/>
        <Menu title="Edit Product" onPress={() => navigation.navigate("EditProduct")}/>
      </ScrollView>
    </View>
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
    paddingTop:24
  },
})