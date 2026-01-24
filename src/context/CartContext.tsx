import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CartItem, CollectionWithImages } from '@/types/database';

interface CartContextType {
  items: CartItem[];
  addToCart: (collection: CollectionWithImages) => void;
  removeFromCart: (collectionId: string) => void;
  updateQuantity: (collectionId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalAmount: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = useCallback((collection: CollectionWithImages) => {
    setItems(prev => {
      const existing = prev.find(item => item.collection.id === collection.id);
      if (existing) {
        return prev.map(item =>
          item.collection.id === collection.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { collection, quantity: 1 }];
    });
    setIsCartOpen(true); // Auto-open cart
  }, []);

  const removeFromCart = useCallback((collectionId: string) => {
    setItems(prev => prev.filter(item => item.collection.id !== collectionId));
  }, []);

  const updateQuantity = useCallback((collectionId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(collectionId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.collection.id === collectionId
          ? { ...item, quantity }
          : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce(
    (sum, item) => sum + Number(item.collection.price) * item.quantity,
    0
  );

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
