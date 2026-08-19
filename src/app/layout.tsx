import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NeverX CRM | Relacionamentos que Geram Resultados",
    template: "%s | NeverX CRM",
  },
  description:
    "CRM para relacionamentos que constroem marcas. Conecte lojistas e clientes para transformar dados em vendas recorrentes.",
  keywords: [
    "NeverX",
    "CRM",
    "E-commerce",
    "Gestão de Clientes",
    "Automação de Vendas",
    "Retenção de Clientes",
  ],
  authors: [{ name: "NeverX Team" }],
  creator: "NeverX",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://neverx.com.br",
    title: "NeverX CRM | Relacionamentos que Geram Resultados",
    description:
      "CRM para relacionamentos que constroem marcas. Transforme dados em vendas recorrentes.",
    siteName: "NeverX",
  },
  twitter: {
    card: "summary_large_image",
    title: "NeverX CRM",
    description: "Relacionamentos que geram resultados.",
  },
};

export const viewport: Viewport = {
  themeColor: "#111111",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  );
}