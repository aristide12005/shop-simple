// Product Collection (Level 1 - Container)
export interface ProductCollection {
  id: string;
  name: string;
  description: string | null;
  banner_image_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Category (Level 2 - Tag/Attribute)
export interface Category {
  id: string;
  name: string;
  slug: string;
  display_order: number;
  created_at: string;
}

// Product (Level 3 - Parent item, formerly "collections")
export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock_quantity: number;
  collection_id: string | null;
  category_id: string | null;
  currency: 'USD' | 'CAD';
  created_at: string;
  updated_at: string;
}

// Product Variant (Level 4 - Physical SKU)
export interface ProductVariant {
  id: string;
  collection_id: string; // This is actually product_id (legacy naming)
  name: string;
  sku: string | null;
  stock_quantity: number;
  price: number | null;
  created_at: string;
  updated_at: string;
}

// Product Image (can be linked to variant for variant-specific images)
export interface ProductImage {
  id: string;
  collection_id: string; // This is actually product_id (legacy naming)
  variant_id: string | null;
  image_url: string;
  display_order: number;
  created_at: string;
}

// Extended types with relationships
export interface ProductWithDetails extends Product {
  collection_images: ProductImage[];
  product_variants?: ProductVariant[];
  product_collection?: ProductCollection;
  category?: Category;
}

// Legacy type alias for backward compatibility
export type Collection = Product;
export type CollectionImage = ProductImage;
export type CollectionWithImages = ProductWithDetails;

export interface CartItem {
  collection: ProductWithDetails;
  variant?: ProductVariant;
  quantity: number;
}

export interface Order {
  id: string;
  customer_email: string;
  customer_name: string | null;
  total_amount: number;
  paypal_order_id: string | null;
  status: string;
  shipping_address: string | null;
  shipping_city: string | null;
  shipping_country: string | null;
  created_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  collection_id: string;
  collection_name: string;
  price: number;
  quantity: number;
}

export interface Profile {
  id: string;
  user_id: string;
  email: string | null;
  full_name: string | null;
  is_admin: boolean;
  created_at: string;
}
