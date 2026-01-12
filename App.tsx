import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./src/navigation/AppNavigator";
import { NetworkProvider } from "./src/utils/NetworkProvider";  // Import the provider

export default function App() {
  return (
      <SafeAreaProvider>
        <NetworkProvider> 
        <AppNavigator />
        </NetworkProvider>
      </SafeAreaProvider>
  );
}
