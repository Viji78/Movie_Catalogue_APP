import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, clearCart } from '../store/cartSlice';
import CartItem from '../components/CartItem';
import CustomButton from '../components/CustomButton';

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.items);

  const total = cartItems.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    alert(`Total: $${total.toFixed(2)}\nThank you for shopping!`);
    dispatch(clearCart());
    navigation.goBack();
  };

  const renderItem = ({ item }: { item: any }) => (
    <CartItem
      item={item}
      onRemove={() => dispatch(removeFromCart(item.id))}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Cart</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.empty}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
          />
          <Text style={styles.total}>Total: ${total?.toFixed(2)}</Text>
          <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
            <Text style={styles.checkoutText}>Bye Now & Clear Cart</Text>
          </TouchableOpacity>
        </>
      )}
      <CustomButton title="Back to Shoping List" type="secondary" 
      onPress={() => navigation.navigate('ProductListScreen')}
 />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  empty: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  list: {
    paddingBottom: 20,
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'right',
  },
  checkoutButton: {
    backgroundColor: '#486a05ff',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  checkoutText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default CartScreen;