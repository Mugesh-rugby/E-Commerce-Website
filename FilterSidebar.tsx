"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X, SlidersHorizontal } from "lucide-react";
import { categories } from "@/lib/data";
import { cn, formatPrice } from "@/lib/utils";

interface FilterSidebarProps {
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onReset: () => void;
}

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="border-b border-[rgb(var(--border))] pb-5 mb-5 last:border-0 last:mb-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full mb-3 group"
      >
        <span className="text-xs font-medium tracking-widest uppercase text-[rgb(var(--muted-foreground))] group-hover:text-[rgb(var(--foreground))] transition-colors">
          {title}
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={14} className="text-[rgb(var(--muted-foreground))]" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FilterSidebar({
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  sortBy,
  onSortChange,
  onReset,
}: FilterSidebarProps) {
  const hasActiveFilters = selectedCategory !== "all" || priceRange[1] < 1000 || sortBy !== "featured";

  return (
    <aside className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={16} />
          <span className="text-sm font-medium tracking-wide">Filters</span>
          {hasActiveFilters && (
            <span className="px-1.5 py-0.5 text-[10px] bg-[rgb(var(--accent))] text-white rounded-full">
              active
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors"
          >
            <X size={12} />
            Reset
          </button>
        )}
      </div>

      {/* Sort */}
      <FilterSection title="Sort By">
        <div className="space-y-1">
          {sortOptions.map(opt => (
            <button
              key={opt.value}
              onClick={() => onSortChange(opt.value)}
              className={cn(
                "w-full text-left px-3 py-2 rounded-xl text-sm transition-all",
                sortBy === opt.value
                  ? "bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]"
                  : "hover:bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Category */}
      <FilterSection title="Category">
        <div className="space-y-1">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={cn(
                "w-full text-left px-3 py-2 rounded-xl text-sm transition-all flex items-center gap-2.5",
                selectedCategory === cat.id
                  ? "bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]"
                  : "hover:bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]"
              )}
            >
              <span className="text-base">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range">
        <div className="px-1">
          <div className="flex justify-between text-xs text-[rgb(var(--muted-foreground))] mb-3">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}{priceRange[1] >= 1000 ? "+" : ""}</span>
          </div>

          {/* Simple range inputs */}
          <div className="space-y-3">
            <div className="relative h-2 bg-[rgb(var(--muted))] rounded-full">
              <div
                className="absolute h-2 bg-[rgb(var(--accent))] rounded-full"
                style={{
                  left: `${(priceRange[0] / 1000) * 100}%`,
                  width: `${((priceRange[1] - priceRange[0]) / 1000) * 100}%`,
                }}
              />
            </div>

            <div className="flex gap-2">
              <div className="flex-1">
                <label className="text-xs text-[rgb(var(--muted-foreground))] mb-1 block">Min</label>
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={e => onPriceChange([Number(e.target.value), priceRange[1]])}
                  min={0}
                  max={priceRange[1]}
                  className="w-full px-2 py-1.5 text-xs bg-[rgb(var(--muted))] rounded-lg outline-none focus:ring-1 focus:ring-[rgb(var(--accent))]"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-[rgb(var(--muted-foreground))] mb-1 block">Max</label>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={e => onPriceChange([priceRange[0], Number(e.target.value)])}
                  min={priceRange[0]}
                  max={1000}
                  className="w-full px-2 py-1.5 text-xs bg-[rgb(var(--muted))] rounded-lg outline-none focus:ring-1 focus:ring-[rgb(var(--accent))]"
                />
              </div>
            </div>
          </div>

          {/* Quick price filters */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {[
              { label: "Under $200", range: [0, 200] as [number, number] },
              { label: "$200–$400", range: [200, 400] as [number, number] },
              { label: "$400+", range: [400, 1000] as [number, number] },
            ].map(btn => (
              <button
                key={btn.label}
                onClick={() => onPriceChange(btn.range)}
                className={cn(
                  "px-2.5 py-1 text-xs rounded-full border transition-all",
                  priceRange[0] === btn.range[0] && priceRange[1] === btn.range[1]
                    ? "bg-[rgb(var(--accent))] border-[rgb(var(--accent))] text-white"
                    : "border-[rgb(var(--border))] text-[rgb(var(--muted-foreground))] hover:border-[rgb(var(--foreground))]"
                )}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </FilterSection>
    </aside>
  );
}
