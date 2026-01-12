import React, { createContext, useEffect, useState, useContext } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { Platform, Alert } from 'react-native';

type NetworkContextType = {
  isConnected: boolean;
};

const NetworkContext = createContext<NetworkContextType>({ isConnected: true });

export const useNetwork = () => useContext(NetworkContext);

export const NetworkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    let unsubscribe: any;

    if (Platform.OS === 'web') {
      // Web support using browser APIs
      const handleOnline = () => setIsConnected(true);
      const handleOffline = () => {
        setIsConnected(false);
        Alert.alert(
          'No Internet Connection',
          "Looks like you're offline! Try turning your internet off and on to reconnect."
        );
      };

      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      setIsConnected(navigator.onLine);

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    } else {
      //Native (Android + iOS)
      unsubscribe = NetInfo.addEventListener(state => {
        setIsConnected(!!state.isConnected);
        if (!state.isConnected) {
          Alert.alert(
            'No Internet Connection',
            "Looks like you're offline! Try turning your internet off and on to reconnect."
          );
        }
      });
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <NetworkContext.Provider value={{ isConnected }}>
      {children}
    </NetworkContext.Provider>
  );
};
