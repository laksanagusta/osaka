import { LogBox, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Router from './router'
import FlashMessage from 'react-native-flash-message'
import { Provider } from 'react-redux'
import store from './store/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <>
      <SafeAreaProvider>
        <Provider store={store}>
          <NavigationContainer>
            <Router/>
          </NavigationContainer>
          <FlashMessage position="bottom"/>
        </Provider>
      </SafeAreaProvider>
    </>
  )
}

const styles = StyleSheet.create({})