import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { CartItem } from "../types";
import CustomButton from "../components/CustomButton";

const ProductDetailScreen = ({ route, navigation }: any) => {
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
      price: product.price ?? 0,
      image: product.image ?? "",
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
      <Text>Barcode: {item.barcodes?.join(", ")}</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleAddVariantToCart(item)}
        disabled={!item.isActive}
      >
        <Text style={styles.addButtonText}>
          {item.isActive ? "Add to Cart" : "Out of Stock"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product?.name}</Text>
      <Text>{product?.description}</Text>

      {!product?.variants || product.variants.length === 0 ? (
        <Text style={{ marginTop: 20, textAlign: "center", color: "gray" }}>
          No variants available
        </Text>
      ) : (
        <FlatList
          data={product.variants.filter((v) => v.isActive)}
          keyExtractor={(v) => v.variantId}
          renderItem={renderVariant}
          contentContainerStyle={styles.variantsList}
        />
      )}
      <CustomButton title="Add to Cart" onPress={handleAddToCart} />
      <CustomButton
        title="Go to Cart"
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
    backgroundColor: "#f8f9fa",
  },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
  variantCard: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
  },
  variantName: { fontWeight: "bold", fontSize: 16 },
  addButton: {
    backgroundColor: "#007BFF",
    marginTop: 8,
    padding: 8,
    borderRadius: 6,
  },
  addButtonText: { color: "#fff", textAlign: "center" },
});

export default ProductDetailScreen;
