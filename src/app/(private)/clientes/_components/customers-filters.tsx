"use client";

import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  ArrowUpDown,
  RotateCcw,
} from "lucide-react";

export interface CustomerFiltersValue {
  search: string;
  channel: string;
  segment: string;
  sort: string;
}

interface CustomersFiltersProps {
  value: CustomerFiltersValue;
  onChange: (value: CustomerFiltersValue) => void;
}

export function CustomersFilters({ value, onChange }: CustomersFiltersProps) {
  const update = (key: keyof CustomerFiltersValue, nextValue: string) => {
    onChange({ ...value, [key]: nextValue });
  };

  // Contagem de filtros ativos para feedback visual ao usuário
  const activeFiltersCount =
    (value.search ? 1 : 0) +
    (value.channel !== "Todos" ? 1 : 0) +
    (value.segment !== "Todos" ? 1 : 0) +
    (value.sort !== "recent" ? 1 : 0);

  const handleReset = () => {
    onChange({
      search: "",
      channel: "Todos",
      segment: "Todos",
      sort: "recent",
    });
  };

  return (
    <div className="rounded-2xl border border-border-subtle bg-card p-4 shadow-card transition-all sm:p-5">
      <div className="flex flex-col gap-4">
        {/* Linha Superior: Busca e Ações de Filtro */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          {/* Campo de Busca Principal */}
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors" />
            <input
              value={value.search}
              onChange={(event) => update("search", event.target.value)}
              aria-label="Buscar clientes"
              placeholder="Nome, e-mail, telefone/WhatsApp ou CPF..."
              className="h-10 w-full rounded-xl border border-input bg-background pl-10 pr-9 text-xs font-medium text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
            {value.search && (
              <button
                type="button"
                onClick={() => update("search", "")}
                aria-label="Limpar busca"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Botão de Limpar Todos os Filtros (Quando Ativos) */}
          {activeFiltersCount > 0 && (
            <button
              type="button"
              onClick={handleReset}
              className="flex h-10 items-center justify-center gap-2 rounded-xl border border-border-subtle bg-background px-3.5 text-xs font-bold text-muted-foreground transition-all hover:border-border hover:bg-muted hover:text-foreground active:scale-95"
            >
              <RotateCcw className="h-3.5 w-3.5 text-accent" />
              <span>Limpar filtros</span>
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-accent/20 px-1 text-[10px] font-extrabold text-accent">
                {activeFiltersCount}
              </span>
            </button>
          )}
        </div>

        {/* Linha Inferior: Controles de Filtros e Ordenação */}
        <div className="grid grid-cols-1 gap-3 border-t border-border-subtle/60 pt-3.5 sm:grid-cols-2 lg:flex lg:items-center lg:justify-between">
          {/* Grupo 1: Filtros de Categoria */}
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <SlidersHorizontal className="h-3.5 w-3.5 text-accent" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Filtrar:
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
              {/* Custom Select: Canal */}
              <div className="relative">
                <select
                  value={value.channel}
                  onChange={(event) => update("channel", event.target.value)}
                  aria-label="Filtrar por canal"
                  className="h-9 w-full appearance-none rounded-xl border border-input bg-background pl-3 pr-8 text-xs font-semibold text-foreground outline-none transition-all hover:border-border focus:border-accent focus:ring-2 focus:ring-accent/20 cursor-pointer sm:w-auto"
                >
                  <option value="Todos">Todos os canais</option>
                  <option value="Mercado Livre">Mercado Livre</option>
                  <option value="Shopee">Shopee</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="App Próprio">App Próprio</option>
                  <option value="Shein">Shein</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              </div>

              {/* Custom Select: Segmento */}
              <div className="relative">
                <select
                  value={value.segment}
                  onChange={(event) => update("segment", event.target.value)}
                  aria-label="Filtrar por segmento"
                  className="h-9 w-full appearance-none rounded-xl border border-input bg-background pl-3 pr-8 text-xs font-semibold text-foreground outline-none transition-all hover:border-border focus:border-accent focus:ring-2 focus:ring-accent/20 cursor-pointer sm:w-auto"
                >
                  <option value="Todos">Todos os segmentos</option>
                  <option value="VIP">VIP</option>
                  <option value="RECOMPRA_PENDENTE">Prontos p/ recompra</option>
                  <option value="EM_RISCO">Em risco</option>
                  <option value="NOVO">Novos</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* Grupo 2: Ordenação de Resultados */}
          <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-border-subtle/60 lg:justify-end">
            <div className="flex items-center gap-1.5 text-muted-foreground shrink-0">
              <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Ordem:
              </span>
            </div>

            {/* Custom Select: Ordenação */}
            <div className="relative min-w-0 flex-1 sm:w-auto sm:flex-none">
              <select
                value={value.sort}
                onChange={(event) => update("sort", event.target.value)}
                aria-label="Ordenar clientes"
                className="h-9 w-full appearance-none rounded-xl border border-input bg-background pl-3 pr-8 text-xs font-semibold text-foreground outline-none transition-all hover:border-border focus:border-accent focus:ring-2 focus:ring-accent/20 cursor-pointer"
              >
                <option value="recent">Compra mais recente</option>
                <option value="ltv">Maior LTV (Faturamento)</option>
                <option value="orders">Mais pedidos realizados</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}