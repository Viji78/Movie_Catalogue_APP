// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { CartItem } from '../types';

// interface CartState {
//   items: CartItem[];
// }

// const initialState: CartState = {
//   items: [],
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart: (state, action: PayloadAction<CartItem>) => {
//       const existing = state.items.find(
//         item => item.variantId === action.payload.variantId
//       );
//       if (existing) {
//         existing.quantity += 1;
//       } else {
//         state.items.push({ ...action.payload });
//       }
//     },
//     removeFromCart: (state, action: PayloadAction<string>) => {
//       const index = state.items.findIndex(item => item.variantId === action.payload);
//       if (index !== -1) {
//         if (state.items[index].quantity > 1) {
//           state.items[index].quantity -= 1;
//         } else {
//           state.items.splice(index, 1);
//         }
//       }
//     },
//     clearCart: (state) => {
//       state.items = [];
//     },
//   },
// });

// export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;



// cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../types';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;

      // Find existing item by productId + variantId (if exists)
      const existingItem = state.items.find(
        item =>
          item?.productId === newItem?.productId &&
          item?.variantId === newItem?.variantId
      );

      if (existingItem) {
        existingItem.quantity += 1; // increase quantity if already in cart
      } else {
        state.items.push({ ...newItem, quantity: 1 }); // add new item
      }
    },

    removeFromCart: (
      state,
      action: PayloadAction<{ productId: string; variantId?: string }>
    ) => {
      const { productId, variantId } = action.payload;

      const index = state.items.findIndex(
        item =>
          item?.productId === productId ||
          item?.variantId === variantId
      );

      if (index !== -1) {
        if (state.items[index].quantity > 1) {
          state.items[index].quantity -= 1;
        } else {
          state.items.splice(index, 1);
        }
      }
    },

    clearCart: state => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
