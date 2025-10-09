// // import React from 'react';
// // import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// // import { useDispatch } from 'react-redux';
// // import { addToCart, removeFromCart } from '../store/cartSlice';
// // import { Product } from '../types';

// // const ProductDetailScreen = ({ route, navigation }) => {
// //   const { product } = route.params;
// //   const dispatch = useDispatch();

// //   const handleAddToCart = () => {
// //     dispatch(addToCart(product));
// //   };

// //   const handleRemoveFromCart = () => {
// //     dispatch(removeFromCart(product.id));
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Image source={{ uri: product.image }} style={styles.image} />
// //       <Text style={styles.name}>{product.name}</Text>
// //       <Text style={styles.description}>{product.description}</Text>
// //       <Text style={styles.price}>${product.price.toFixed(2)}</Text>
// //       <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
// //         <Text style={styles.buttonText}>Add to Cart</Text>
// //       </TouchableOpacity>
// //       <TouchableOpacity style={[styles.button, styles.removeButton]} onPress={handleRemoveFromCart}>
// //         <Text style={styles.buttonText}>Remove from Cart</Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 20,
// //   },
// //   image: {
// //     width: '100%',
// //     height: 200,
// //     resizeMode: 'cover',
// //     marginBottom: 10,
// //   },
// //   name: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     marginBottom: 5,
// //   },
// //   description: {
// //     fontSize: 16,
// //     marginBottom: 10,
// //   },
// //   price: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //     marginBottom: 20,
// //   },
// //   button: {
// //     backgroundColor: '#007AFF',
// //     padding: 10,
// //     borderRadius: 5,
// //     marginBottom: 10,
// //   },
// //   removeButton: {
// //     backgroundColor: '#FF3B30',
// //   },
// //   buttonText: {
// //     color: 'white',
// //     textAlign: 'center',
// //     fontSize: 16,
// //   },
// // });

// // export default ProductDetailScreen;




// import React from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// import { useDispatch } from 'react-redux';
// import { addToCart } from '../store/cartSlice';
// import { Product, CartItem } from '../types';

// const ProductDetailScreen = ({ route }: any) => {
//   const { product } = route.params;
//   const dispatch = useDispatch();

//   const handleAddVariantToCart = (variant: any) => {
//     const cartItem: CartItem = {
//       ...variant,
//       productId: product.productId,
//       productName: product.name,
//       quantity: 1,
//     };
//     dispatch(addToCart(cartItem));
//   };

//   const renderVariant = ({ item }: { item: any }) => (
//     <View style={styles.variantCard}>
//       <Text style={styles.variantName}>{item.name}</Text>
//       <Text>{item.description}</Text>
//       <Text>Barcode: {item.barcodes.join(', ')}</Text>
//       <TouchableOpacity
//         style={styles.addButton}
//         onPress={() => handleAddVariantToCart(item)}
//         disabled={!item.isActive}
//       >
//         <Text style={styles.addButtonText}>
//           {item.isActive ? 'Add to Cart' : 'Out of Stock'}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{product.title}</Text>
//       <Text>{product.shortDescription}</Text>
//       <FlatList
//         data={product.variants.filter(v => v.isActive)}
//         keyExtractor={(v) => v.variantId}
//         renderItem={renderVariant}
//         contentContainerStyle={styles.variantsList}
//       />
//     </View>
//   );
// };



// export default ProductDetailScreen;
// // ... add styles for variantCard, addButton, etc.





import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { CartItem } from '../types';
import CustomButton from '../components/CustomButton';

const ProductDetailScreen = ({ route }: any) => {
  const { product } = route.params;
  const dispatch = useDispatch();

  console.log("🧩 Product Detail Received:", JSON.stringify(product, null, 2));

  const handleAddVariantToCart = (variant: any) => {
    const cartItem: CartItem = {
      ...variant,
      productId: product.productId,
      productName: product.name,
      quantity: 1,
    };
    dispatch(addToCart(cartItem));
  };


  const handleAddToCart = () => {
  const cartItem: CartItem = {
    productId: product.productId,
    productName: product.name,
    name: product.name,
    description: product.description,
    price: product.price ?? 0, // fallback if price missing
    image: product.image ?? '',
    quantity: 1,
    barcodes: product.barcodes ?? [],
    isActive: true,
  };
  dispatch(addToCart(cartItem));
};

  const renderVariant = ({ item }: { item: any }) => (
    <View style={styles.variantCard}>
      <Text style={styles.variantName}>{item.name}</Text>
      <Text>{item.description}</Text>
      <Text>Barcode: {item.barcodes?.join(', ')}</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleAddVariantToCart(item)}
        disabled={!item.isActive}
      >
        <Text style={styles.addButtonText}>
          {item.isActive ? 'Add to Cart' : 'Out of Stock'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product?.name}</Text>
      <Text>{product?.description}</Text>

      {(!product?.variants || product.variants.length === 0) ? (
        <Text style={{ marginTop: 20, textAlign: 'center', color: 'gray' }}>
          No variants available
        </Text>
      ) : (
        <FlatList
          data={product.variants.filter(v => v.isActive)}
          keyExtractor={(v) => v.variantId}
          renderItem={renderVariant}
          contentContainerStyle={styles.variantsList}
        />
      )}
      <CustomButton title="Add to Cart" onPress={handleAddToCart} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  variantCard: { marginVertical: 10, padding: 10, backgroundColor: '#f2f2f2', borderRadius: 10 },
  variantName: { fontWeight: 'bold', fontSize: 16 },
  addButton: { backgroundColor: '#007BFF', marginTop: 8, padding: 8, borderRadius: 6 },
  addButtonText: { color: '#fff', textAlign: 'center' },
});

export default ProductDetailScreen;
