import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import LoginScreen from "../screens/LoginScreen";
import ProductListScreen from "../screens/ProductListScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import CartScreen from "../screens/CartScreen";
import BarcodeScannerScreen from "../screens/BarcodeScannerScreen";

import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen" // 👈 Set first screen
        screenOptions={{
          headerShown: false, // hide default header for custom design
        }}
      >
        {/* 🔹 Auth */}
        <Stack.Screen name="LoginScreen" component={LoginScreen} />

        {/* 🔹 Main Flow */}
        <Stack.Screen name="ProductListScreen" component={ProductListScreen} />
        <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
        <Stack.Screen name="CartScreen" component={CartScreen} />
        <Stack.Screen name="BarcodeScannerScreen" component={BarcodeScannerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
