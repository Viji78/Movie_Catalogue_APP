import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

interface ProductCardProps {
  product: {
    name: string;
    price: number;
    image: string;
  };
  isInCart: boolean;
  onAddToCart: () => void;
  onGoToCart: () => void;
  onViewDetails: () => void;
}

const ProductCard = ({
  product,
  isInCart,
  onAddToCart,
  onGoToCart,
  onViewDetails,
}: ProductCardProps) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={onViewDetails}
        activeOpacity={0.9}
        style={styles.touchable}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.image} />
          
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>20% OFF</Text>
          </View>

          <View style={styles.organicBadge}>
            <Text style={styles.organicText}>🌿</Text>
          </View>
        </View>

        <View style={styles.info}>
          <Text style={styles.category}>Fresho</Text>
          <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
            {product.name}
          </Text>

          <View style={styles.weightSelector}>
            <Text style={styles.weightLabel}>1 kg</Text>
            <Text style={styles.weightArrow}>▼</Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.currentPrice}>
              ₹{Number(product?.price || 0).toFixed(2)}
            </Text>
            <Text style={styles.originalPrice}>
              ₹{(Number(product?.price || 0) * 1.2).toFixed(2)}
            </Text>
          </View>

          <View style={styles.getItBanner}>
            <Text style={styles.getItText}>
              Get it for ₹{(Number(product?.price || 0) * 0.8).toFixed(2)}
            </Text>
          </View>

          <View style={styles.quantityControl}>
            <TouchableOpacity style={styles.qtyBtn} onPress={() => {}}>
              <Text style={styles.qtyText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qtyValue}>1</Text>
            <TouchableOpacity style={styles.qtyBtn} onPress={() => {}}>
              <Text style={styles.qtyText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.addButton, isInCart && styles.goToCartButton]}
            onPress={isInCart ? onGoToCart : onAddToCart}
            activeOpacity={0.85}
          >
            <Text style={[styles.addButtonText, isInCart && styles.goToCartText]}>
              {isInCart ? "Go to Cart" : "Add"}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '40%',
    marginHorizontal: 8,
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    marginBottom:12,
  },
  touchable: {
    flex: 1,
  },
  imageContainer: {
    position: "relative",
    height: 110,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: "85%",
    height: "85%",
    resizeMode: "contain",
    borderWidth: 1,
    borderColor: "#aeaaaaff",
  },
  discountBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#d32f2f",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    zIndex: 2,
  },
  discountText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  organicBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#e8f5e9",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  organicText: {
    fontSize: 12,
    color: "#2E7D32",
  },
  info: {
    padding: 12,
    paddingTop: 0,
  },
  category: {
    fontSize: 10,
    color: "#888",
    marginBottom: 2,
    fontWeight: "600",
  },
  name: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 6,
    color: "#222",
    lineHeight: 16,
  },
  weightSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  weightLabel: {
    fontSize: 11,
    color: "#333",
    fontWeight: "600",
  },
  weightArrow: {
    fontSize: 10,
    color: "#777",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  currentPrice: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#d32f2f",
  },
  originalPrice: {
    fontSize: 11,
    color: "#999",
    textDecorationLine: "line-through",
    marginLeft: 6,
  },
  getItBanner: {
    backgroundColor: "#fff8e1",
    borderRadius: 6,
    paddingVertical: 3,
    paddingHorizontal: 6,
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  getItText: {
    fontSize: 10,
    color: "#e65100",
    fontWeight: "600",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginBottom: 10,
  },
  qtyBtn: {
    backgroundColor: "#d32f2f",
    width: 24,
    height: 24,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  qtyText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  qtyValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginHorizontal: 6,
  },
  addButton: {
    backgroundColor: "#e8f5e9",
    borderWidth: 1,
    borderColor: "#81c784",
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: "center",
  },
  addButtonText: {
    color: "#2E7D32",
    fontSize: 13,
    fontWeight: "700",
  },
  goToCartButton: {
    backgroundColor: "#2E7D32",
    borderColor: "#2E7D32",
  },
  goToCartText: {
    color: "#fff",
  },
});

export default ProductCard;