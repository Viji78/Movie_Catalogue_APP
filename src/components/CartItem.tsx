import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

interface CartItemProps {
  item: {
    name: string;
    price: number;
    image: string;
    quantity: number;
  };
  onRemove: () => void;
}

const CartItem = ({ item, onRemove }: CartItemProps) => {
  return (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>
          ${(item.price ?? 0).toFixed(2)} x {item.quantity}
        </Text>
        <Text style={styles.total}>
          Total: ${((item.price ?? 0) * item.quantity).toFixed(2)}
        </Text>
      </View>
      <TouchableOpacity style={styles.removeButton} onPress={()=>alert("Remove Function need to set")}>
        <Text style={styles.removeText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: "cover",
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    color: "gray",
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#007AFF",
  },
  removeButton: {
    backgroundColor: "#FF3B30",
    padding: 5,
    borderRadius: 5,
  },
  removeText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CartItem;
