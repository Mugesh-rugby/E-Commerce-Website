import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "./data";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getSubtotal: () => number;
  getItemCount: () => number;
}

interface WishlistStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  toggle: (product: Product) => void;
}

interface RecentlyViewedStore {
  items: Product[];
  addItem: (product: Product) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1, color, size) => {
        set(state => {
          const existing = state.items.find(item => item.product.id === product.id);
          if (existing) {
            return {
              items: state.items.map(item =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return {
            items: [...state.items, { product, quantity, selectedColor: color, selectedSize: size }],
          };
        });
      },
      removeItem: (productId) => {
        set(state => ({ items: state.items.filter(item => item.product.id !== productId) }));
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set(state => ({
          items: state.items.map(item =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      },
      getTotal: () => {
        const subtotal = get().getSubtotal();
        const shipping = subtotal > 200 ? 0 : 15;
        return subtotal + shipping;
      },
      getItemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: "luxe-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        set(state => {
          if (state.items.find(p => p.id === product.id)) return state;
          return { items: [...state.items, product] };
        });
      },
      removeItem: (productId) => {
        set(state => ({ items: state.items.filter(p => p.id !== productId) }));
      },
      isWishlisted: (productId) => {
        return get().items.some(p => p.id === productId);
      },
      toggle: (product) => {
        const { isWishlisted, addItem, removeItem } = get();
        if (isWishlisted(product.id)) {
          removeItem(product.id);
        } else {
          addItem(product);
        }
      },
    }),
    {
      name: "luxe-wishlist",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useRecentlyViewedStore = create<RecentlyViewedStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) => {
        set(state => {
          const filtered = state.items.filter(p => p.id !== product.id);
          return { items: [product, ...filtered].slice(0, 8) };
        });
      },
    }),
    {
      name: "luxe-recently-viewed",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

interface UIStore {
  theme: "light" | "dark";
  toggleTheme: () => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      theme: "light",
      toggleTheme: () => set(state => ({ theme: state.theme === "light" ? "dark" : "light" })),
      searchOpen: false,
      setSearchOpen: (open) => set({ searchOpen: open }),
      cartOpen: false,
      setCartOpen: (open) => set({ cartOpen: open }),
    }),
    {
      name: "luxe-ui",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);
