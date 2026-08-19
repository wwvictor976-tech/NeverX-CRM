"use client";

import { Mail, Globe } from "lucide-react";

/* Ícone Oficial do WhatsApp */
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.286-.143-1.689-.833-1.951-.928-.262-.095-.453-.143-.644.143-.191.286-.739.928-.906 1.119-.167.191-.334.215-.62.072-.286-.143-1.208-.445-2.301-1.42-.85-.758-1.424-1.693-1.591-1.979-.167-.286-.018-.441.126-.583.129-.128.286-.334.429-.501.143-.167.191-.286.286-.477.095-.191.048-.358-.024-.501-.072-.143-.644-1.551-.882-2.122-.232-.557-.468-.481-.644-.49-.167-.008-.358-.01-.549-.01-.191 0-.501.072-.763.358-.262.286-1.002.978-1.002 2.385 0 1.407 1.026 2.766 1.169 2.957.143.191 2.019 3.084 4.891 4.324.684.295 1.218.471 1.634.603.687.218 1.312.187 1.807.113.553-.083 1.689-.691 1.927-1.359.238-.668.238-1.24.167-1.359-.071-.119-.262-.191-.548-.334z" />
  </svg>
);

/* Ícone Oficial do Instagram */
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

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
    icon: WhatsAppIcon,
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
    icon: InstagramIcon,
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