"use client";

import { Mail, Globe } from "lucide-react";
import { SiInstagram, SiWhatsapp } from "react-icons/si";

interface Channel {
  name: string;
  percentage: number;
  value: string;
  color: string;
  icon: React.ElementType;
}

const channels: Channel[] = [
  {
    name: "WhatsApp",
    percentage: 52,
    value: "6.682 respostas",
    color: "#25D366",
    icon: SiWhatsapp,
  },
  {
    name: "E-mail",
    percentage: 23,
    value: "2.955 respostas",
    color: "#3B82F6",
    icon: Mail,
  },
  {
    name: "Instagram",
    percentage: 17,
    value: "2.184 respostas",
    color: "#E1306C",
    icon: SiInstagram,
  },
  {
    name: "Outros",
    percentage: 8,
    value: "1.029 respostas",
    color: "#D4AF37",
    icon: Globe,
  },
];

export function ChannelsChart() {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-border-subtle bg-card p-5 shadow-card sm:p-6">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-foreground">
            Canais com mais respostas
          </h3>
          <span className="text-[11px] font-semibold text-success">
            +18% este mês
          </span>
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Distribuição das interações de clientes por canal
        </p>
      </div>

      <div className="my-5 flex flex-col items-center justify-center gap-6 sm:flex-row xl:flex-col">
        {/* Gráfico Donut SVG */}
        <div className="relative flex h-44 w-44 shrink-0 items-center justify-center">
          <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
            {channels.map((channel, index) => {
              const strokeDasharray = `${channel.percentage} ${100 - channel.percentage}`;
              const cumulativePercent = channels
                .slice(0, index)
                .reduce((total, currentChannel) => total + currentChannel.percentage, 0);
              const strokeDashoffset = -cumulativePercent;

              return (
                <circle
                  key={channel.name}
                  cx="18"
                  cy="18"
                  r="15.91549430918954"
                  fill="transparent"
                  stroke={channel.color}
                  strokeWidth="3.6"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                />
              );
            })}
          </svg>

          {/* Valor no Centro da Rosca */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-xs font-extrabold text-foreground">
              12.850
            </span>
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Respostas
            </span>
          </div>
        </div>

        {/* Legenda com Ícones e Respostas Detalhadas */}
        <div className="flex w-full flex-col gap-2">
          {channels.map((channel) => {
            const Icon = channel.icon;
            return (
              <div
                key={channel.name}
                className="flex items-center justify-between rounded-xl border border-border-subtle bg-background/60 p-2.5 transition-all duration-150 hover:border-border hover:bg-muted/50"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-white shrink-0 shadow-xs"
                    style={{ backgroundColor: channel.color }}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-foreground leading-tight">
                      {channel.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {channel.value}
                    </span>
                  </div>
                </div>

                <span className="text-xs font-bold text-foreground bg-card px-2 py-1 rounded-md border border-border-subtle">
                  {channel.percentage}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}