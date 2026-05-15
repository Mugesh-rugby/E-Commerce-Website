"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

interface SearchBarProps {
  open: boolean;
  onClose: () => void;
}

export function SearchBar({ open, onClose }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const results = query.length > 1
    ? products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 5)
    : [];

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-50 bg-[rgb(var(--background))] border-b border-[rgb(var(--border))] shadow-luxury-lg"
          >
            {/* Search input */}
            <div className="max-w-2xl mx-auto px-4 py-4">
              <div className="flex items-center gap-3 px-4 py-3 bg-[rgb(var(--muted))] rounded-2xl">
                <Search size={20} className="text-[rgb(var(--muted-foreground))] flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search products, categories..."
                  className="flex-1 bg-transparent text-base outline-none text-[rgb(var(--foreground))] placeholder:text-[rgb(var(--muted-foreground))]"
                  style={{ fontFamily: "var(--font-body)" }}
                />
                {query && (
                  <button onClick={() => setQuery("")}>
                    <X size={16} className="text-[rgb(var(--muted-foreground))]" />
                  </button>
                )}
                <button onClick={onClose} className="text-sm text-[rgb(var(--muted-foreground))]">
                  Esc
                </button>
              </div>
            </div>

            {/* Results */}
            <AnimatePresence>
              {results.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="max-w-2xl mx-auto px-4 pb-4 space-y-1"
                >
                  {results.map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={`/products/${product.id}`}
                        onClick={onClose}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-[rgb(var(--muted))] transition-colors group"
                      >
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-[rgb(var(--muted))]">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{product.name}</p>
                          <p className="text-xs text-[rgb(var(--muted-foreground))] capitalize">
                            {product.category}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{formatPrice(product.price)}</span>
                          <ArrowRight
                            size={14}
                            className="text-[rgb(var(--muted-foreground))] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all"
                          />
                        </div>
                      </Link>
                    </motion.div>
                  ))}

                  <Link
                    href={`/products?search=${query}`}
                    onClick={onClose}
                    className="flex items-center justify-center gap-2 p-3 text-sm text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors"
                  >
                    See all results for "{query}"
                    <ArrowRight size={14} />
                  </Link>
                </motion.div>
              )}

              {query.length > 1 && results.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="max-w-2xl mx-auto px-4 pb-6 text-center"
                >
                  <p className="text-sm text-[rgb(var(--muted-foreground))]">
                    No results for "{query}"
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Popular searches */}
            {!query && (
              <div className="max-w-2xl mx-auto px-4 pb-4">
                <p className="text-xs font-medium tracking-widest uppercase text-[rgb(var(--muted-foreground))] mb-3">
                  Popular
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Headphones", "Running Shoes", "Merino", "Wallet", "Desk Lamp"].map(term => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 text-xs bg-[rgb(var(--muted))] rounded-full hover:bg-[rgb(var(--border))] transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
