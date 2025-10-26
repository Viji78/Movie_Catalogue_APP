// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../navigation/types';

// type Props = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;

// export default function LoginScreen({ navigation }: Props) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     if (email === 'test@example.com' && password === '123456') {
//       navigation.replace('ProfileScreen');
//     } else {
//       Alert.alert('Error', 'Invalid credentials');
//     }
//   };

//   return (
//     <View style={styles.container}>
//          <View style={styles.avatarContainer}>
//         <Image
//           source={{
//             uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
//           }}
//           style={styles.avatar}
//         />
//       </View>
//       <Text style={styles.title}>Login</Text>
//       <TextInput
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
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
//   avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 20},
//   avatarContainer: { alignItems: 'center'},
// });





// import React, { useEffect } from "react";
// import { View, Text, StyleSheet, Alert } from "react-native";
// import * as AuthSession from "expo-auth-session";
// import GoogleButton from "../components/GoogleButton";
// import { NativeStackScreenProps } from "@react-navigation/native-stack";

// type RootStackParamList = {
//   Login: undefined;
//   Home: undefined;
// };

// type Props = NativeStackScreenProps<RootStackParamList, "Login">;

// const CLIENT_ID = "YOUR_WEB_CLIENT_ID.apps.googleusercontent.com";

// export default function LoginScreen({ navigation }: Props) {
//   const redirectUri = AuthSession.makeRedirectUri();

//   const [request, response, promptAsync] = AuthSession.useAuthRequest(
//     {
//       clientId: CLIENT_ID,
//       redirectUri,
//       scopes: ["profile", "email"],
//       responseType: "token",
//     },
//     { authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth" }
//   );

//   useEffect(() => {
//     if (response?.type === "success") {
//       const accessToken = response.params.access_token;
//       fetchUserInfo(accessToken);
//     }
//   }, [response]);

//   async function fetchUserInfo(token: string) {
//     try {
//       const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const user = await res.json();
//       Alert.alert("Welcome", `Hello ${user.name}`);
//       navigation.navigate("Home");
//     } catch (err) {
//       Alert.alert("Error", "Failed to get user info");
//     }
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>
//       <GoogleButton onPress={() => promptAsync()} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f2f2f2",
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "600",
//     marginBottom: 20,
//   },
// });





// import React, { useEffect } from "react";
// import { View, Text, StyleSheet, Alert } from "react-native";
// import * as Google from "expo-auth-session/providers/google";
// import { auth, provider } from "../utils/firebase";

// import { signInWithCredential, GoogleAuthProvider } from "firebase/auth";
// import GoogleButton from "../components/GoogleButton";

// export default function LoginScreen({ navigation }: any) {
//   const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
//     clientId: "645456850045-a8f3ffe9fb6ja2kfbmjhso2vkg10uved.apps.googleusercontent.com", // <-- paste from Firebase
//   });

//   useEffect(() => {
//     if (response?.type === "success") {
//       const { id_token } = response.params;
//       const credential = GoogleAuthProvider.credential(id_token);
//       signInWithCredential(auth, credential)
//         .then((userCredential) => {
//           const user = userCredential.user;
//           Alert.alert("Welcome", `Hello ${user.displayName}`);
//           navigation.navigate("Home");
//         })
//         .catch((error) => {
//           Alert.alert("Error", error.message);
//         });
//     }
//   }, [response]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>
//       <GoogleButton onPress={() => promptAsync()} disabled={!request} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center" },
//   title: { fontSize: 28, fontWeight: "600", marginBottom: 20 },
// });







// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
// import * as Google from "expo-auth-session/providers/google";
// import { auth } from "../utils/firebase"; // Your Firebase configuration
// import { signInWithEmailAndPassword, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
// import { createUserWithEmailAndPassword } from "firebase/auth"; // Add this line

// import GoogleButton from "../components/GoogleButton"; // Custom Google sign-in button component

// export default function LoginScreen({ navigation }: any) {
//   const [email, setEmail] = useState(""); // State for email input
//   const [password, setPassword] = useState(""); // State for password input

//   const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
//     clientId: "645456850045-a8f3ffe9fb6ja2kfbmjhso2vkg10uved.apps.googleusercontent.com", // <-- paste from Firebase
//   });

//   // Handle Google authentication response
//   useEffect(() => {
//     if (response?.type === "success") {
//       const { id_token } = response.params;
//       const credential = GoogleAuthProvider.credential(id_token);

//       // Sign in with Firebase using the Google credential
//       signInWithCredential(auth, credential)
//         .then((userCredential) => {
//           const user = userCredential.user;
//           Alert.alert("Welcome", `Hello ${user.displayName}`);
//           navigation.navigate("Home"); // Navigate to home after login
//         })
//         .catch((error) => {
//           Alert.alert("Error", error.message);
//         });
//     }
//   }, [response]);

