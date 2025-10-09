// export type RootStackParamList = {
//   LoginScreen: undefined;
//   ProductListScreen: undefined;
//   ProductDetailScreen: { product: Product }; // add this
// };


export type RootStackParamList = {
  LoginScreen: undefined;
  ProductListScreen: undefined;
  ProductDetailScreen: { product: any }; // Pass product from ProductList
  CartScreen: undefined;
  BarcodeScannerScreen: undefined;
};