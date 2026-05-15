"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, getSubtotal, getTotal } = useCartStore();

  const subtotal = getSubtotal();
  const total = getTotal();
  const shipping = subtotal > 200 ? 0 : 15;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-[rgb(var(--background))] shadow-luxury-lg flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[rgb(var(--border))]">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} />
                <h2 className="text-lg font-display font-light tracking-wide">
                  Shopping Cart
                  {items.length > 0 && (
                    <span className="ml-2 text-sm text-[rgb(var(--muted-foreground))] font-body">
                      ({items.length} {items.length === 1 ? "item" : "items"})
                    </span>
                  )}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-[rgb(var(--muted))] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full gap-4 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-[rgb(var(--muted))] flex items-center justify-center">
                    <ShoppingBag size={32} className="text-[rgb(var(--muted-foreground))]" />
                  </div>
                  <div>
                    <p className="font-display text-xl font-light">Your cart is empty</p>
                    <p className="text-sm text-[rgb(var(--muted-foreground))] mt-1">
                      Start adding items you love
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="mt-2 px-6 py-2.5 bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] text-sm tracking-widest uppercase rounded-full hover:opacity-80 transition-opacity"
                  >
                    Browse Products
                  </button>
                </motion.div>
              ) : (
                <AnimatePresence initial={false}>
                  {items.map(item => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="flex gap-4 p-3 rounded-2xl bg-[rgb(var(--card))] border border-[rgb(var(--border))]"
                    >
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[rgb(var(--muted))]">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-medium leading-tight line-clamp-2">
                              {item.product.name}
                            </p>
                            {item.selectedSize && (
                              <p className="text-xs text-[rgb(var(--muted-foreground))] mt-0.5">
                                Size: {item.selectedSize}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="p-1 rounded-lg hover:bg-[rgb(var(--muted))] transition-colors text-[rgb(var(--muted-foreground))] hover:text-red-500 flex-shrink-0"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2 bg-[rgb(var(--muted))] rounded-full px-1 py-1">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[rgb(var(--border))] transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-sm font-medium w-5 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[rgb(var(--border))] transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <span className="text-sm font-medium">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-[rgb(var(--border))] px-6 py-5 space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-[rgb(var(--muted-foreground))]">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[rgb(var(--muted-foreground))]">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-[rgb(var(--accent))]">
                      Add {formatPrice(200 - subtotal)} more for free shipping
                    </p>
                  )}
                  <div className="flex justify-between font-medium text-base pt-2 border-t border-[rgb(var(--border))]">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Link
                    href="/checkout"
                    onClick={onClose}
                    className="block text-center py-3.5 bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] text-sm tracking-widest uppercase rounded-full hover:opacity-80 transition-opacity"
                  >
                    Checkout
                  </Link>
                  <Link
                    href="/cart"
                    onClick={onClose}
                    className="block text-center py-3.5 border border-[rgb(var(--border))] text-sm tracking-widest uppercase rounded-full hover:bg-[rgb(var(--muted))] transition-colors"
                  >
                    View Cart
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
