// // // import React, { useEffect } from 'react';
// // // import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
// // // import { useDispatch, useSelector } from 'react-redux';
// // // import { addToCart } from '../store/cartSlice';
// // // import { fetchProducts } from '../utils/api';
// // // import { Product } from '../types';
// // // import ProductCard from '../components/ProductCard';

// // // const ProductListScreen = ({ navigation }) => {
// // //   const dispatch = useDispatch();
// // //   const products = useSelector((state: any) => state.products.products);

// // //   useEffect(() => {
// // //     dispatch(fetchProducts() as any);
// // //   }, [dispatch]);

// // //   const handleAddToCart = (product: Product) => {
// // //     dispatch(addToCart(product));
// // //   };

// // //   const renderItem = ({ item }: { item: Product }) => (
// // //     <ProductCard
// // //       product={item}
// // //       onAddToCart={() => handleAddToCart(item)}
// // //       onViewDetails={() => navigation.navigate('ProductDetail', { product: item })}
// // //     />
// // //   );

// // //   return (
// // //     <View style={styles.container}>
// // //       <Text style={styles.header}>Available Products</Text>
// // //       <FlatList
// // //         data={products}
// // //         keyExtractor={(item) => item.id}
// // //         renderItem={renderItem}
// // //         contentContainerStyle={styles.list}
// // //       />
// // //     </View>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     padding: 10,
// // //   },
// // //   header: {
// // //     fontSize: 20,
// // //     fontWeight: 'bold',
// // //     marginBottom: 10,
// // //   },
// // //   list: {
// // //     paddingBottom: 20,
// // //   },
// // // });

// // // export default ProductListScreen;






// // import React, { useEffect } from 'react';
// // import { View, Text, FlatList, StyleSheet } from 'react-native';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { fetchProducts } from '../utils/api';
// // import { Product } from '../types';
// // import ProductCard from '../components/ProductCard';

// // const ProductListScreen = ({ navigation }: any) => {
// //   const dispatch = useDispatch();
// //   const products = useSelector((state: any) => state.products.products);

// //   useEffect(() => {
// //     dispatch(fetchProducts() as any);
// //   }, [dispatch]);

// //   // Flatten products into variants for listing (optional: show per product with expandable variants)
// //   const renderItem = ({ item }: { item: Product }) => (
// //     <ProductCard
// //       product={item}
// //       onViewDetails={() => navigation.navigate('ProductDetail', { product: item })}
// //     />
// //   );

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.header}>Products</Text>
// //       <FlatList
// //         data={products}
// //         keyExtractor={(item) => item.productId}
// //         renderItem={renderItem}
// //         contentContainerStyle={styles.list}
// //       />
// //     </View>
// //   );
// // };

// // // ... styles unchanged

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     padding: 10,
// //   },
// //   header: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //     marginBottom: 10,
// //   },
// //   list: {
// //     paddingBottom: 20,
// //   },
// // });

// // export default ProductListScreen;




// // src/screens/ProductListScreen.tsx
// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList } from 'react-native';
// import { Product } from '../types';
// import { fetchProducts } from '../api';

// const ProductListScreen = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         const response = await fetchProducts();
//         setProducts(response.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProducts();
//   }, []);

//   if (loading) return <Text>Loading...</Text>;

//   return (
//     <FlatList
//       data={products}
//       keyExtractor={(item) => item.id}
//       renderItem={({ item }) => (
//         <View>
//           <Text>{item.name}</Text>
//           <Text>₹{item.price}</Text>
//           <Text>{item.barcode}</Text>
//         </View>
//       )}
//     />
//   );
// };

// export default ProductListScreen;



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// // src/screens/ProductListScreen.tsx
// import React from 'react';
// import { View, Text, Button } from 'react-native';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../navigation/types';

// type Props = NativeStackScreenProps<RootStackParamList, 'ProductListScreen'>;

// export default function ProductListScreen({ navigation }: Props) {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Product List Screen</Text>
//       <Button title="Go Back" onPress={() => navigation.goBack()} />
//     </View>
//   );
// }



// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// import React, { useEffect } from 'react';
// import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { addToCart } from '../store/cartSlice';
// import { fetchProducts } from '../utils/api';
// import { Product } from '../types';
// import ProductCard from '../components/ProductCard';

// const ProductListScreen = ({ navigation }) => {
//   const dispatch = useDispatch();
//   const products = useSelector((state: any) => state.products.products);

