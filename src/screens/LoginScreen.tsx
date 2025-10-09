// // import React from 'react';
// // import { View, Text, Button, StyleSheet } from 'react-native';
// // import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

// // GoogleSignin.configure({
// //   webClientId: 'YOUR_GOOGLE_WEB_CLIENT_ID', // Get from Firebase Console
// // });

// // const LoginScreen = ({ navigation }) => {
// //   const signIn = async () => {
// //     try {
// //       await GoogleSignin.hasPlayServices();
// //       const userInfo = await GoogleSignin.signIn();
// //       console.log('User Info:', userInfo);
// //       // Save user info to context/redux
// //       navigation.replace('App', { user: userInfo.user });
// //     } catch (error: any) {
// //       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
// //         console.log('User cancelled login');
// //       } else if (error.code === statusCodes.IN_PROGRESS) {
// //         console.log('Sign in in progress');
// //       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
// //         console.log('Play services not available');
// //       } else {
// //         console.error('Error during sign-in:', error);
// //       }
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.title}>Welcome to My Smart Basket</Text>
// //       <Button title="Sign in with Google" onPress={signIn} />
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     padding: 20,
// //   },
// //   title: {
// //     fontSize: 24,
// //     marginBottom: 20,
// //   },
// // });

// // export default LoginScreen;






// // src/screens/LoginScreen.tsx
// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

// export default function LoginScreen({ navigation }: any) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     if (!email || !password) {
//       Alert.alert('Error', 'Please enter email and password');
//       return;
//     }

//     // Here you can call your API to validate login
//     // For now, just simulate success
//     if (email === 'test@example.com' && password === '123456') {
//       Alert.alert('Success', 'Login Successful!');
//       // Navigate to product list
//       navigation.replace('ProductListScreen');
//     } else {
//       Alert.alert('Error', 'Invalid credentials');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>
//       <TextInput
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         autoCapitalize="none"
//         keyboardType="email-address"
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//         style={styles.input}
//       />
//       <Button title="Login" onPress={handleLogin} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', padding: 20 },
//   title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
//   input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
// });






// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email === 'test@example.com' && password === '123456') {
      navigation.replace('ProductListScreen');
    } else {
      Alert.alert('Error', 'Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
});
