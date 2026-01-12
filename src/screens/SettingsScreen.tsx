import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Switch,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Appbar, Divider } from "react-native-paper";

const SettingsScreen = ({ navigation }) => {
  const [user, setUser] = useState<any>(null);
  const [isEnabled, setIsEnabled] = useState(false);

  const avatarUri =
    user?.photoURL || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  const displayName = user?.displayName || user?.email?.split("@")[0] || "User";

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigation.replace("LoginScreen");
      }
    });

    return unsubscribe;
  }, [navigation]);

  const handleLogout = () => {
    const auth = getAuth();

    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          navigation.reset({
            index: 0,
            routes: [{ name: "LoginScreen" }],
          });
        },
      },
    ]);
  };

  return (
    <View style={styles.safeArea}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Settings" />
      </Appbar.Header>

      <View style={styles.container}>
        {/* PROFILE CARD */}
        <View style={styles.profileCard}>
          <Image source={{ uri: avatarUri }} style={styles.avatar} />
          <Text style={styles.name}>{displayName}</Text>
          <Text style={styles.email}>Email: {user?.email}</Text>
          <Text style={styles.email}>Contact: +91 1123456789</Text>
        </View>

        {/* SETTINGS */}
        <View style={styles.settingsCard}>
          {/* Notifications */}
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Enable Notifications</Text>
            <Switch
              value={isEnabled}
              onValueChange={() => setIsEnabled(!isEnabled)}
            />
          </View>

          {/* Dark Mode (Dummy) */}
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Switch value={false} disabled />
          </View>

          {/* Language */}
          <TouchableOpacity style={styles.settingRow}>
            <Text style={styles.settingLabel}>Language</Text>
            <Text style={styles.settingValue}>English</Text>
          </TouchableOpacity>

          {/* Privacy */}
          <TouchableOpacity style={styles.settingRow}>
            <Text style={styles.settingLabel}>Privacy & Security</Text>
            <Text style={styles.settingArrow}>›</Text>
          </TouchableOpacity>

          {/* Help */}
          <TouchableOpacity style={styles.settingRow}>
            <Text style={styles.settingLabel}>Help & Support</Text>
            <Text style={styles.settingArrow}>›</Text>
          </TouchableOpacity>

          {/* App Version */}
          <View style={[styles.settingRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.settingLabel}>App Version</Text>
            <Text style={styles.settingValue}>v1.0.0</Text>
          </View>
        </View>

        {/* LOGOUT AT BOTTOM */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f6fa",
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },

  /* PROFILE */
  profileCard: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 30,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2c3e50",
  },
  email: {
    fontSize: 15,
    color: "#7f8c8d",
    marginTop: 4,
  },

  /* SETTINGS */
  settingsCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },

  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  settingLabel: {
    fontSize: 16,
    color: "#333",
  },

  settingValue: {
    fontSize: 14,
    color: "#777",
  },

  settingArrow: {
    fontSize: 20,
    color: "#999",
  },

  /* LOGOUT */
  logoutContainer: {
    paddingBottom: 10,
  },
  logoutButton: {
    backgroundColor: "#e74c3c",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
