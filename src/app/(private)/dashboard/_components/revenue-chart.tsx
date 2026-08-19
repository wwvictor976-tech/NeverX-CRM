"use client";

import { useState } from "react";
import { Calendar, TrendingUp, Check, X } from "lucide-react";

type Period = "7d" | "30d" | "90d" | "custom";

interface Point {
  id: string;
  label: string;
  value: string;
  x: number; // Porcentagem de 0 a 100 no Eixo X
  y: number; // Porcentagem de 0 a 100 no Eixo Y (0 = topo, 100 = base)
}

interface PeriodData {
  title: string;
  subtitle: string;
  totalRevenue: string;
  growth: string;
  points: Point[];
  xLabels: string[];
}

// Algoritmo Catmull-Rom para curva Bezier suave no espaço 0..100
function getBezierPath(points: Point[]): string {
  if (!points || points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  let d = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = i === 0 ? points[0] : points[i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = i + 2 < points.length ? points[i + 2] : p2;

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;

    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x} ${p2.y}`;
  }

  return d;
}

const chartData: Record<Exclude<Period, "custom">, PeriodData> = {
  "7d": {
    title: "Últimos 7 dias",
    subtitle: "25/05 a 31/05",
    totalRevenue: "R$ 34.210,00",
    growth: "+15,4%",
    xLabels: ["25 Mai", "26 Mai", "27 Mai", "28 Mai", "29 Mai", "30 Mai", "31 Mai"],
    points: [
      { id: "p0", label: "25 Mai", value: "R$ 3.800,00", x: 0, y: 75 },
      { id: "p1", label: "26 Mai", value: "R$ 4.500,00", x: 16.6, y: 68 },
      { id: "p2", label: "27 Mai", value: "R$ 6.200,00", x: 33.3, y: 50 },
      { id: "p3", label: "28 Mai", value: "R$ 4.800,00", x: 50, y: 58 },
      { id: "p4", label: "29 Mai", value: "R$ 7.100,00", x: 66.6, y: 38 },
      { id: "p5", label: "30 Mai", value: "R$ 8.200,00", x: 83.3, y: 25 },
      { id: "p6", label: "31 Mai", value: "R$ 8.900,00", x: 100, y: 18 },
    ],
  },
  "30d": {
    title: "Últimos 30 dias",
    subtitle: "01/05 a 31/05",
    totalRevenue: "R$ 128.560,00",
    growth: "+12,5%",
    xLabels: ["01 Mai", "08 Mai", "15 Mai", "22 Mai", "29 Mai", "31 Mai"],
    points: [
      { id: "p0", label: "01 Mai", value: "R$ 18.200,00", x: 0, y: 78 },
      { id: "p1", label: "08 Mai", value: "R$ 28.400,00", x: 20, y: 55 },
      { id: "p2", label: "15 Mai", value: "R$ 31.200,00", x: 40, y: 48 },
      { id: "p3", label: "22 Mai", value: "R$ 42.100,00", x: 60, y: 28 },
      { id: "p4", label: "29 Mai", value: "R$ 35.800,00", x: 80, y: 36 },
      { id: "p5", label: "31 Mai", value: "R$ 26.860,00", x: 100, y: 20 },
    ],
  },
  "90d": {
    title: "Últimos 90 dias",
    subtitle: "Março a Maio",
    totalRevenue: "R$ 362.800,00",
    growth: "+22,1%",
    xLabels: ["01 Mar", "31 Mar", "30 Abr", "31 Mai"],
    points: [
      { id: "p0", label: "01 Mar", value: "R$ 78.000,00", x: 0, y: 80 },
      { id: "p1", label: "31 Mar", value: "R$ 98.000,00", x: 33.3, y: 52 },
      { id: "p2", label: "30 Abr", value: "R$ 124.000,00", x: 66.6, y: 30 },
      { id: "p3", label: "31 Mai", value: "R$ 140.800,00", x: 100, y: 18 },
    ],
  },
};

export function RevenueChart() {
  const [period, setPeriod] = useState<Period>("7d");
  const [showPicker, setShowPicker] = useState(false);
  const [startDate, setStartDate] = useState("2025-05-10");
  const [endDate, setEndDate] = useState("2025-05-25");
  const [hoveredPointId, setHoveredPointId] = useState<string | null>(null);

  const current: PeriodData =
    period === "custom"
      ? {
          title: "Período Personalizado",
          subtitle: `${startDate.split("-").reverse().join("/")} a ${endDate.split("-").reverse().join("/")}`,
          totalRevenue: "R$ 68.450,00",
          growth: "+9,8%",
          xLabels: [
            startDate.split("-").slice(1).reverse().join("/"),
            "Meio do Período",
            endDate.split("-").slice(1).reverse().join("/"),
          ],
          points: [
            { id: "cp0", label: "Início", value: "R$ 18.200,00", x: 0, y: 75 },
            { id: "cp1", label: "Pico", value: "R$ 28.150,00", x: 50, y: 35 },
            { id: "cp2", label: "Final", value: "R$ 22.100,00", x: 100, y: 20 },
          ],
        }
      : chartData[period];

  const pathD = getBezierPath(current.points);
  const gradientD = `${pathD} L 100 100 L 0 100 Z`;

  return (
    <div className="relative flex flex-col justify-between rounded-2xl border border-border-subtle bg-card p-5 shadow-card sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-foreground">
              Receita ao longo do tempo
            </h3>
            <span className="flex items-center gap-1 rounded-md bg-success/10 px-2 py-0.5 text-[11px] font-bold text-success">
              <TrendingUp className="h-3 w-3" />
              {current.growth}
            </span>
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
              {current.totalRevenue}
            </span>
            <span className="text-xs text-muted-foreground">
              ({current.subtitle})
            </span>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex items-center gap-1 rounded-xl border border-border-subtle bg-background p-1 self-start sm:self-auto">
          {(["7d", "30d", "90d"] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => {
                setPeriod(p);
                setShowPicker(false);
              }}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                period === p
                  ? "bg-card text-foreground shadow-xs border border-border-subtle"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {p === "7d" ? "7 dias" : p === "30d" ? "30 dias" : "90 dias"}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setShowPicker(!showPicker)}
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
              period === "custom"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Calendar className="h-3 w-3" />
            <span>Customizar</span>
          </button>
        </div>
      </div>

      {/* Popover Customizado */}
      {showPicker && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border-subtle bg-background p-3">
          <span className="text-xs font-semibold text-foreground">
            Selecione o intervalo:
          </span>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="h-8 rounded-lg border border-input bg-card px-2 text-xs font-medium text-foreground focus:border-accent focus:outline-none"
            />
            <span className="text-xs text-muted-foreground">até</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="h-8 rounded-lg border border-input bg-card px-2 text-xs font-medium text-foreground focus:border-accent focus:outline-none"
            />
            <button
              type="button"
              onClick={() => {
                setPeriod("custom");
                setShowPicker(false);
              }}
              className="flex h-8 items-center gap-1 rounded-lg bg-primary px-3 text-xs font-semibold text-primary-foreground hover:bg-primary-hover"
            >
              <Check className="h-3.5 w-3.5" />
              Aplicar
            </button>
            <button
              type="button"
              onClick={() => setShowPicker(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border-subtle bg-card text-muted-foreground hover:bg-muted"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Container do Gráfico */}
      <div className="relative mt-6 h-52 w-full">
        {/* Linhas de Grade */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
          <div className="w-full border-b border-dashed border-border-subtle" />
          <div className="w-full border-b border-dashed border-border-subtle" />
          <div className="w-full border-b border-dashed border-border-subtle" />
        </div>

        {/* 1. SVG Apenas para Linha Curva e Gradiente (vector-effect evita deformação do stroke) */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="h-full w-full overflow-visible"
        >
          <defs>
            <linearGradient id="goldGradFluid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          <path d={gradientD} fill="url(#goldGradFluid)" />
          <path
            d={pathD}
            fill="none"
            stroke="#D4AF37"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* 2. Camada HTML de Bolinhas Perfeitas e Tooltips (100% Imune a deformações) */}
        <div className="absolute inset-0 pointer-events-none">
          {current.points.map((pt) => {
            const isHovered = hoveredPointId === pt.id;
            
            // Ajuste para não cortar o tooltip se estiver nas pontas extremas
            let alignClass = "-translate-x-1/2";
            if (pt.x === 0) alignClass = "translate-x-0";
            if (pt.x === 100) alignClass = "-translate-x-full";

            return (
              <div
                key={pt.id}
                style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto group z-10"
                onMouseEnter={() => setHoveredPointId(pt.id)}
                onMouseLeave={() => setHoveredPointId(null)}
              >
                {/* Hitbox maior para facilitar passar o mouse */}
                <div className="absolute -inset-3 rounded-full cursor-pointer" />

                {/* Bolinha HTML 100% Redonda */}
                <div
                  className={`relative flex items-center justify-center rounded-full bg-card ring-2 ring-[#D4AF37] shadow-sm cursor-pointer transition-all duration-150 ${
                    isHovered ? "h-4 w-4 scale-110 ring-4" : "h-3 w-3"
                  }`}
                >
                  <div className="h-1 w-1 rounded-full bg-[#D4AF37]" />
                </div>

                {/* Tooltip HTML */}
                {isHovered && (
                  <div
                    className={`absolute bottom-full mb-2.5 ${alignClass} whitespace-nowrap rounded-xl border border-border-subtle bg-[#111111] px-3 py-1.5 text-center shadow-xl z-30 pointer-events-none transition-all duration-150`}
                  >
                    <p className="text-[10px] font-semibold text-[#6E6E73] leading-none">
                      {pt.label}
                    </p>
                    <p className="mt-1 text-xs font-bold text-white leading-none">
                      {pt.value}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Eixo X - Labels */}
      <div className="mt-4 flex justify-between border-t border-border-subtle pt-3 text-[11px] font-semibold text-muted-foreground">
        {current.xLabels.map((lbl) => (
          <span key={lbl}>{lbl}</span>
        ))}
      </div>
    </div>
  );
}