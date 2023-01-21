import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Router from './router'
import FlashMessage from 'react-native-flash-message'
import { Provider } from 'react-redux'
import store from './store/store';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <Router/>
        </NavigationContainer>
        <FlashMessage position="bottom"/>
      </Provider>
    </>
  )
}

const styles = StyleSheet.create({})