

// src/utils/api.ts

import axios from 'axios';
import { Product, CartItem } from '../types';

const API_BASE_URL = 'https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/product/v2/filter/product';

export const fetchProducts = async () => {
  const response = await axios.post(API_BASE_URL, {
    page: "1",
    pageSize: "20",
    sort: { creationDateSortOption: "DESC" }
  });

  // ✅ Return only the actual product array
    console.log("✅ API raw response:", JSON.stringify(response.data, null, 2));
  return response.data?.data?.data || [];
};

// 🔻 NEW: Helper to flatten all active variants from all products
export const getAllActiveVariants = (productList: any[]) => {
  const variants: any[] = [];
  productList.forEach((product: any) => {
    if (product.variants && Array.isArray(product.variants)) {
      product.variants.forEach((variant: any) => {
        if (variant.isActive && variant.barcodes && variant.barcodes.length > 0) {
          variants.push({
            ...variant,
            productId: product.productId,
            productName: product.name,
            productTitle: product.title,
            productImageUrls: product.imageUrls,
          });
        }
      });
    }
  });
  return variants;
};

// 🔻 NEW: Main function used in scanner
export const getVariantByBarcode = async (barcode: string): Promise<CartItem | null> => {
  try {
    const response = await fetchProducts();

    // Adjust this based on console log result:
    const products = response.data?.content ?? []; // ✅ correct access

    const allVariants = getAllActiveVariants(products);

    const found = allVariants.find((v: any) => v.barcodes.includes(barcode));

    if (found) {
      return {
        variantId: found.variantId,
        name: found.name,
        description: found.description,
        barcodes: found.barcodes,
        productId: found.productId,
        productName: found.productName,
        price: found.inventorySync?.sellingPrice ?? found.inventorySync?.mrp ?? 0,
        image: found.images?.[0] || found.productImageUrls?.[0] || '',
        quantity: 1,
        isActive: found.isActive,
      };
    }

    console.warn('⚠️ No variant found for barcode:', barcode);
    return null;

  } catch (error: any) {
    console.error('Error fetching variant by barcode:', error.message);
    return null;
  }
};
