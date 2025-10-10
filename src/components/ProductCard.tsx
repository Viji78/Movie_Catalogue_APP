// import React from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

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
//       <Image source={{ uri: product.image }} style={styles.image} />
//       <Text style={styles.name}>{product.name}</Text>
//       <Text style={styles.price}>
//         ${Number(product?.price || 0).toFixed(2)}
//       </Text>
//       {/* <Text style={styles.price}>${product.price.toFixed(2)}</Text> */}
//       <View style={styles.buttons}>
//         <TouchableOpacity style={styles.button} onPress={onAddToCart}>
//           <Text style={styles.buttonText}>Add</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={[styles.button, styles.viewButton]} onPress={onViewDetails}>
//           <Text style={styles.buttonText}>View</Text>
//         </TouchableOpacity>
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
//   name: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   price: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   buttons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   button: {
//     backgroundColor: '#007AFF',
//     padding: 5,
//     borderRadius: 5,
//     flex: 1,
//     marginRight: 5,
//   },
//   viewButton: {
//     backgroundColor: '#4CD964',
//   },
//   buttonText: {
//     color: 'white',
//     textAlign: 'center',
//     fontSize: 14,
//   },
// });

// export default ProductCard;


//////////////////////////////////

// components/ProductCard.tsx — NO LOGIC CHANGED, ONLY STYLES UPDATED
// components/ProductCard.tsx — NO LOGIC CHANGED, ONLY STYLES & LAYOUT UPDATED TO MATCH DESIGN

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface ProductCardProps {
  product: {
    name: string;
    price: number;
    image: string;
  };
  isInCart: boolean; // ✅ new prop
  onAddToCart: () => void;
  onGoToCart: () => void; // ✅ new prop
  onViewDetails: () => void;
}

const ProductCard = ({ product, isInCart, onAddToCart, onGoToCart, onViewDetails }: ProductCardProps) => {
  return (
    <View style={styles.card}>
             <TouchableOpacity onPress={onViewDetails}>

      {/* Image */}
      <Image source={{ uri: product.image }} style={styles.image} />

      {/* Discount Badge */}
      <View style={styles.discountBadge}>
        <Text style={styles.discountText}>20% OFF</Text>
      </View>

      {/* Organic Badge */}
      <View style={styles.organicBadge}>
        <Text style={styles.organicText}>🌿</Text>
      </View>

      {/* Product Info */}
      <View style={styles.info}>
        <Text style={styles.category}>Fresho</Text>
        <Text style={styles.name}>{product.name}</Text>

        {/* Weight Selector */}
        <View style={styles.weightSelector}>
          <Text style={styles.weightLabel}>1 kg</Text>
          <Text style={styles.weightArrow}>▼</Text>
        </View>

        {/* Price */}
        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>
            ₹{Number(product?.price || 0).toFixed(2)}
          </Text>
          <Text style={styles.originalPrice}>₹{(Number(product?.price || 0) * 1.2).toFixed(2)}</Text>
        </View>

        {/* "Get it for" Banner */}
        <View style={styles.getItBanner}>
          <Text style={styles.getItText}>Get it for ₹{(Number(product?.price || 0) * 0.8).toFixed(2)}</Text>
        </View>

        {/* Quantity Control Button (Red) */}
        <View style={styles.quantityControl}>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => {}}>
            <Text style={styles.qtyText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyValue}>1</Text>
          <TouchableOpacity style={styles.qtyBtn} onPress={() => {}}>
            <Text style={styles.qtyText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Add Button (Green) — this is your onAddToCart */}
       {/* ✅ Button logic */}
          <TouchableOpacity
            style={[styles.addButton, isInCart && styles.goToCartButton]}
            onPress={isInCart ? onGoToCart : onAddToCart}
          >
            <Text style={[styles.addButtonText, isInCart && styles.goToCartText]}>
              {isInCart ? 'Go to Cart' : 'Add'}
            </Text>
          </TouchableOpacity>
      </View>
            </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 160,
    marginHorizontal: 8,
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
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#2E7D32',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  organicBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 2,
  },
  organicText: {
    fontSize: 12,
  },
  info: {
    flex: 1,
  },
  category: {
    fontSize: 10,
    color: '#666',
    marginBottom: 2,
  },
  name: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  weightSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginBottom: 8,
  },
  weightLabel: {
    fontSize: 10,
    color: '#333',
  },
  weightArrow: {
    fontSize: 10,
    color: '#666',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  currentPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  originalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
    marginLeft: 4,
  },
  getItBanner: {
    backgroundColor: '#ffebee',
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginBottom: 8,
  },
  getItText: {
    fontSize: 10,
    color: '#d32f2f',
    textAlign: 'center',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffebee',
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginBottom: 8,
  },
  qtyBtn: {
    backgroundColor: '#d32f2f',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  qtyText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  qtyValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#e8f5e9',
    borderWidth: 1,
    borderColor: '#81c784',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#2E7D32',
    fontSize: 12,
    fontWeight: 'bold',
  },
  goToCartButton: {
  backgroundColor: '#2E7D32',
  borderColor: '#2E7D32',
},
goToCartText: {
  color: '#fff',
},
});

export default ProductCard;