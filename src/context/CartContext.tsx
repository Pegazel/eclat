import type React from "react";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartCtx {
  items: CartItem[];
  add: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  update: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  count: number;
  subtotal: number;
}

const g = globalThis as unknown as { __eclatCartCtx?: React.Context<CartCtx | null> };
const Ctx = g.__eclatCartCtx ?? (g.__eclatCartCtx = createContext<CartCtx | null>(null));

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem("eclat-cart") || "[]"); } catch { return []; }
  });
  useEffect(() => { localStorage.setItem("eclat-cart", JSON.stringify(items)); }, [items]);

  const add: CartCtx["add"] = (item, qty = 1) =>
    setItems((prev) => {
      const ex = prev.find((i) => i.id === item.id);
      if (ex) return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + qty } : i));
      return [...prev, { ...item, quantity: qty }];
    });
  const update = (id: string, qty: number) =>
    setItems((prev) => (qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i))));
  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
  const clear = () => setItems([]);

  const count = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.quantity * i.price, 0);

  return <Ctx.Provider value={{ items, add, update, remove, clear, count, subtotal }}>{children}</Ctx.Provider>;
};

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
};

export const SHIPPING_FREE_FROM = 50;
export const shippingCost = (subtotal: number, method: "standard" | "express" = "standard") => {
  if (method === "express") return 9.9;
  return subtotal >= SHIPPING_FREE_FROM ? 0 : 4.9;
};
