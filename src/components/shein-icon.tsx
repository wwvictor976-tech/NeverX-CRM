import Image from "next/image";

interface SHEINIconProps {
  className?: string;
}

/**
 * Logótipo SHEIN em SVG, com origem identificada como SHEIN.com.
 */
export function SHEINIcon({ className }: SHEINIconProps) {
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
