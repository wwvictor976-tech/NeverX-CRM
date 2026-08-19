import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Otimização de fontes sem carregamento de fontes externas dinâmicas (zero CLS)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NeverX CRM | Gestão e Relacionamento Inteligente",
    template: "%s | NeverX CRM",
  },
  description:
    "Aumente a retenção e impulsione as vendas da sua loja com a plataforma de CRM de alta densidade NeverX.",
  keywords: ["CRM", "Vendas", "Lojistas", "Gestão de Clientes", "Automação", "Pipeline"],
  authors: [{ name: "NeverX Team" }],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "NeverX CRM | Gestão e Relacionamento Inteligente",
    description: "Aumente a retenção e impulsione as vendas da sua loja com NeverX.",
    siteName: "NeverX CRM",
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0d9488", // Cor alinhada com a nova Primary Brand (Teal 600)
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
      className={`${inter.variable} ${jetbrainsMono.variable}`} 
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-teal-500/20 selection:text-foreground">
        {children}
      </body>
    </html>
  );
}