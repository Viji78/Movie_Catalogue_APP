// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { Product, ProductResponse } from '../types';
// import { fetchProducts } from '../utils/api';

// interface ProductState {
//   products: Product[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: ProductState = {
//   products: [],
//   loading: false,
//   error: null,
// };

// const productSlice = createSlice({
//   name: 'products',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProducts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<ProductResponse>) => {
//         state.loading = false;
//         state.products = action.payload.data;
//       })
//       .addCase(fetchProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || 'Failed to fetch products';
//       });
//   },
// });

// export default productSlice.reducer;




// // src/store/productSlice.ts
// import { create } from 'zustand';
// import { Product } from '../types';
// import { fetchProducts } from '../api';

// interface ProductState {
//   products: Product[];
//   loading: boolean;
//   fetchProducts: () => Promise<void>;
// }

// export const useProductStore = create<ProductState>((set) => ({
//   products: [],
//   loading: false,

//   fetchProducts: async () => {
//     set({ loading: true });
//     try {
//       const response = await fetchProducts();
//       set({ products: response.data });
//     } catch (error) {
//       console.error(error);
//     } finally {
//       set({ loading: false });
//     }
//   },
// }));






// // src/store/productSlice.ts
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { Product, ProductResponse } from '../types';
// import { fetchProducts as fetchProductsAPI } from '../utils/api';

// export const fetchProducts = createAsyncThunk(
//   'products/fetchProducts',
//   async () => {
//     const response: ProductResponse = await fetchProductsAPI();
//     return response.data;
//   }
// );

// const productSlice = createSlice({
//   name: 'products',
//   initialState: {
//     products: [] as Product[],
//     loading: false,
//   },
//   reducers: {},
//   extraReducers: builder => {
//     builder
//       .addCase(fetchProducts.pending, state => {
//         state.loading = true;
//       })
//       .addCase(fetchProducts.fulfilled, (state, action) => {
//         state.products = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchProducts.rejected, state => {
//         state.loading = false;
//       });
//   },
// });

// export default productSlice.reducer;



// // src/store/productSlice.ts
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { fetchProducts } from '../utils/api';
// import { Product } from '../types';

// export const fetchProductsThunk = createAsyncThunk('products/fetch', async () => {
//   const response = await fetchProducts();
//   return response.data;
// });

// const productSlice = createSlice({
//   name: 'products',
//   initialState: { products: [], loading: false },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProductsThunk.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchProductsThunk.fulfilled, (state, action) => {
//         state.products = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchProductsThunk.rejected, (state) => {
//         state.loading = false;
//       });
//   },
// });

// export default productSlice.reducer;




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
