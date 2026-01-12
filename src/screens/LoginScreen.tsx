import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  Modal,
  ActivityIndicator,
} from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { auth } from "../utils/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithCredential,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Signup form states
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupName, setSignupName] = useState("");

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "340770466494-93rc0ar2qv59dqism2hdlngn2vimq29e.apps.googleusercontent.com",
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
          const finalName =
            user.displayName || user.email?.split("@")[0] || "User";
          Alert.alert("Welcome", `Hello ${finalName}`);
          navigation.navigate("MovieListScreen");
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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const finalName = user.displayName || user.email?.split("@")[0] || "User";
      Alert.alert("Welcome Back", ` ${finalName}`);
      navigation.navigate("MovieListScreen");
    } catch (error: any) {
      Alert.alert("Login Error", "Invalid Credentials");
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signupEmail)) {
      Alert.alert("Validation Error", "Please enter a valid email address");
      return;
    }

    // Password rules:
    // - Min 4 characters At least 1 number  At least 1 special character
    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{4,}$/;

    if (!passwordRegex.test(signupPassword)) {
      Alert.alert(
        "Validation Error",
        "Password must be at least 4 characters and include one number and one special character"
      );
      return;
    }

    setIsLoading(true);
    try {
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signupEmail,
        signupPassword
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: signupName.trim() });

      setShowSignupModal(false);
      Alert.alert(
        "Account Created",
        `Welcome ${signupName}! Please log in with your credentials.`
      );

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

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />

          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={{ paddingHorizontal: 12 }}
          >
            <MaterialCommunityIcons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={22}
              color="#666"
            />
          </TouchableOpacity>
        </View>

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
          <Text style={[styles.buttonText, { color: "#fff" }]}>Sign Up</Text>
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
            <Text style={styles.modalSubtitle}>
              Fill in your details to get started
            </Text>

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
          source={{
            uri: "https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/google-512.png",
          }}
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
    backgroundColor: "#f8f9fa",
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#7f8c8d",
  },
  formContainer: {
    width: "100%",
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
    backgroundColor: "#fff",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingLeft: 16,
    fontSize: 16,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    color: "#3498db",
    marginBottom: 15,
    fontSize: 14,
    fontWeight: "500",
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  loginButton: {
    backgroundColor: "#3498db",
  },
  signupButton: {
    backgroundColor: "#2ecc71",
  },
  modalButton: {
    backgroundColor: "#9b59b6",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "85%",
    maxWidth: 400,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 16,
    color: "#7f8c8d",
    marginBottom: 20,
    textAlign: "center",
  },
  modalInput: {
    width: "100%",
    height: 50,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  cancelText: {
    color: "#656868",
    fontSize: 18,
    marginTop: 12,
    textDecorationLine: "underline",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    width: "100%",
    maxWidth: 400,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#e0e0e0",
  },
  dividerText: {
    marginHorizontal: 12,
    color: "#7f8c8d",
    fontSize: 14,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    maxWidth: 400,
    height: 50,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  googleButtonText: {
    fontSize: 16,
    color: "#2c3e50",
    fontWeight: "500",
  },
});
