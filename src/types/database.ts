export interface Collection {
  id: string;
  name: string;
  description: string | null;
  price: number;
  created_at: string;
  updated_at: string;
  stock_quantity: number;
}

export interface ProductVariant {
  id: string;
  collection_id: string;
  name: string;
  sku: string | null;
  stock_quantity: number;
  price: number | null;
  created_at: string;
  updated_at: string;
}

export interface CollectionImage {
  id: string;
  collection_id: string;
  image_url: string;
  display_order: number;
  created_at: string;
}

export interface CollectionWithImages extends Collection {
  collection_images: CollectionImage[];
  product_variants?: ProductVariant[];
}

export interface CartItem {
  collection: Collection;
  quantity: number;
}

export interface Order {
  id: string;
  customer_email: string;
  customer_name: string | null;
  total_amount: number;
  paypal_order_id: string | null;
  status: string;
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
