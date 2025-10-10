import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { fetchProducts } from "../utils/api";
import { Product } from "../types";
import ProductCard from "../components/ProductCard";
import { RootState } from "../store/store";
import CustomButton from "../components/CustomButton"; // ✅ import global button

const ProductListScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [loading, setLoading] = useState(false); // ✅ loading state

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const res = await fetchProducts();
        console.log("📦 Products fetched:", res.length);
        dispatch({ type: "products/setProducts", payload: res });
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false); // hide loader
      }
    };
    loadProducts();
  }, [dispatch]);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const renderItem = ({ item }: { item: Product }) => {
    const inCart = cartItems.some(
      (cartItem) => cartItem?.productId === item?.productId
    );

    const handlePress = () => {
      if (inCart) {
        navigation.navigate("CartScreen"); // go to cart if already added
      } else {
        handleAddToCart(item); // add if not yet
      }
    };

    return (
      <ProductCard
        product={item}
        onAddToCart={handlePress}
        onViewDetails={() =>
          navigation.navigate("ProductDetailScreen", { product: item })
        }
        isInCart={inCart} // ✅ pass it here
        onGoToCart={() => navigation.navigate("CartScreen")}
      />
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={{ marginTop: 10 }}>Loading products...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Available Products</Text>
      {products.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
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
        onPress={() => navigation.navigate("CartScreen")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 30,
    backgroundColor: "#f8f9fa", // optional: match background
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 4,
  },
  list: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: "space-between", // ensures equal spacing
  },
  card: {
    width: "48%", // ✅ 2 per row
    marginHorizontal: 0, // remove horizontal margin
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: "relative",
  },
});

export default ProductListScreen;
