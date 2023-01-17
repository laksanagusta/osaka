import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, Login, Splash } from "../pages";

const Stack = createNativeStackNavigator();
const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={Splash} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

export default Router