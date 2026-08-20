"use client";

import { Smartphone, TrendingUp } from "lucide-react";
import { PlatformLogo, type PlatformLogoKey } from "@/components/platform-logo";

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
  icon?: React.ElementType;
  logo?: PlatformLogoKey;
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
    logo: "mercadolivre",
  },
  {
    id: "site",
    name: "Nuvemshop",
    type: "Direto",
    revenue: "R$ 48.600,00",
    orders: 890,
    percentage: 27,
    color: "#111111",
    logo: "nuvemshop",
  },
  {
    id: "shopee",
    name: "Shopee",
    type: "Marketplace",
    revenue: "R$ 28.800,00",
    orders: 620,
    percentage: 16,
    color: "#EE4D2D",
    logo: "shopee",
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
    name: "SHEIN",
    type: "Marketplace",
    revenue: "R$ 12.600,00",
    orders: 280,
    percentage: 7,
    color: "#D4AF37",
    logo: "shein",
  },
];

export function SalesChannelsChart() {
  return (
    <div className="card-surface flex flex-col justify-between p-5 sm:p-6">
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

          return (
            <div
              key={channel.id}
              className="group flex flex-col gap-2 rounded-xl border border-border-subtle bg-background/60 p-3 transition-all duration-150 hover:border-border hover:bg-muted/50"
            >
              {/* Linha Superior: Ícone, Nome, Pedidos e Valor */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border-subtle bg-card shadow-sm transition-transform group-hover:scale-105">{channel.logo ? <PlatformLogo platform={channel.logo} size="xs" framed={false} /> : Icon ? <Icon className="h-4 w-4 text-muted-foreground" /> : null}</div>

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