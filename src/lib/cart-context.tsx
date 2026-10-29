"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import { getProduct, type Product } from "@/data/products";
import {
  estimateShipping,
  type ShippingAddress,
  type ShippingEstimate,
} from "@/data/shipping";

export const MAX_QTY = 10;

export interface CartLine {
  key: string; // slug + variation
  slug: string;
  quantity: number;
  variation?: string; // e.g. "Scent: Ochre – Daydream"
}

export interface CartLineWithProduct extends CartLine {
  product: Product;
  lineTotal: number;
}

interface CartState {
  lines: CartLine[];
  shippingAddress: ShippingAddress;
}

type Action =
  | { type: "hydrate"; state: CartState }
  | { type: "add"; slug: string; quantity: number; variation?: string }
  | { type: "set"; key: string; quantity: number }
  | { type: "remove"; key: string }
  | { type: "clear" }
  | { type: "shipping"; address: ShippingAddress };

const initialState: CartState = {
  lines: [],
  shippingAddress: { country: "US", region: "", postalCode: "", methodId: "standard" },
};

const STORAGE_KEY = "greenbush-twins-demo-cart-v1";

function clampQty(n: number) {
  return Math.max(1, Math.min(MAX_QTY, Math.floor(n)));
}

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "hydrate":
      return action.state;
    case "add": {
      const product = getProduct(action.slug);
      if (!product || !product.priceVerified) return state;
      const key = action.variation ? `${action.slug}::${action.variation}` : action.slug;
      const existing = state.lines.find((l) => l.key === key);
      const lines = existing
        ? state.lines.map((l) =>
            l.key === key ? { ...l, quantity: clampQty(l.quantity + action.quantity) } : l,
          )
        : [...state.lines, { key, slug: action.slug, quantity: clampQty(action.quantity), variation: action.variation }];
      return { ...state, lines };
    }
    case "set":
      return {
        ...state,
        lines: state.lines
          .map((l) => (l.key === action.key ? { ...l, quantity: action.quantity } : l))
          .filter((l) => l.quantity > 0)
          .map((l) => ({ ...l, quantity: clampQty(l.quantity) })),
      };
    case "remove":
      return { ...state, lines: state.lines.filter((l) => l.key !== action.key) };
    case "clear":
      return { ...state, lines: [] };
    case "shipping":
      return { ...state, shippingAddress: action.address };
  }
}

interface CartContextValue {
  lines: CartLineWithProduct[];
  itemCount: number;
  subtotal: number;
  shippingAddress: ShippingAddress;
  shippingEstimate: ShippingEstimate | null;
  total: number;
  hydrated: boolean;
  addItem: (slug: string, quantity?: number, variation?: string) => boolean;
  setQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  setShippingAddress: (address: ShippingAddress) => void;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toast: string | null;
  showToast: (msg: string) => void;
  bump: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [hydrated, setHydrated] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [bump, setBump] = useState(0);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<CartState>;
        dispatch({
          type: "hydrate",
          state: {
            lines: Array.isArray(parsed.lines) ? parsed.lines.filter((l) => getProduct(l.slug)) : [],
            shippingAddress: { ...initialState.shippingAddress, ...(parsed.shippingAddress ?? {}) },
          },
        });
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const lines = useMemo<CartLineWithProduct[]>(
    () =>
      state.lines
        .map((l) => {
          const product = getProduct(l.slug)!;
          return { ...l, product, lineTotal: Math.round(product.price * l.quantity * 100) / 100 };
        })
        .filter((l) => l.product),
    [state.lines],
  );

  const itemCount = lines.reduce((n, l) => n + l.quantity, 0);
  const subtotal = Math.round(lines.reduce((n, l) => n + l.lineTotal, 0) * 100) / 100;
  const shippingEstimate = useMemo(
    () => estimateShipping(state.shippingAddress, subtotal, itemCount),
    [state.shippingAddress, subtotal, itemCount],
  );
  const total = Math.round((subtotal + (shippingEstimate?.amount ?? 0)) * 100) / 100;

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2600);
  }, []);

  const addItem = useCallback(
    (slug: string, quantity = 1, variation?: string) => {
      const product = getProduct(slug);
      if (!product || !product.priceVerified) return false;
      const safeQty = clampQty(quantity);
      dispatch({ type: "add", slug, quantity: safeQty, variation });
      setBump((b) => b + 1);
      showToast(`${product.name} added to your bag`);
      return true;
    },
    [showToast],
  );

  const value: CartContextValue = {
    lines,
    itemCount,
    subtotal,
    shippingAddress: state.shippingAddress,
    shippingEstimate,
    total,
    hydrated,
    addItem,
    setQuantity: (key, quantity) => dispatch({ type: "set", key, quantity }),
    removeItem: (key) => dispatch({ type: "remove", key }),
    clearCart: () => dispatch({ type: "clear" }),
    setShippingAddress: (address) => dispatch({ type: "shipping", address }),
    drawerOpen,
    openDrawer: () => setDrawerOpen(true),
    closeDrawer: () => setDrawerOpen(false),
    toast,
    showToast,
    bump,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
