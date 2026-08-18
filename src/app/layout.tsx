import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import { ToastProvider } from "@/lib/toast-context";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Los XVIII de Monnick",
  description: "Estás invitad@ a la fiesta de 18 años de Monnick. Sábado 19 de septiembre, 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${syne.variable} ${jakarta.variable}`}>
      <body className="font-[family-name:var(--font-jakarta)] antialiased">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
