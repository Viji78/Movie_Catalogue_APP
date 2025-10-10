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
import CustomButton from "../components/CustomButton";
import TopNavButtons from "../components/TopNavButtons";

const ProductListScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (products.length === 0) {
      const loadProducts = async () => {
        setLoading(true);
        try {
          const res = await fetchProducts();
          console.log("📦 Products fetched:", res.length);
          dispatch({ type: "products/setProducts", payload: res });
        } catch (error) {
          console.error("Failed to fetch products:", error);
        } finally {
          setLoading(false);
        }
      };
      loadProducts();
    }
  }, [dispatch, products.length]);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const renderItem = ({ item }: { item: Product }) => {
    const inCart = cartItems.some(
      (cartItem) => cartItem?.productId === item?.productId
    );

    const handlePress = () => {
      if (inCart) {
        navigation.navigate("CartScreen");
      } else {
        handleAddToCart(item);
      }
    };

    return (
      <ProductCard
        product={item}
        onAddToCart={handlePress}
        onViewDetails={() =>
          navigation.navigate("ProductDetailScreen", { product: item })
        }
        isInCart={inCart}
        onGoToCart={() => navigation.navigate("CartScreen")}
      />
    );
  };

  if (loading && products.length === 0) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={{ marginTop: 10 }}>Loading products...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Available Products</Text>

      {products.length === 0 ? (
        <Text style={styles.emptyText}>No products found.</Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item?.productId?.toString()}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
      <TopNavButtons />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 30,
    backgroundColor: "#f8f9fa",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 4,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
  },
  list: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: "space-around",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductListScreen;
