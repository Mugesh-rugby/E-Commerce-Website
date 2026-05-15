"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Product } from "@/lib/data";
import { useCartStore, useWishlistStore } from "@/lib/store";
import { formatPrice, cn } from "@/lib/utils";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  const { addItem: addToCart } = useCartStore();
  const { toggle: toggleWishlist, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;

    setIsAdding(true);
    addToCart(product);
    toast.success(`Added to cart`, {
      description: product.name,
    });
    setTimeout(() => setIsAdding(false), 600);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    if (!wishlisted) {
      toast.success("Added to wishlist");
    }
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/products/${product.id}`} className="group block">
        <div className="relative">
          {/* Image container */}
          <div
            className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[rgb(var(--muted))]"
            onMouseEnter={() => product.images[1] && setImageIndex(1)}
            onMouseLeave={() => setImageIndex(0)}
          >
            <Image
              src={product.images[imageIndex] || product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.isNew && (
                <span className="px-2.5 py-1 text-[10px] font-medium tracking-widest uppercase bg-[rgb(var(--accent))] text-white rounded-full">
                  New
                </span>
              )}
              {discount && (
                <span className="px-2.5 py-1 text-[10px] font-medium tracking-widest uppercase bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] rounded-full">
                  −{discount}%
                </span>
              )}
              {!product.inStock && (
                <span className="px-2.5 py-1 text-[10px] font-medium tracking-widest uppercase bg-red-500 text-white rounded-full">
                  Sold Out
                </span>
              )}
            </div>

            {/* Wishlist button */}
            <button
              onClick={handleWishlist}
              className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
            >
              <Heart
                size={14}
                className={cn(
                  "transition-colors",
                  wishlisted ? "fill-red-500 text-red-500" : "text-stone-700"
                )}
              />
            </button>

            {/* Add to cart */}
            <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock || isAdding}
                className={cn(
                  "w-full py-2.5 rounded-xl text-xs font-medium tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-200",
                  product.inStock
                    ? "bg-white/95 backdrop-blur-sm text-stone-900 hover:bg-white shadow-sm"
                    : "bg-white/50 text-stone-400 cursor-not-allowed"
                )}
              >
                <motion.div
                  animate={isAdding ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <ShoppingBag size={12} />
                </motion.div>
                {product.inStock ? (isAdding ? "Adding..." : "Add to Cart") : "Sold Out"}
              </button>
            </div>

            {/* Image dots */}
            {product.images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {product.images.slice(0, 3).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-1 h-1 rounded-full transition-all",
                      imageIndex === i ? "bg-white w-3" : "bg-white/60"
                    )}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="mt-3 space-y-1">
            <div className="flex items-center gap-1">
              <div className="flex items-center gap-0.5">
                <Star size={11} className="fill-[rgb(var(--accent))] text-[rgb(var(--accent))]" />
                <span className="text-xs text-[rgb(var(--muted-foreground))]">
                  {product.rating} ({product.reviewCount})
                </span>
              </div>
              <span className="text-xs text-[rgb(var(--muted-foreground))] capitalize">
                · {product.category}
              </span>
            </div>

            <h3 className="text-sm font-medium leading-snug group-hover:text-[rgb(var(--accent))] transition-colors line-clamp-2">
              {product.name}
            </h3>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xs text-[rgb(var(--muted-foreground))] line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Color dots */}
            {product.colors && product.colors.length > 0 && (
              <div className="flex items-center gap-1 pt-1">
                {product.colors.slice(0, 4).map((color, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full border border-[rgb(var(--border))] flex-shrink-0"
                    style={{ backgroundColor: color }}
                  />
                ))}
                {product.colors.length > 4 && (
                  <span className="text-[10px] text-[rgb(var(--muted-foreground))]">
                    +{product.colors.length - 4}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// Skeleton loader
export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[4/5] rounded-2xl shimmer" />
      <div className="mt-3 space-y-2">
        <div className="h-3 w-24 rounded shimmer" />
        <div className="h-4 w-3/4 rounded shimmer" />
        <div className="h-4 w-16 rounded shimmer" />
      </div>
    </div>
  );
}