//   // Handle Email/Password login
//   const handleEmailLogin = () => {
//     signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         const user = userCredential.user;
//         Alert.alert("Welcome", `Hello ${user.displayName}`);
//         navigation.navigate("Home"); // Navigate to home after login
//       })
//       .catch((error) => {
//         Alert.alert("Login Error", error.message);
//       });
//   };

//   // Handle Email/Password signup
//   const handleEmailSignup = () => {
//     createUserWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         const user = userCredential.user;
//         Alert.alert("Account Created", `Welcome ${user.displayName}`);
//         navigation.navigate("Home"); // Navigate to home after signup
//       })
//       .catch((error) => {
//         Alert.alert("Signup Error", error.message);
//       });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login / Sign Up</Text>

//       {/* Email and Password Login Form */}
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       <Button title="Log In" onPress={handleEmailLogin} />
//       <Button title="Sign Up" onPress={handleEmailSignup} color="green" />

//       {/* Google Sign-In Button */}
//       <GoogleButton onPress={() => promptAsync()} disabled={!request} />

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
//   title: { fontSize: 28, fontWeight: "600", marginBottom: 20 },
//   input: { 
//     width: "100%", 
//     height: 40, 
//     borderColor: "#ccc", 
//     borderWidth: 1, 
//     marginBottom: 10, 
//     paddingLeft: 10 
//   },
// });

















// import React, { useState, useEffect } from "react";
// import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
// import * as Google from "expo-auth-session/providers/google";
// import { auth } from "../utils/firebase"; // Your Firebase configuration
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithCredential, GoogleAuthProvider } from "firebase/auth"; // Firebase Auth functions

// import GoogleButton from "../components/GoogleButton"; // Custom Google button component

// export default function LoginScreen({ navigation }: any) {
//   const [email, setEmail] = useState(""); // State for email input
//   const [password, setPassword] = useState(""); // State for password input

//   const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
//     clientId: "645456850045-a8f3ffe9fb6ja2kfbmjhso2vkg10uved.apps.googleusercontent.com", // <-- paste from Firebase
//   });

//   // Handle Google authentication response
//   useEffect(() => {
//     if (response?.type === "success") {
//       const { id_token } = response.params;
//       const credential = GoogleAuthProvider.credential(id_token);

//       // Sign in with Firebase using the Google credential
//       signInWithCredential(auth, credential)
//         .then((userCredential) => {
//           const user = userCredential.user;
//           Alert.alert("Welcome", `Hello ${user.displayName}`);
//           navigation.navigate("ProfileScreen"); // Navigate to home after login
//         })
//         .catch((error) => {
//           Alert.alert("Error", error.message);
//         });
//     }
//   }, [response]);

//   // Handle Email/Password login
//   const handleEmailLogin = () => {
//     signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         const user = userCredential.user;
//         Alert.alert("Welcome", `Hello ${user.displayName}`);
//         navigation.navigate("ProfileScreen"); // Navigate to home after login
//       })
//       .catch((error) => {
//         Alert.alert("Login Error", error.message);
//       });
//   };

//   // Handle Email/Password signup
//   const handleEmailSignup = () => {
//     createUserWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         const user = userCredential.user;
//         Alert.alert("Account Created", `Welcome ${user.displayName}`);
//         navigation.navigate("ProfileScreen"); // Navigate to home after signup
//       })
//       .catch((error) => {
//         Alert.alert("Signup Error", error.message);
//       });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login / Sign Up</Text>

//       {/* Email and Password Login Form */}
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       <Button title="Log In" onPress={handleEmailLogin} />
//       <Button title="Sign Up" onPress={handleEmailSignup} color="green" />

//       {/* Google Sign-In Button */}
//       <GoogleButton onPress={() => promptAsync()} disabled={!request} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
//   title: { fontSize: 28, fontWeight: "600", marginBottom: 20 },
//   input: { 
//     width: "100%", 
//     height: 40, 
//     borderColor: "#ccc", 
//     borderWidth: 1, 
//     marginBottom: 10, 
//     paddingLeft: 10 
//   },
// });










