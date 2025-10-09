// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Alert } from 'react-native';
// import { RNCamera } from 'react-native-camera';
// import { useDispatch } from 'react-redux';
// import { addToCart } from '../store/cartSlice';
// import { getProductByBarcode } from '../utils/api';

// const BarcodeScannerScreen = ({ navigation }) => {
//   const [scanned, setScanned] = useState(false);
//   const dispatch = useDispatch();

//   const handleBarCodeRead = async (scanResult: any) => {
//     if (scanned) return;
//     setScanned(true);

//     const barcode = scanResult.data;
//     const product = await getProductByBarcode(barcode);

//     if (product) {
//       dispatch(addToCart(product));
//       Alert.alert(
//         'Product Added',
//         `${product.name} has been added to your cart.`,
//         [{ text: 'OK', onPress: () => navigation.goBack() }]
//       );
//     } else {
//       Alert.alert(
//         'Product Not Found',
//         'No product found with this barcode.',
//         [{ text: 'OK', onPress: () => setScanned(false) }]
//       );
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
//           title: 'Permission to use camera',
//           message: 'We need your permission to use your camera',
//           buttonPositive: 'Ok',
//           buttonNegative: 'Cancel',
//         }}
//         androidRecordAudioPermissionOptions={{
//           title: 'Permission to use audio recording',
//           message: 'We need your permission to use your audio',
//           buttonPositive: 'Ok',
//           buttonNegative: 'Cancel',
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
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   overlay: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     padding: 20,
//     alignItems: 'center',
//   },
//   scanText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default BarcodeScannerScreen;







import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
// import { getProductByBarcode } from '../utils/api';
import { getVariantByBarcode } from '../utils/api';

const BarcodeScannerScreen = ({ navigation }) => {
  const [scanned, setScanned] = useState(false);
  const dispatch = useDispatch();

// Inside handleBarCodeRead:
const handleBarCodeRead = async (scanResult: any) => {
  if (scanned) return;
  setScanned(true);

  const barcode = scanResult.data;
  const variant = await getVariantByBarcode(barcode); // ← uses new helper

  if (variant) {
    dispatch(addToCart(variant));
    Alert.alert('Success', `${variant.name} added to cart!`, [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  } else {
    Alert.alert('Not Found', 'No product found with this barcode.');
    setScanned(false);
  }
};

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        onBarCodeRead={handleBarCodeRead}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      />
      <View style={styles.overlay}>
        <Text style={styles.scanText}>Scan a product barcode</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
    alignItems: 'center',
  },
  scanText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BarcodeScannerScreen;