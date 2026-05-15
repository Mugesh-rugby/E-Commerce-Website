"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Check, CreditCard, Smartphone, Building, MapPin, User, Mail, Phone, Lock, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { formatPrice, cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const steps = ["Shipping", "Payment", "Review"];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300",
              i < current
                ? "bg-[rgb(var(--accent))] text-white"
                : i === current
                  ? "bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]"
                  : "bg-[rgb(var(--muted))] text-[rgb(var(--muted-foreground))]"
            )}>
              {i < current ? <Check size={14} /> : i + 1}
            </div>
            <span className={cn(
              "text-xs mt-1.5 whitespace-nowrap",
              i === current ? "text-[rgb(var(--foreground))] font-medium" : "text-[rgb(var(--muted-foreground))]"
            )}>
              {step}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={cn(
              "w-16 sm:w-24 h-px mx-2 mb-5 transition-all duration-500",
              i < current ? "bg-[rgb(var(--accent))]" : "bg-[rgb(var(--border))]"
            )} />
          )}
        </div>
      ))}
    </div>
  );
}

function InputField({
  label, type = "text", placeholder, icon: Icon, value, onChange
}: {
  label: string;
  type?: string;
  placeholder: string;
  icon?: React.ElementType;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-xs font-medium tracking-widest uppercase text-[rgb(var(--muted-foreground))] block mb-1.5">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[rgb(var(--muted-foreground))]" />
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          className={cn(
            "w-full py-3 text-sm bg-[rgb(var(--muted))] rounded-xl outline-none border border-transparent focus:border-[rgb(var(--accent))] transition-colors placeholder:text-[rgb(var(--muted-foreground))]",
            Icon ? "pl-9 pr-4" : "px-4"
          )}
        />
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const [step, setStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isPlacing, setIsPlacing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = getSubtotal();
  const shipping = subtotal > 200 ? 0 : 15;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;

  // Form state
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "", zip: "", country: "United States",
    cardNumber: "", cardName: "", expiry: "", cvv: "",
  });

  const set = (key: keyof typeof form) => (val: string) => setForm(f => ({ ...f, [key]: val }));

  const handlePlaceOrder = async () => {
    setIsPlacing(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsPlacing(false);
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="pt-16 lg:pt-20 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center px-4 max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-950 flex items-center justify-center mx-auto mb-6"
          >
            <Check size={36} className="text-green-600" />
          </motion.div>
          <h1 className="text-4xl font-display font-light mb-3">Order Placed!</h1>
          <p className="text-[rgb(var(--muted-foreground))] mb-2">
            Thank you for your purchase. Your order has been confirmed.
          </p>
          <p className="text-xs text-[rgb(var(--muted-foreground))] mb-8">
            Order #{Math.random().toString(36).slice(2, 10).toUpperCase()} · A confirmation will be sent to your email.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/products"
              className="px-8 py-3.5 bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] rounded-full text-sm font-medium tracking-widest uppercase hover:opacity-80 transition-opacity"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="px-8 py-3.5 border border-[rgb(var(--border))] rounded-full text-sm font-medium tracking-widest uppercase hover:bg-[rgb(var(--muted))] transition-colors"
            >
              Back Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="pt-16 lg:pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-[rgb(var(--muted-foreground))] mb-4">Your cart is empty.</p>
          <Link href="/products" className="text-sm text-[rgb(var(--accent))] underline">
            Browse products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 lg:pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link href="/cart" className="flex items-center gap-1.5 text-xs text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors mb-4">
            <ArrowLeft size={12} />
            Back to cart
          </Link>
          <p className="text-xs text-[rgb(var(--accent))] tracking-widest uppercase mb-2">Secure Checkout</p>
          <h1 className="text-4xl sm:text-5xl font-display font-light">Checkout</h1>
        </motion.div>

        <StepIndicator current={step} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Steps */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 0: Shipping */}
              {step === 0 && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-display font-light flex items-center gap-2">
                    <MapPin size={18} className="text-[rgb(var(--accent))]" />
                    Shipping Information
                  </h2>

                  <div className="p-6 rounded-2xl bg-[rgb(var(--card))] border border-[rgb(var(--border))] space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InputField label="First Name" placeholder="John" icon={User} value={form.firstName} onChange={set("firstName")} />
                      <InputField label="Last Name" placeholder="Doe" value={form.lastName} onChange={set("lastName")} />
                    </div>
                    <InputField label="Email" type="email" placeholder="john@example.com" icon={Mail} value={form.email} onChange={set("email")} />
                    <InputField label="Phone" type="tel" placeholder="+1 (555) 000-0000" icon={Phone} value={form.phone} onChange={set("phone")} />
                    <InputField label="Street Address" placeholder="123 Main Street" value={form.address} onChange={set("address")} />
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <InputField label="City" placeholder="New York" value={form.city} onChange={set("city")} />
                      <InputField label="State" placeholder="NY" value={form.state} onChange={set("state")} />
                      <InputField label="ZIP Code" placeholder="10001" value={form.zip} onChange={set("zip")} />
                    </div>
                  </div>

                  {/* Shipping method */}
                  <h3 className="text-base font-medium">Shipping Method</h3>
                  <div className="space-y-3">
                    {[
                      { id: "standard", label: "Standard Shipping", sub: "5–7 business days", price: subtotal > 200 ? "Free" : "$15" },
                      { id: "express", label: "Express Shipping", sub: "2–3 business days", price: "$25" },
                      { id: "overnight", label: "Overnight Shipping", sub: "Next business day", price: "$45" },
                    ].map(opt => (
                      <label key={opt.id} className="flex items-center justify-between p-4 rounded-2xl border border-[rgb(var(--border))] cursor-pointer hover:bg-[rgb(var(--muted))] transition-colors">
                        <div className="flex items-center gap-3">
                          <input type="radio" name="shipping" defaultChecked={opt.id === "standard"} className="accent-[rgb(var(--accent))]" />
                          <div>
                            <p className="text-sm font-medium">{opt.label}</p>
                            <p className="text-xs text-[rgb(var(--muted-foreground))]">{opt.sub}</p>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-[rgb(var(--accent))]">{opt.price}</span>
                      </label>
                    ))}
                  </div>

                  <button
                    onClick={() => setStep(1)}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] rounded-full text-sm font-medium tracking-widest uppercase hover:opacity-80 transition-opacity"
                  >
                    Continue to Payment
                    <ChevronRight size={16} />
                  </button>
                </motion.div>
              )}

              {/* Step 1: Payment */}
              {step === 1 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-display font-light flex items-center gap-2">
                    <CreditCard size={18} className="text-[rgb(var(--accent))]" />
                    Payment Method
                  </h2>

                  {/* Payment method selector */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: "card", icon: CreditCard, label: "Card" },
                      { id: "apple", icon: Smartphone, label: "Apple Pay" },
                      { id: "bank", icon: Building, label: "Bank" },
                    ].map(({ id, icon: Icon, label }) => (
                      <button
                        key={id}
                        onClick={() => setPaymentMethod(id)}
                        className={cn(
                          "flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all",
                          paymentMethod === id
                            ? "border-[rgb(var(--accent))] bg-[rgb(var(--accent))]/5"
                            : "border-[rgb(var(--border))] hover:bg-[rgb(var(--muted))]"
                        )}
                      >
                        <Icon size={20} className={paymentMethod === id ? "text-[rgb(var(--accent))]" : "text-[rgb(var(--muted-foreground))]"} />
                        <span className="text-xs font-medium">{label}</span>
                      </button>
                    ))}
                  </div>

                  {paymentMethod === "card" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-6 rounded-2xl bg-[rgb(var(--card))] border border-[rgb(var(--border))] space-y-4"
                    >
                      <InputField label="Card Number" placeholder="1234 5678 9012 3456" icon={CreditCard} value={form.cardNumber} onChange={set("cardNumber")} />
                      <InputField label="Cardholder Name" placeholder="John Doe" value={form.cardName} onChange={set("cardName")} />
                      <div className="grid grid-cols-2 gap-4">
                        <InputField label="Expiry Date" placeholder="MM / YY" value={form.expiry} onChange={set("expiry")} />
                        <InputField label="CVV" type="password" placeholder="•••" icon={Lock} value={form.cvv} onChange={set("cvv")} />
                      </div>
                      <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/30 rounded-xl">
                        <Lock size={13} className="text-green-600" />
                        <span className="text-xs text-green-600">Your payment info is encrypted and secure</span>
                      </div>
                    </motion.div>
                  )}

                  {paymentMethod === "apple" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-8 rounded-2xl bg-[rgb(var(--card))] border border-[rgb(var(--border))] text-center"
                    >
                      <Smartphone size={40} className="mx-auto mb-3 text-[rgb(var(--muted-foreground))]" />
                      <p className="font-medium mb-1">Apple Pay</p>
                      <p className="text-sm text-[rgb(var(--muted-foreground))]">
                        Complete your purchase using Apple Pay on this device.
                      </p>
                    </motion.div>
                  )}

                  {paymentMethod === "bank" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-8 rounded-2xl bg-[rgb(var(--card))] border border-[rgb(var(--border))] text-center"
                    >
                      <Building size={40} className="mx-auto mb-3 text-[rgb(var(--muted-foreground))]" />
                      <p className="font-medium mb-1">Bank Transfer</p>
                      <p className="text-sm text-[rgb(var(--muted-foreground))]">
                        You'll receive bank details after placing the order.
                      </p>
                    </motion.div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(0)}
                      className="flex-1 py-4 border border-[rgb(var(--border))] rounded-full text-sm font-medium tracking-widest uppercase hover:bg-[rgb(var(--muted))] transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(2)}
                      className="flex-1 flex items-center justify-center gap-2 py-4 bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] rounded-full text-sm font-medium tracking-widest uppercase hover:opacity-80 transition-opacity"
                    >
                      Review Order
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Review */}
              {step === 2 && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-display font-light">Review Your Order</h2>

                  {/* Shipping summary */}
                  <div className="p-5 rounded-2xl bg-[rgb(var(--card))] border border-[rgb(var(--border))]">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-medium flex items-center gap-1.5">
                        <MapPin size={14} className="text-[rgb(var(--accent))]" />
                        Shipping to
                      </p>
                      <button onClick={() => setStep(0)} className="text-xs text-[rgb(var(--accent))]">Edit</button>
                    </div>
                    <p className="text-sm text-[rgb(var(--muted-foreground))]">
                      {form.firstName || "John"} {form.lastName || "Doe"} · {form.address || "123 Main St"}, {form.city || "New York"} {form.zip || "10001"}
                    </p>
                  </div>

                  {/* Payment summary */}
                  <div className="p-5 rounded-2xl bg-[rgb(var(--card))] border border-[rgb(var(--border))]">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-medium flex items-center gap-1.5">
                        <CreditCard size={14} className="text-[rgb(var(--accent))]" />
                        Payment
                      </p>
                      <button onClick={() => setStep(1)} className="text-xs text-[rgb(var(--accent))]">Edit</button>
                    </div>
                    <p className="text-sm text-[rgb(var(--muted-foreground))] capitalize">
                      {paymentMethod === "card"
                        ? `Card ending in ${form.cardNumber.slice(-4) || "3456"}`
                        : paymentMethod === "apple" ? "Apple Pay" : "Bank Transfer"
                      }
                    </p>
                  </div>

                  {/* Items */}
                  <div className="p-5 rounded-2xl bg-[rgb(var(--card))] border border-[rgb(var(--border))] space-y-4">
                    <p className="text-sm font-medium">Order Items ({items.length})</p>
                    {items.map(item => (
                      <div key={item.product.id} className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-[rgb(var(--muted))]">
                          <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" sizes="48px" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.product.name}</p>
                          <p className="text-xs text-[rgb(var(--muted-foreground))]">Qty: {item.quantity}</p>
                        </div>
                        <span className="text-sm font-medium">{formatPrice(item.product.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 py-4 border border-[rgb(var(--border))] rounded-full text-sm font-medium tracking-widest uppercase hover:bg-[rgb(var(--muted))] transition-colors"
                    >
                      Back
                    </button>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={handlePlaceOrder}
                      disabled={isPlacing}
                      className="flex-1 flex items-center justify-center gap-2 py-4 bg-[rgb(var(--accent))] text-white rounded-full text-sm font-medium tracking-widest uppercase hover:opacity-90 transition-opacity disabled:opacity-70"
                    >
                      {isPlacing ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                      ) : (
                        <>
                          <Lock size={14} />
                          Place Order · {formatPrice(total)}
                        </>
                      )}
                    </motion.button>
                  </div>

                  <p className="text-xs text-center text-[rgb(var(--muted-foreground))]">
                    By placing your order, you agree to our{" "}
                    <span className="underline cursor-pointer">Terms of Service</span> and{" "}
                    <span className="underline cursor-pointer">Privacy Policy</span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Order summary */}
          <div className="lg:col-span-1 order-first lg:order-last">
            <div className="sticky top-24 p-6 rounded-3xl bg-[rgb(var(--card))] border border-[rgb(var(--border))]">
              <h2 className="text-base font-medium mb-5">Order Summary</h2>

              <div className="space-y-3 mb-5 max-h-56 overflow-y-auto scrollbar-hide">
                {items.map(item => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-[rgb(var(--muted))]">
                      <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" sizes="48px" />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-[rgb(var(--muted-foreground))] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{item.product.name}</p>
                    </div>
                    <span className="text-xs font-medium">{formatPrice(item.product.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[rgb(var(--border))] pt-4 space-y-2.5 text-sm">
                <div className="flex justify-between text-[rgb(var(--muted-foreground))]">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[rgb(var(--muted-foreground))]">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-[rgb(var(--muted-foreground))]">
                  <span>Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between font-semibold text-base pt-2 border-t border-[rgb(var(--border))]">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