// useEffect(() => {
//   const loadProducts = async () => {
//     const res = await fetchProducts();
//     dispatch({ type: 'products/setProducts', payload: res.data });
//   };
//   loadProducts();
// }, [dispatch]);



// const handleAddToCart = (product: Product) => {
//   dispatch(addToCart({ ...product, quantity: 1 }));
// };

//   const renderItem = ({ item }: { item: Product }) => (
//     <ProductCard
//       product={item}
//       onAddToCart={() => handleAddToCart(item)}
//       onViewDetails={() => navigation.navigate('ProductDetail', { product: item })}
//     />
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Available Products</Text>
//       <FlatList
//         data={products}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//         contentContainerStyle={styles.list}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   header: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   list: {
//     paddingBottom: 20,
//   },
// });

// export default ProductListScreen;






// import React, { useEffect } from 'react';
// import { View, Text, FlatList, StyleSheet } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { addToCart } from '../store/cartSlice';
// import { fetchProducts } from '../utils/api';
// import { Product } from '../types';
// import ProductCard from '../components/ProductCard';
// import { RootState } from '../store/store';

// const ProductListScreen = ({ navigation }: any) => {
//   const dispatch = useDispatch();
//   const products = useSelector((state: RootState) => state.products.products);

//   useEffect(() => {
//     const loadProducts = async () => {
//       const res = await fetchProducts();
//         console.log("📦 Products from API:--------------------------------------------------", res); // Debug log
//       dispatch({ type: 'products/setProducts', payload: res });
//     };
//     loadProducts();
//   }, [dispatch]);


//   const handleAddToCart = (product: Product) => {
//     dispatch(addToCart({ ...product, quantity: 1 })); // ✅ fix type error
//   };

//   const renderItem = ({ item }: { item: Product }) => (
//     <ProductCard
//       product={item}
//       onAddToCart={() => handleAddToCart(item)}
//       onViewDetails={() =>
//         navigation.navigate('ProductDetailScreen', { product: item })
//       }
//     />
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Available Products</Text>
//       <FlatList
//         data={products}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//         contentContainerStyle={styles.list}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 10, marginTop: 30 },
//   header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
//   list: { paddingBottom: 20 },
// });

// export default ProductListScreen;








import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { fetchProducts } from '../utils/api';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { RootState } from '../store/store';
import CustomButton from '../components/CustomButton'; // ✅ import global button


const ProductListScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    const loadProducts = async () => {
      const res = await fetchProducts();
      console.log("📦 Products fetched:", res.length);
      dispatch({ type: 'products/setProducts', payload: res });
    };
    loadProducts();
  }, [dispatch]);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  // const renderItem = ({ item }: { item: Product }) => (
  //   <ProductCard
  //     product={item}
  //     onAddToCart={() => handleAddToCart(item)}
  //     onViewDetails={() =>
  //       navigation.navigate('ProductDetailScreen', { product: item })
  //     }
  //   />
  // );
  const renderItem = ({ item }: { item: Product }) => {
  const inCart = cartItems.some((cartItem) => cartItem?.productId === item?.productId);

  const handlePress = () => {
    if (inCart) {
      navigation.navigate('CartScreen'); // go to cart if already added
    } else {
      handleAddToCart(item); // add if not yet
    }
  };

  return (
    <ProductCard
      product={item}
      onAddToCart={handlePress}
      onViewDetails={() =>
        navigation.navigate('ProductDetailScreen', { product: item })
      }
      inCart={inCart} // ✅ pass it here
    />
  );
};

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Available Products</Text>
      {products.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          No products found.
        </Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item?.productId?.toString()}
          renderItem={renderItem}
          numColumns={2} // ✅ 2 columns
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}

        {/* ✅ Example use of global button at bottom */}
      <CustomButton
        title="Go to Cart List"
        type="secondary"
        onPress={() => navigation.navigate('CartScreen')}
      />
    </View>
  );
};

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 30,
    backgroundColor: '#f8f9fa', // optional: match background
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 4,
  },
  list: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between', // ensures equal spacing
  },
  card: {
  width: '48%', // ✅ 2 per row
  marginHorizontal: 0, // remove horizontal margin
  marginBottom: 16,
  padding: 12,
  backgroundColor: '#fff',
  borderRadius: 12,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
  position: 'relative',
},
});


export default ProductListScreen;
