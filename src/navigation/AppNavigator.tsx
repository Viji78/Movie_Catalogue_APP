// // import React from 'react';
// // import { NavigationContainer } from '@react-navigation/native';
// // import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// // import { createStackNavigator } from '@react-navigation/stack';
// // import { Ionicons } from '@expo/vector-icons';

// // import LoginScreen from '../screens/LoginScreen';
// // import ProductListScreen from '../screens/ProductListScreen';
// // import ProductDetailScreen from '../screens/ProductDetailScreen';
// // import CartScreen from '../screens/CartScreen';
// // import BarcodeScannerScreen from '../screens/BarcodeScannerScreen';

// // const Stack = createStackNavigator();
// // const Tab = createBottomTabNavigator();

// // const ProductStack = () => (
// //   <Stack.Navigator>
// //     <Stack.Screen name="ProductList" component={ProductListScreen} options={{ title: 'Products' }} />
// //     <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Product Details' }} />
// //   </Stack.Navigator>
// // );

// // const CartStack = () => (
// //   <Stack.Navigator>
// //     <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'My Cart' }} />
// //     <Stack.Screen name="BarcodeScanner" component={BarcodeScannerScreen} options={{ title: 'Scan Barcode' }} />
// //   </Stack.Navigator>
// // );

// // const AppNavigator = ({ user }: { user: any }) => {
// //   return (
// //     <NavigationContainer>
// //       {user ? (
// //         <Tab.Navigator
// //           screenOptions={({ route }) => ({
// //             tabBarIcon: ({ focused, color, size }) => {
// //               let iconName: keyof typeof Ionicons.defaultProps;

// //               if (route.name === 'Home') {
// //                 iconName = focused ? 'home' : 'home-outline';
// //               } else if (route.name === 'Cart') {
// //                 iconName = focused ? 'cart' : 'cart-outline';
// //               }

// //               return <Ionicons name={iconName} size={size} color={color} />;
// //             },
// //             tabBarActiveTintColor: '#007AFF',
// //             tabBarInactiveTintColor: 'gray',
// //           })}
// //         >
// //           <Tab.Screen name="Home" component={ProductStack} options={{ headerShown: false }} />
// //           <Tab.Screen name="Cart" component={CartStack} options={{ headerShown: false }} />
// //         </Tab.Navigator>
// //       ) : (
// //         <Stack.Navigator>
// //           <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
// //         </Stack.Navigator>
// //       )}
// //     </NavigationContainer>
// //   );
// // };

// // export default AppNavigator;








// // src/navigation/AppNavigator.tsx
// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { NavigationContainer } from '@react-navigation/native';
// import LoginScreen from '../screens/LoginScreen';
// import ProductListScreen from '../screens/ProductListScreen';

// const Stack = createNativeStackNavigator();

// export default function AppNavigator() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="LoginScreen" component={LoginScreen} />
//         <Stack.Screen name="ProductListScreen" component={ProductListScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

//////////////////////////////////////////////////////////////////////////////////////////////////////

// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { NavigationContainer } from '@react-navigation/native';
// import LoginScreen from '../screens/LoginScreen';
// import ProductListScreen from '../screens/ProductListScreen';
// import { RootStackParamList } from './types';
// import ProductDetailScreen from '../screens/ProductDetailScreen';

// const Stack = createNativeStackNavigator<RootStackParamList>();

// export default function AppNavigator() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         {/* <Stack.Screen name="LoginScreen" component={LoginScreen} /> */}
//         <Stack.Screen name="ProductListScreen" component={ProductListScreen} />
//         <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }







///////////////////////////////////////////////////////////////////////////////
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from '../screens/LoginScreen';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import BarcodeScannerScreen from '../screens/BarcodeScannerScreen';

import { RootStackParamList } from './types';

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
