// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, Alert } from "react-native";
// import { RNCamera } from "react-native-camera";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../store/cartSlice";
// // import { getProductByBarcode } from '../utils/api';
// import { getVariantByBarcode } from "../utils/api";

// const BarcodeScannerScreen = ({ navigation }) => {
//   const [scanned, setScanned] = useState(false);
//   const dispatch = useDispatch();

//   // Inside handleBarCodeRead:
//   const handleBarCodeRead = async (scanResult: any) => {
//     if (scanned) return;
//     setScanned(true);

//     const barcode = scanResult.data;
//     const variant = await getVariantByBarcode(barcode); // ← uses new helper

//     if (variant) {
//       dispatch(addToCart(variant));
//       Alert.alert("Success", `${variant.name} added to cart!`, [
//         { text: "OK", onPress: () => navigation.goBack() },
//       ]);
//     } else {
//       Alert.alert("Not Found", "No product found with this barcode.");
//       setScanned(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <RNCamera
//         style={styles.preview}
//         type={RNCamera.Constants.Type.back}
//         flashMode={RNCamera.Constants.FlashMode.off}
//         onBarCodeRead={handleBarCodeRead}
//         androidCameraPermissionOptions={{
//           title: "Permission to use camera",
//           message: "We need your permission to use your camera",
//           buttonPositive: "Ok",
//           buttonNegative: "Cancel",
//         }}
//         androidRecordAudioPermissionOptions={{
//           title: "Permission to use audio recording",
//           message: "We need your permission to use your audio",
//           buttonPositive: "Ok",
//           buttonNegative: "Cancel",
//         }}
//       />
//       <View style={styles.overlay}>
//         <Text style={styles.scanText}>Scan a product barcode</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   preview: {
//     flex: 1,
//     justifyContent: "flex-end",
//     alignItems: "center",
//   },
//   overlay: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     padding: 20,
//     alignItems: "center",
//   },
//   scanText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });

// export default BarcodeScannerScreen;





import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, Platform } from "react-native";
// import { BarCodeScanner, BarCodeScannerResult } from "expo-barcode-scanner";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { getVariantByBarcode } from "../utils/api";

const BarcodeScannerScreen = ({ navigation }) => {
  // const [hasPermission, setHasPermission] = useState<boolean | null>(true);
  const [hasPermission, setHasPermission] = useState(true);
  // const [scanned, setScanned] = useState(false);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const requestPermission = async () => {
  //     const { status } = await BarCodeScanner.requestPermissionsAsync();
  //     setHasPermission(status === "granted");
  //   };

  //   requestPermission();
  // }, []);

  // const handleBarCodeScanned = async ({ type, data }: BarCodeScannerResult) => {
  //   if (scanned) return;
  //   setScanned(true);

  //   try {
  //     const variant = await getVariantByBarcode(data);
  //     if (variant) {
  //       dispatch(addToCart(variant));
  //       Alert.alert("Success", `${variant.name} added to cart!`, [
  //         { text: "OK", onPress: () => navigation.goBack() },
  //       ]);
  //     } else {
  //       Alert.alert("Not Found", "No product found with this barcode.");
  //       setScanned(false); // allow re-scan
  //     }
  //   } catch (error) {
  //     console.error("Barcode scan error:", error);
  //     Alert.alert("Error", "Failed to process barcode.");
  //     setScanned(false);
  //   }
  // };

  if (hasPermission === null) {
    return <View style={styles.center}><Text>Requesting camera permission...</Text></View>;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.center}>
        <Text style={{ textAlign: "center", padding: 20 }}>
          Camera permission denied. Please enable it in settings to scan barcodes.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFill}
      /> */}
      <View style={styles.overlay}>
        <Text style={styles.scanText}>Scan a product barcode</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
    alignItems: "center",
  },
  scanText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default BarcodeScannerScreen;