


// import React, { useEffect, useState } from "react";
// import { View, ActivityIndicator } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import { getAuth, onAuthStateChanged } from "firebase/auth";

// // Screens
// import LoginScreen from "../screens/LoginScreen";
// import ProductListScreen from "../screens/ProductListScreen";
// import ProductDetailScreen from "../screens/ProductDetailScreen";
// import CartScreen from "../screens/CartScreen";
// import BarcodeScannerScreen from "../screens/BarcodeScannerScreen";
// import ProfileScreen from "../screens/ProfileScreen";
// import SettingsScreen from "../screens/SettingsScreen";

// const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

// function HomeStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="ProductListScreen"
//         component={ProductListScreen}
//         options={{ title: "Products" }}
//       />
//       <Stack.Screen
//         name="ProductDetailScreen"
//         component={ProductDetailScreen}
//         options={{ title: "Product Details" }}
//       />
//       <Stack.Screen
//         name="CartScreen"
//         component={CartScreen}
//         options={{ title: "My Cart" }}
//       />
//       <Stack.Screen
//         name="BarcodeScannerScreen"
//         component={BarcodeScannerScreen}
//         options={{ title: "Scan Product" }}
//       />
//     </Stack.Navigator>
//   );
// }

// // Drawer menu linking to modules
// function AppDrawer() {
//   return (
//     <Drawer.Navigator
//       screenOptions={{
//         headerShown: true,
//         drawerType: "front",
//       }}
//     >
//       <Drawer.Screen name="Home" component={HomeStack} />
//       <Drawer.Screen name="Profile" component={ProfileScreen} />
//       <Drawer.Screen name="Settings" component={SettingsScreen} />
//     </Drawer.Navigator>
//   );
// }

// export default function AppNavigator() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const auth = getAuth();
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <NavigationContainer>
//       {user ? (
//         <AppDrawer /> // Show drawer if logged in
//       ) : (
//         <Stack.Navigator>
//           <Stack.Screen
//             name="LoginScreen"
//             component={LoginScreen}
//             options={{ headerShown: false }}
//           />
//         </Stack.Navigator>
//       )}
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
