import Image from "next/image";

interface SheinIconProps {
  className?: string;
}

/**
 * Logótipo SHEIN em SVG, com origem identificada como Shein.com.
 */
export function SheinIcon({ className }: SheinIconProps) {
  return (
    <Image
      src="/shein.svg"
      alt=""
      aria-hidden="true"
      width={106}
      height={22}
      className={`object-contain ${className ?? ""}`}
    />
  );
}
