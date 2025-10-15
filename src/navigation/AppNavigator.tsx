// import React from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { NavigationContainer } from "@react-navigation/native";
// import LoginScreen from "../screens/LoginScreen";
// import ProductListScreen from "../screens/ProductListScreen";
// import ProductDetailScreen from "../screens/ProductDetailScreen";
// import CartScreen from "../screens/CartScreen";
// import BarcodeScannerScreen from "../screens/BarcodeScannerScreen";
// import ProfileScreen from "../screens/ProfileScreen";
// import SettingsScreen from "../screens/SettingsScreen";
// import { View, Text } from "react-native";

// import { RootStackParamList } from "./types";

// const Stack = createNativeStackNavigator<RootStackParamList>();


// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Welcome! 🎉</Text>
//     </View>
//   );
// }

// export default function AppNavigator() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName="LoginScreen"
//         screenOptions={{
//           headerShown: false,
//         }}
//       >
//         <Stack.Screen name="LoginScreen" component={LoginScreen} />
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
//         <Stack.Screen name="ProductListScreen" component={ProductListScreen} />
//         <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
//         <Stack.Screen name="CartScreen" component={CartScreen} />
//         <Stack.Screen name="BarcodeScannerScreen" component={BarcodeScannerScreen} />
//         <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }




import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import ProductListScreen from "../screens/ProductListScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import CartScreen from "../screens/CartScreen";
import BarcodeScannerScreen from "../screens/BarcodeScannerScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { View, Text, ActivityIndicator } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase Auth

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [user, setUser] = useState(null); // Manage authentication state
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const auth = getAuth();
    // Check for user authentication status
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set user if logged in
      } else {
        setUser(null); // Clear user if not logged in
      }
      setLoading(false); // Stop loading once we have the auth state
    });

    // Clean up the listener when component unmounts
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user ? "Home" : "LoginScreen"} // Navigate based on auth state
        screenOptions={{
          headerShown: false, // Hide the header for all screens (you can show it if needed)
        }}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="ProductListScreen" component={ProductListScreen} />
        <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
        <Stack.Screen name="CartScreen" component={CartScreen} />
        <Stack.Screen name="BarcodeScannerScreen" component={BarcodeScannerScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
