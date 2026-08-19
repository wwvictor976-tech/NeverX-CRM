"use client";

import { ShoppingBag, Smartphone, Store, TrendingUp } from "lucide-react";

// ============================================================================
// ÍCONES OFICIAIS DE MARKETPLACES (SVG Customizados)
// ============================================================================

/* Mercado Livre */
const MercadoLivreIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm1.6 13.8a2.4 2.4 0 0 1-3.2 0l-2.9-2.9a1 1 0 0 1 1.4-1.4l2.2 2.2 4.4-4.4a1 1 0 0 1 1.4 1.4z" />
  </svg>
);

/* Shopee / Shein SVG Custom */
const BagTagIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm0 10c-2.76 0-5-2.24-5-5h2c0 1.66 1.34 3 3 3s3-1.34 3-3h2c0 2.76-2.24 5-5 5z" />
  </svg>
);

// ============================================================================
// DADOS DOS CANAIS DE VENDA
// ============================================================================

interface SalesChannel {
  id: string;
  name: string;
  type: "Marketplace" | "Direto";
  revenue: string;
  orders: number;
  percentage: number;
  color: string;
  icon: React.ElementType;
}

const salesChannels: SalesChannel[] = [
  {
    id: "ml",
    name: "Mercado Livre",
    type: "Marketplace",
    revenue: "R$ 68.450,00",
    orders: 1240,
    percentage: 38,
    color: "#FFE600",
    icon: MercadoLivreIcon,
  },
  {
    id: "site",
    name: "E-commerce Próprio",
    type: "Direto",
    revenue: "R$ 48.600,00",
    orders: 890,
    percentage: 27,
    color: "#111111",
    icon: Store,
  },
  {
    id: "shopee",
    name: "Shopee",
    type: "Marketplace",
    revenue: "R$ 28.800,00",
    orders: 620,
    percentage: 16,
    color: "#EE4D2D",
    icon: BagTagIcon,
  },
  {
    id: "app",
    name: "Aplicativo Próprio",
    type: "Direto",
    revenue: "R$ 21.600,00",
    orders: 410,
    percentage: 12,
    color: "#3B82F6",
    icon: Smartphone,
  },
  {
    id: "shein",
    name: "Shein",
    type: "Marketplace",
    revenue: "R$ 12.600,00",
    orders: 280,
    percentage: 7,
    color: "#D4AF37",
    icon: ShoppingBag,
  },
];

export function SalesChannelsChart() {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-border-subtle bg-card p-5 shadow-card sm:p-6">
      {/* Topo do Card */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-foreground">
              Canais que mais vendem
            </h3>
            <span className="flex items-center gap-1 rounded-md bg-success/10 px-2 py-0.5 text-[11px] font-bold text-success">
              <TrendingUp className="h-3 w-3" />
              +24% no trimestre
            </span>
          </div>
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Faturamento e volume de pedidos por marketplace e loja
        </p>
      </div>

      {/* Lista com Barras de Progresso */}
      <div className="mt-6 flex flex-col gap-3.5">
        {salesChannels.map((channel) => {
          const Icon = channel.icon;
          const isDarkIcon = channel.color === "#FFE600"; // Ajuste de contraste para o texto do ícone no amarelo

          return (
            <div
              key={channel.id}
              className="group flex flex-col gap-2 rounded-xl border border-border-subtle bg-background/60 p-3 transition-all duration-150 hover:border-border hover:bg-muted/50"
            >
              {/* Linha Superior: Ícone, Nome, Pedidos e Valor */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-bold shadow-xs transition-transform group-hover:scale-105 ${
                      isDarkIcon ? "text-[#111111]" : "text-white"
                    }`}
                    style={{ backgroundColor: channel.color }}
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-xs font-bold text-foreground">
                        {channel.name}
                      </span>
                      <span className="rounded-md border border-border-subtle bg-card px-1.5 py-0.2 text-[9px] font-semibold text-muted-foreground">
                        {channel.type}
                      </span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">
                      {channel.orders.toLocaleString("pt-BR")} pedidos realizados
                    </span>
                  </div>
                </div>

                {/* Faturamento e Porcentagem */}
                <div className="flex flex-col items-end shrink-0">
                  <span className="text-xs font-extrabold text-foreground">
                    {channel.revenue}
                  </span>
                  <span className="text-[10px] font-bold text-muted-foreground">
                    {channel.percentage}% do total
                  </span>
                </div>
              </div>

              {/* Barra de Progresso Personalizada */}
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-border-subtle/60">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${channel.percentage}%`,
                    backgroundColor: channel.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}