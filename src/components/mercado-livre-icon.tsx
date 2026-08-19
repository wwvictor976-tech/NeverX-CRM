import Image from "next/image";

interface MercadoLivreIconProps {
  className?: string;
}

/**
 * Símbolo oficial do Mercado Livre, mantido como ativo SVG local para
 * preservar as cores e a proporção da marca em todos os pontos da aplicação.
 */
export function MercadoLivreIcon({ className }: MercadoLivreIconProps) {
  return (
    <Image
      src="/mercado-livre.svg"
      alt=""
      aria-hidden="true"
      width={150}
      height={104}
      className={`object-contain ${className ?? ""}`}
    />
  );
}
