// import { configureStore } from '@reduxjs/toolkit';
// import cartReducer from './cartSlice';
// import productReducer from './productSlice';

// export const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//     products: productReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;



// import { configureStore } from '@reduxjs/toolkit';
// import cartReducer from './cartSlice';
// import productReducer from './productSlice';

// export const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//     products: productReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;


// store.ts (Redux store)
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice'; // only keep Redux slices if any
import productReducer from './productSlice';


const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer, // ✅ this must match your state path
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;