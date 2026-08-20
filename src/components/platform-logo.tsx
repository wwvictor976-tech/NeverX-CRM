import Image, { type ImageProps } from "next/image";

export type PlatformLogoKey = "whatsapp" | "mercadolivre" | "nuvemshop" | "shopee" | "shein" | "shopify" | "instagram";

const logoSources: Record<PlatformLogoKey, string> = {
  whatsapp: "/brands/whatsapp.svg",
  mercadolivre: "/mercado-livre.svg",
  nuvemshop: "/brands/nuvemshop.png",
  shopee: "/brands/shopee.svg",
  shein: "/shein.svg",
  shopify: "/brands/shopify.svg",
  instagram: "/brands/instagram.svg",
};

const logoLabels: Record<PlatformLogoKey, string> = {
  whatsapp: "WhatsApp",
  mercadolivre: "Mercado Livre",
  nuvemshop: "Nuvemshop",
  shopee: "Shopee",
  shein: "SHEIN",
  shopify: "Shopify",
  instagram: "Instagram",
};

const frameClasses = {
  xs: "h-5 w-5 rounded-md p-1",
  sm: "h-7 w-7 rounded-lg p-1.5",
  md: "h-9 w-9 rounded-xl p-2",
  lg: "h-11 w-11 rounded-xl p-2.5",
} as const;

const imageClasses = { xs: "h-4 w-4", sm: "h-5 w-5", md: "h-6 w-6", lg: "h-7 w-7" } as const;

export function PlatformLogo({ platform, size = "md", framed = true, className = "", ...props }: { platform: PlatformLogoKey; size?: keyof typeof frameClasses; framed?: boolean; className?: string } & Omit<ImageProps, "src" | "alt" | "width" | "height">) {
  const image = <Image src={logoSources[platform]} alt={`${logoLabels[platform]} logo`} width={44} height={44} className={`${framed ? "h-full w-full" : imageClasses[size]} object-contain ${className}`} {...props} />;
  if (!framed) return image;
  return <span className={`inline-flex shrink-0 items-center justify-center border border-border-subtle bg-card shadow-sm ${frameClasses[size]}`} aria-label={logoLabels[platform]}>{image}</span>;
}

export function platformLogoLabel(platform: PlatformLogoKey) {
  return logoLabels[platform];
}
