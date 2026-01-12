import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Platform } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const buttons = [
  { title: "Movie List", route: "MovieListScreen" },
  { title: "Settings", route: "SettingsScreen" },
];

const TopNavButtons = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();

  const activeButton = buttons.find(btn => btn.route === route.name);
  const inactiveButtons = buttons.filter(btn => btn.route !== route.name);

  return (
    <View style={styles.container}>
      {activeButton && (
        <TouchableOpacity
          key={activeButton.title}
          onPress={() => navigation.navigate(activeButton.route as never)}
          style={[styles.button, styles.activeButton, styles.fullWidthButton]}
          activeOpacity={0.8}
        >
          <Text style={[styles.text, styles.activeText]}>
            {activeButton.title}
          </Text>
        </TouchableOpacity>
      )}

      <View style={styles.inactiveButtonsRow}>
        {inactiveButtons.map((btn) => (
          <TouchableOpacity
            key={btn.title}
            onPress={() => navigation.navigate(btn.route as never)}
            style={[styles.button, styles.inactiveButton]}
            activeOpacity={0.8}
          >
            <Text style={styles.text}>{btn.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8f9fa",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  inactiveButtonsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    margin: 4,
    minWidth: 80,
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  inactiveButton: {
    backgroundColor: "#ffffff",
  },
  activeButton: {
    backgroundColor: "#4361ee",
  },
  fullWidthButton: {
    width: "100%",
    marginHorizontal: 0,
    marginVertical: 4,
  },
  text: {
    color: "#495057",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  activeText: {
    color: "#ffffff",
  },
});

export default TopNavButtons;