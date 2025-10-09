import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface ProductCardProps {
  product: {
    name: string;
    price: number;
    image: string;
  };
  onAddToCart: () => void;
  onViewDetails: () => void;
}

const ProductCard = ({ product, onAddToCart, onViewDetails }: ProductCardProps) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>
        ${Number(product?.price || 0).toFixed(2)}
      </Text>
      {/* <Text style={styles.price}>${product.price.toFixed(2)}</Text> */}
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={onAddToCart}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.viewButton]} onPress={onViewDetails}>
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 5,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 5,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  viewButton: {
    backgroundColor: '#4CD964',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default ProductCard;






// import React from 'react';
// import { View, Text, Image, StyleSheet } from 'react-native';
// import CustomButton from './CustomButton';

// interface ProductCardProps {
//   product: {
//     name: string;
//     price: number;
//     image: string;
//   };
//   onAddToCart: () => void;
//   onViewDetails: () => void;
// }

// const ProductCard = ({ product, onAddToCart, onViewDetails }: ProductCardProps) => {
//   return (
//     <View style={styles.card}>
//       <Image
//         source={{ uri: product.image || 'https://via.placeholder.com/150' }}
//         style={styles.image}
//       />
//       <Text style={styles.name}>{product.name || 'Unnamed Product'}</Text>
//       <Text style={styles.price}>
//         ${Number(product?.price || 0).toFixed(2)}
//       </Text>

//       <View style={styles.buttonRow}>
//         <CustomButton title="Add" onPress={onAddToCart} type="primary" />
//         <CustomButton title="View" onPress={onViewDetails} type="secondary" />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 10,
//     marginBottom: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   image: {
//     width: '100%',
//     height: 150,
//     resizeMode: 'cover',
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   name: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
//   price: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
//   buttonRow: { flexDirection: 'row', justifyContent: 'space-between' },
// });

// export default ProductCard;
