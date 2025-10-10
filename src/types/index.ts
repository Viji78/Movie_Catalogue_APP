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