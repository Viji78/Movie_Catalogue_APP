// // export interface Product {
// //   id: string;
// //   name: string;
// //   description: string;
// //   price: number;
// //   image: string;
// //   barcode: string;
// //   createdAt?: string; // optional
// // }

// // export interface CartItem extends Product {
// //   quantity: number;
// // }

// // export interface ProductResponse {
// //   data: Product[];
// //   total: number;
// //   page: number;
// //   pageSize: number;
// // }




// // Variant (since price, barcode, etc. live here)
// export interface ProductVariant {
//   variantId: string;
//   name: string;
//   description: string;
//   barcodes: string[]; // e.g., ["5555500000050"]
//   inventorySync: {
//     sellingPrice?: number | null;
//     mrp?: number | null;
//     availableQuantity?: number | null;
//     created: number; // Unix timestamp
//     updated: number;
//   };
//   // Add other fields if needed (e.g., images, weight, etc.)
// }

// // Main Product
// export interface Product {
//   productId: string; // not 'id'
//   name: string;
//   title: string;
//   description: string;
//   shortDescription: string;
//   variants: ProductVariant[]; // essential!
//   tags: string[];
//   keywords: string[];
//   industryType: string[];
//   eligibleForSale: boolean;
//   inStock: boolean;
//   created: number; // Unix timestamp (e.g., 1754737730)
//   updated: number;
//   // imageUrls may be string[] or null
//   imageUrls: string[] | null;
// }

// // CartItem (you may want to tie it to a specific variant)
// export interface CartItem {
//   productId: string;
//   variantId: string;
//   name: string;
//   description: string;
//   price: number;
//   barcode: string; // pick first from variant.barcodes
//   image: string | null;
//   quantity: number;
//   createdAt?: string; // optional ISO string (you can format `created`)
// }

// // API Response Wrapper
// export interface ProductResponse {
//   es: number;
//   message: string;
//   statusCode: number;
//   data: {
//     totalRecords: number;
//     totalPages: number;
//     currentPage: number;
//     pageSize: number;
//     data: Product[]; // array of products
//   };
// }









// export interface Variant {
//   variantId: string;
//   name: string;
//   description: string;
//   barcodes: string[];
//   sellingPrice?: number;
//   mrp?: number;
//   images?: string[] | null;
//   isActive: boolean;
// }

// export interface Product {
//   productId: string;
//   id: string;
//   name: string;
//   title: string;
//   shortDescription: string;
//   description: string;
//   imageUrls?: string[] | null;
//   variants: Variant[];
//   tags: string[];
//   keywords: string[];
//   inStock: boolean;
//   isActive: boolean;
// }

// // Cart item will be based on a selected variant
// export interface CartItem extends Variant {
//   productId: string;
//   productName: string;
//   quantity: number;
// }

// export interface ProductResponse {
//   totalRecords: number;
//   totalPages: number;
//   currentPage: number;
//   pageSize: number;
//   data: Product[];
// }

// export interface CartItem {
//   variantId: string;
//   name: string;
//   description: string;
//   barcodes: string[];
//   productId: string;
//   productName: string;
//   price: number;
//   image: string;
//   quantity: number;
//   isActive: boolean;
// }


// src/types/index.ts

// --- API Response Structure ---
export interface ApiVariant {
  variantId: string;
  name: string;
  description: string;
  barcodes: string[];
  inventorySync: {
    sellingPrice?: number | null;
    mrp?: number | null;
    created: number; // Unix timestamp
    updated: number;
  };
}

export interface ApiProduct {
  productId: string;
  name: string;
  title: string;
  description: string;
  shortDescription: string;
  variants: ApiVariant[];
  imageUrls: string[] | null;
  created: number; // Unix timestamp
  inStock: boolean;
  // Add more fields if needed (e.g., tags, industryType)
}

export interface ApiProductResponseData {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  data: ApiProduct[];
}

export interface ApiProductResponse {
  es: number;
  message: string;
  statusCode: number;
   ApiProductResponseData;
}

// --- Simplified App Product Interface ---
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  barcode: string;
  createdAt?: string; // ISO string
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ProductResponse {
  data: Product[];
  total: number;
  page: number;
  pageSize: number;
}