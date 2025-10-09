// src/utils/productUtils.ts
import { ApiProduct, Product } from '../types';

export function mapApiProductToProduct(apiProduct: ApiProduct): Product {
  const primaryVariant = apiProduct.variants[0]; // Use first variant
  const barcode = primaryVariant?.barcodes?.[0] || '';
  const price = primaryVariant?.inventorySync?.sellingPrice ?? 0;

  return {
    id: apiProduct.productId,
    name: apiProduct.name,
    description: apiProduct.description,
    price: price,
    image: apiProduct.imageUrls?.[0] || '', // fallback to empty string
    barcode: barcode,
    createdAt: new Date(apiProduct.created * 1000).toISOString(), // Convert Unix → ISO
  };
}