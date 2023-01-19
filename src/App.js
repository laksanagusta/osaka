import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Router from './router'
import FlashMessage from 'react-native-flash-message'

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Router/>
      </NavigationContainer>
      <FlashMessage position="bottom"/>
    </>
  )
}

const styles = StyleSheet.create({})