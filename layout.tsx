import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "sonner";
import { ClientWrapper } from "./ClientWrapper";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>LUXE — Premium Commerce</title>
        <meta name="description" content="Curated selection of premium products for the discerning individual." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <div className="min-h-screen flex flex-col bg-[rgb(var(--background))]">
          <Navbar />
          <ClientWrapper>{children}</ClientWrapper>
          <Footer />
        </div>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "rgb(var(--card))",
              border: "1px solid rgb(var(--border))",
              color: "rgb(var(--foreground))",
              fontFamily: "var(--font-body)",
              fontSize: "14px",
            },
          }}
        />
      </body>
    </html>
  );
}
