// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from './src/store/store';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setTimeout(() => {
      setUser({ name: 'John Doe', email: 'john@example.com' });
    }, 1000);
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppNavigator/>
      </SafeAreaProvider>
    </Provider>
  );
}
