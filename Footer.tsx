"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Twitter, Youtube } from "lucide-react";

const footerLinks = {
  Shop: [
    { label: "All Products", href: "/products" },
    { label: "New Arrivals", href: "/products?filter=new" },
    { label: "Electronics", href: "/products?category=electronics" },
    { label: "Apparel", href: "/products?category=apparel" },
  ],
  Support: [
    { label: "FAQ", href: "#" },
    { label: "Shipping Policy", href: "#" },
    { label: "Returns", href: "#" },
    { label: "Contact Us", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Sustainability", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-[rgb(var(--border))] bg-[rgb(var(--background))] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-5 h-5 bg-[rgb(var(--accent))] rotate-45 rounded-sm" />
              <span
                className="text-lg tracking-[0.2em] uppercase font-light"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                LUXE
              </span>
            </Link>
            <p className="text-sm text-[rgb(var(--muted-foreground))] leading-relaxed max-w-xs">
              Curated selection of premium products for those who value craft, quality, and understated elegance.
            </p>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-xs font-medium tracking-widest uppercase text-[rgb(var(--muted-foreground))] mb-3">
                Stay in the loop
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2.5 text-sm bg-[rgb(var(--muted))] rounded-full outline-none focus:ring-1 focus:ring-[rgb(var(--accent))] placeholder:text-[rgb(var(--muted-foreground))]"
                />
                <button className="px-4 py-2.5 bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] text-xs tracking-widest uppercase rounded-full hover:opacity-80 transition-opacity whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <p className="text-xs font-medium tracking-widest uppercase text-[rgb(var(--muted-foreground))] mb-4">
                {section}
              </p>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[rgb(var(--border))] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[rgb(var(--muted-foreground))]">
            © {new Date().getFullYear()} LUXE. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            {[
              { Icon: Instagram, href: "#" },
              { Icon: Twitter, href: "#" },
              { Icon: Youtube, href: "#" },
            ].map(({ Icon, href }, i) => (
              <motion.a
                key={i}
                href={href}
                whileHover={{ y: -2 }}
                className="p-2 rounded-full hover:bg-[rgb(var(--muted))] transition-colors text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))]"
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