import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet, 
  Alert, 
  TouchableOpacity, 
  Image,
  Modal,
  ActivityIndicator 
} from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { auth } from "../utils/firebase";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithCredential, 
  GoogleAuthProvider,
  sendPasswordResetEmail,
  updateProfile
} from "firebase/auth";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  
  // Signup form states
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupName, setSignupName] = useState("");

  //  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
  //   clientId: "645456850045-a8f3ffe9fb6ja2kfbmjhso2vkg10uved.apps.googleusercontent.com",
  // });

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: "645456850045-8jsvok65pmtr8i2frrgcce1f84jkk9ke.apps.googleusercontent.com",
  });

  // Handle Google authentication response
  useEffect(() => {
    if (response?.type === "success") {
      setIsLoading(true);
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth, credential)
        .then((userCredential) => {
          const user = userCredential.user;
          const finalName = user.displayName || user.email?.split('@')[0] || 'User';
          Alert.alert("Welcome", `Hello ${finalName}`);
          navigation.navigate("ProfileScreen");
        })
        .catch((error) => {
          Alert.alert("Error", error.message);
        })
        .finally(() => setIsLoading(false));
    }
  }, [response]);

  // Handle Email/Password login
  const handleEmailLogin = async () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const finalName = user.displayName || user.email?.split('@')[0] || 'User';
      Alert.alert("Welcome", `Hello ${finalName}`);
      navigation.navigate("ProfileScreen");
    } catch (error: any) {
      Alert.alert("Login Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle signup submission from modal
  const handleSignupSubmit = async () => {
    // Validation
    if (!signupEmail || !signupPassword || !signupName) {
      Alert.alert("Validation Error", "Please fill in all fields");
      return;
    }
    
    if (signupPassword.length < 6) {
      Alert.alert("Validation Error", "Password must be at least 6 characters");
      return;
    }
    
    setIsLoading(true);
    try {
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
      const user = userCredential.user;
      
      // Update profile with display name
      await updateProfile(user, { displayName: signupName.trim() });
      
      // Close modal and show success
      setShowSignupModal(false);
      Alert.alert("Account Created", `Welcome ${signupName}! Please log in with your credentials.`);
      
      // Clear signup form
      setSignupEmail("");
      setSignupPassword("");
      setSignupName("");
      
      // Pre-fill login form with new email
      setEmail(signupEmail);
      setPassword("");
    } catch (error: any) {
      Alert.alert("Signup Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle password reset
  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert("Validation Error", "Please enter your email address");
      return;
    }

    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        "Password Reset Sent", 
        "Check your email for a password reset link",
        [{ text: "OK" }]
      );
    } catch (error: any) {
      Alert.alert("Reset Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        
        <TouchableOpacity onPress={handlePasswordReset} disabled={isLoading}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.loginButton]} 
          onPress={handleEmailLogin}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.signupButton]} 
          onPress={() => setShowSignupModal(true)}
          disabled={isLoading}
        >
          <Text style={[styles.buttonText, { color: '#fff' }]}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* Signup Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showSignupModal}
        onRequestClose={() => setShowSignupModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Create Account</Text>
            <Text style={styles.modalSubtitle}>Fill in your details to get started</Text>
            
            <TextInput
              style={styles.modalInput}
              placeholder="Full Name"
              value={signupName}
              onChangeText={setSignupName}
              autoCapitalize="words"
              autoFocus={true}
            />
            
            <TextInput
              style={styles.modalInput}
              placeholder="Email address"
              value={signupEmail}
              onChangeText={setSignupEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            
            <TextInput
              style={styles.modalInput}
              placeholder="Password"
              value={signupPassword}
              onChangeText={setSignupPassword}
              secureTextEntry
              autoCapitalize="none"
            />
            
            <TouchableOpacity 
              style={[styles.button, styles.modalButton]} 
              onPress={handleSignupSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Create Account</Text>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => setShowSignupModal(false)}
              disabled={isLoading}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


       <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or continue with</Text>
        <View style={styles.dividerLine} />
      </View>

      <TouchableOpacity 
        style={styles.googleButton} 
        onPress={() => promptAsync()} 
        disabled={!request || isLoading}
      >
        <Image
          source={{ uri: 'https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/google-512.png' }}
          style={styles.googleIcon}
        />
        <Text style={styles.googleButtonText}>Sign in with Google</Text>
      </TouchableOpacity>


      {isLoading && !showSignupModal && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Processing...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 20,
    backgroundColor: '#f8f9fa'
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: { 
    fontSize: 28, 
    fontWeight: "700", 
    color: '#2c3e50',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  input: { 
    width: "100%", 
    height: 50, 
    borderColor: "#e0e0e0", 
    borderWidth: 1, 
    borderRadius: 8,
    marginBottom: 15, 
    paddingLeft: 16,
    fontSize: 16,
    backgroundColor: '#fff'
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    color: '#3498db',
    marginBottom: 15,
    fontSize: 14,
    fontWeight: '500',
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  loginButton: {
    backgroundColor: '#3498db',
  },
  signupButton: {
    backgroundColor: '#2ecc71',
  },
  modalButton: {
    backgroundColor: '#9b59b6',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '85%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalInput: {
    width: '100%',
    height: 50,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  cancelText: {
    color: '#7f8c8d',
    fontSize: 14,
    marginTop: 12,
    textDecorationLine: 'underline',
  },
    dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
    maxWidth: 400,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    marginHorizontal: 12,
    color: '#7f8c8d',
    fontSize: 14,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 400,
    height: 50,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  googleButtonText: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '500',
  },
});