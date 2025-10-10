import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, Platform } from "react-native";
// import { BarCodeScanner, BarCodeScannerResult } from "expo-barcode-scanner";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { getVariantByBarcode } from "../utils/api";
import TopNavButtons from "@/components/TopNavButtons";

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
    return (
      <View style={styles.center}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.center}>
        <Text style={{ textAlign: "center", padding: 20 }}>
          Camera permission denied. Please enable it in settings to scan
          barcodes.
        </Text>
      </View>
    );
  }

  return (
    // <View style={styles.container}>
    //   {/* <BarCodeScanner
    //     onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
    //     style={StyleSheet.absoluteFill}
    //   /> */}
    //   <View style={styles.overlay}>
    //     <Text style={styles.scanText}>Scan a product barcode</Text>
    //           <TopNavButtons/>

    //   </View>
    // </View>
    <View style={styles.container}>
      {/* <BarCodeScanner style={StyleSheet.absoluteFill} /> */}

      <View style={styles.content}>
        <Text style={styles.scanText}>Scan a product barcode</Text>
      </View>

      <View style={styles.bottomNav}>
        <TopNavButtons />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 100,
  },
  scanText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#f8f9fa",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingTop: 5,
    paddingBottom: Platform.OS === "ios" ? 10 : 5,
  },
});

export default BarcodeScannerScreen;
