import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../types';

const productSlice = createSlice({
  name: 'products',
  initialState: { products: [] as Product[] },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
