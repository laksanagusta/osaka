import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, Login, Splash, Master, User, AddProduct, EditProduct, EditItemList, Order, OrderDetail } from "../pages";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigator } from "../components";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomNavigator {...props}/>}>
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}}/>
      <Tab.Screen name="Master" component={Master} options={{headerShown: false}}/>
      <Tab.Screen name="Order" component={Order} options={{headerShown: false}}/>
      <Tab.Screen name="User" component={User} options={{headerShown: false}}/>
    </Tab.Navigator>
  )
}

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="AddProduct" component={AddProduct}/>
        <Stack.Screen name="EditProduct" component={EditProduct}/>
        <Stack.Screen name="EditItemList" component={EditItemList}/>
        <Stack.Screen name="OrderDetail" component={OrderDetail}/>
        <Stack.Screen name="MainApp" component={MainApp} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

export default Router