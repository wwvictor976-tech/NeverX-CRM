import {
  ArrowUpDown,
  ChevronDown,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";

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

const selectClasses =
  "h-9 w-full appearance-none rounded-xl border border-input bg-background/60 pl-3 pr-8 text-xs font-semibold text-foreground outline-none transition-colors hover:border-border focus:border-accent focus:ring-1 focus:ring-ring cursor-pointer sm:w-auto";

export function CustomersFilters({ value, onChange }: CustomersFiltersProps) {
  const update = (key: keyof CustomerFiltersValue, nextValue: string) => {
    onChange({ ...value, [key]: nextValue });
  };

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
    <div className="toolbar-surface p-4 transition-all sm:p-5">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="min-w-0 flex-1">
            <Input
              value={value.search}
              onChange={(event) => update("search", event.target.value)}
              aria-label="Buscar clientes"
              placeholder="Nome, e-mail, telefone/WhatsApp ou CPF..."
              leftIcon={<Search className="h-4 w-4" />}
              rightIcon={
                value.search ? (
                  <button
                    type="button"
                    onClick={() => update("search", "")}
                    aria-label="Limpar busca"
                    className="rounded-lg p-1 transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                ) : undefined
              }
              className="h-10 bg-background/60 text-xs"
            />
          </div>

          {activeFiltersCount > 0 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="h-10 rounded-xl border-border-subtle bg-background/60 text-xs font-semibold text-muted-foreground hover:border-border hover:bg-muted hover:text-foreground"
            >
              <RotateCcw className="h-3.5 w-3.5 text-accent" />
              <span>Limpar filtros</span>
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-accent/15 px-1 text-[10px] font-bold text-accent">
                {activeFiltersCount}
              </span>
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 border-t border-border-subtle/60 pt-3.5 sm:grid-cols-2 lg:flex lg:items-center lg:justify-between">
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <SlidersHorizontal className="h-3.5 w-3.5 text-accent" />
              <span className="text-[11px] font-bold uppercase tracking-wider">
                Filtrar:
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
              <div className="relative">
                <select
                  value={value.channel}
                  onChange={(event) => update("channel", event.target.value)}
                  aria-label="Filtrar por canal"
                  className={selectClasses}
                >
                  <option value="Todos">Todos os canais</option>
                  <option value="Mercado Livre">Mercado Livre</option>
                  <option value="Shopee">Shopee</option>
                  <option value="Nuvemshop">Nuvemshop</option>
                  <option value="App Próprio">App Próprio</option>
                  <option value="Shein">Shein</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              </div>

              <div className="relative">
                <select
                  value={value.segment}
                  onChange={(event) => update("segment", event.target.value)}
                  aria-label="Filtrar por segmento"
                  className={selectClasses}
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

          <div className="flex items-center gap-2 border-t border-border-subtle/60 pt-2 sm:border-t-0 sm:pt-0 lg:justify-end">
            <div className="flex shrink-0 items-center gap-1.5 text-muted-foreground">
              <ArrowUpDown className="h-3.5 w-3.5" />
              <span className="text-[11px] font-bold uppercase tracking-wider">
                Ordem:
              </span>
            </div>

            <div className="relative min-w-0 flex-1 sm:w-auto sm:flex-none">
              <select
                value={value.sort}
                onChange={(event) => update("sort", event.target.value)}
                aria-label="Ordenar clientes"
                className={selectClasses}
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
