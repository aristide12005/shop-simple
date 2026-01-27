import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { CartItem, CollectionWithImages, ProductVariant } from '@/types/database';

interface CartContextType {
  items: CartItem[];
  addToCart: (collection: CollectionWithImages, variant?: ProductVariant) => void;
  removeFromCart: (collectionId: string, variantId?: string) => void;
  updateQuantity: (collectionId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalAmount: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper to load cart from localStorage
const loadCartFromStorage = (): CartItem[] => {
  try {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Helper to save cart to localStorage
const saveCartToStorage = (items: CartItem[]) => {
  try {
    localStorage.setItem('cart', JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save cart:', e);
  }
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCartFromStorage);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    saveCartToStorage(items);
  }, [items]);

  const getItemKey = (collectionId: string, variantId?: string) => 
    variantId ? `${collectionId}-${variantId}` : collectionId;

  const addToCart = useCallback((collection: CollectionWithImages, variant?: ProductVariant) => {
    setItems(prev => {
      const existing = prev.find(item => 
        item.collection.id === collection.id && 
        (variant ? item.variant?.id === variant.id : !item.variant)
      );
      
      if (existing) {
        return prev.map(item =>
          item.collection.id === collection.id && 
          (variant ? item.variant?.id === variant.id : !item.variant)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { collection, variant, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((collectionId: string, variantId?: string) => {
    setItems(prev => prev.filter(item => 
      !(item.collection.id === collectionId && 
        (variantId ? item.variant?.id === variantId : !item.variant))
    ));
  }, []);

  const updateQuantity = useCallback((collectionId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeFromCart(collectionId, variantId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.collection.id === collectionId && 
        (variantId ? item.variant?.id === variantId : !item.variant)
          ? { ...item, quantity }
          : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => {
    const price = item.variant?.price ?? item.collection.price;
    return sum + Number(price) * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalAmount,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
