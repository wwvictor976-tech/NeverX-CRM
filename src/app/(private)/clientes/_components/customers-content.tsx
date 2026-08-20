"use client";

import { useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { 
  CheckSquare, 
  FilterX, 
  MoreHorizontal, 
  Smartphone, 
  Square, 
  Store,
  Mail,
  Tag,
  Download,
  Trash2,
  X
} from "lucide-react";
import { SiShopee } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { MercadoLivreIcon } from "@/components/mercado-livre-icon";
import { SheinIcon } from "@/components/shein-icon";
import { CustomersFilters, type CustomerFiltersValue } from "./customers-filters";
import { CustomerDetailsSheet } from "./customer-details-sheet";
import { CustomersHeader } from "./customers-header";
import { CustomerActionModals, type CustomerAction } from "./customer-action-modals";
import { CustomersKpis } from "./customers-kpis";

export interface CustomerHistoryItem {
  title: string;
  detail: string;
  value: string;
  date?: string;
}

export interface Customer {
  id: string;
  initials: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  channel: string;
  channelIcon: React.ElementType;
  channelColor: string;
  ltv: string;
  averageTicket: string;
  orders: number;
  lastPurchase: string;
  daysSincePurchase: string;
  repurchaseDate: string;
  status: "VIP" | "RECOMPRA_PENDENTE" | "NOVO" | "EM_RISCO";
  tags: string[];
  history: CustomerHistoryItem[];
}

const initialCustomers: Customer[] = [
  {
    id: "ana-souza",
    initials: "AS",
    name: "Ana Souza",
    email: "ana.souza@email.com",
    phone: "+55 (11) 99845-1020",
    cpf: "***.***.***-42",
    channel: "Mercado Livre",
    channelIcon: MercadoLivreIcon,
    channelColor: "text-[#FFE600]",
    ltv: "R$ 12.480,00",
    averageTicket: "R$ 624,00",
    orders: 20,
    lastPurchase: "16 ago 2026",
    daysSincePurchase: "há 3 dias",
    repurchaseDate: "04 set 2026",
    status: "VIP",
    tags: ["alto valor", "frequente", "São Paulo"],
    history: [
      { title: "Pedido #4029", detail: "Mercado Livre · Air fryer digital", value: "R$ 240,00", date: "16 ago 2026" },
      { title: "Pedido #3968", detail: "E-commerce · Kit organizador", value: "R$ 680,00", date: "02 jul 2026" },
    ],
  },
  {
    id: "rafael-mendes",
    initials: "RM",
    name: "Rafael Mendes",
    email: "rafael.mendes@email.com",
    phone: "+55 (21) 98722-4410",
    cpf: "***.***.***-18",
    channel: "Shopee",
    channelIcon: SiShopee,
    channelColor: "text-[#EE4D2D]",
    ltv: "R$ 8.920,00",
    averageTicket: "R$ 446,00",
    orders: 20,
    lastPurchase: "12 ago 2026",
    daysSincePurchase: "há 7 dias",
    repurchaseDate: "28 ago 2026",
    status: "RECOMPRA_PENDENTE",
    tags: ["casa", "recorrente"],
    history: [
      { title: "Pedido #4012", detail: "Shopee · Cafeteira compacta", value: "R$ 389,00", date: "12 ago 2026" },
    ],
  },
  {
    id: "camila-lima",
    initials: "CL",
    name: "Camila Lima",
    email: "camila.lima@email.com",
    phone: "+55 (31) 99182-7704",
    cpf: "***.***.***-67",
    channel: "E-commerce",
    channelIcon: Store,
    channelColor: "text-accent",
    ltv: "R$ 2.340,00",
    averageTicket: "R$ 780,00",
    orders: 3,
    lastPurchase: "14 ago 2026",
    daysSincePurchase: "há 5 dias",
    repurchaseDate: "21 set 2026",
    status: "NOVO",
    tags: ["primeira compra", "Belo Horizonte"],
    history: [
      { title: "Pedido #4031", detail: "E-commerce · Kit skincare", value: "R$ 780,00", date: "14 ago 2026" },
    ],
  },
  {
    id: "joao-teixeira",
    initials: "JT",
    name: "João Teixeira",
    email: "joao.teixeira@email.com",
    phone: "+55 (41) 99671-3250",
    cpf: "***.***.***-09",
    channel: "App Próprio",
    channelIcon: Smartphone,
    channelColor: "text-blue-600",
    ltv: "R$ 5.760,00",
    averageTicket: "R$ 480,00",
    orders: 12,
    lastPurchase: "08 mai 2026",
    daysSincePurchase: "há 103 dias",
    repurchaseDate: "em atraso",
    status: "EM_RISCO",
    tags: ["reativação", "Curitiba"],
    history: [
      { title: "Pedido #3661", detail: "App Próprio · Fone bluetooth", value: "R$ 480,00", date: "08 mai 2026" },
    ],
  },
  {
    id: "marina-barbosa",
    initials: "MB",
    name: "Marina Barbosa",
    email: "marina.barbosa@email.com",
    phone: "+55 (51) 99871-2205",
    cpf: "***.***.***-81",
    channel: "Shein",
    channelIcon: SheinIcon,
    channelColor: "text-foreground",
    ltv: "R$ 18.200,00",
    averageTicket: "R$ 910,00",
    orders: 20,
    lastPurchase: "18 ago 2026",
    daysSincePurchase: "ontem",
    repurchaseDate: "02 set 2026",
    status: "VIP",
    tags: ["alto valor", "moda", "Porto Alegre"],
    history: [
      { title: "Pedido #4038", detail: "Shein · Coleção inverno", value: "R$ 1.240,00", date: "18 ago 2026" },
    ],
  },
];

const defaultFilters: CustomerFiltersValue = {
  search: "",
  channel: "Todos",
  segment: "Todos",
  sort: "recent",
};

const statusStyles: Record<string, { label: string; className: string }> = {
  VIP: { label: "VIP", className: "bg-purple-500/10 text-purple-600 border-purple-500/20" },
  RECOMPRA_PENDENTE: { label: "Recompra Pendente", className: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
  NOVO: { label: "Novo Cliente", className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
  EM_RISCO: { label: "Em Risco", className: "bg-rose-500/10 text-rose-600 border-rose-500/20" },
};

export function CustomersContent() {
  const router = useRouter();
  const [filters, setFilters] = useState<CustomerFiltersValue>(defaultFilters);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [activeAction, setActiveAction] = useState<CustomerAction>(null);

  const filteredCustomers = useMemo(() => {
    return initialCustomers
      .filter((customer) => {
        const query = filters.search.toLowerCase().trim();
        const matchesSearch =
          !query ||
          [customer.name, customer.email, customer.phone, customer.cpf].some((field) =>
            field.toLowerCase().includes(query)
          );
        const matchesChannel =
          filters.channel === "Todos" || customer.channel === filters.channel;
        const matchesSegment =
          filters.segment === "Todos" || customer.status === filters.segment;

        return matchesSearch && matchesChannel && matchesSegment;
      })
      .sort((first, second) => {
        if (filters.sort === "ltv") {
          return Number(second.ltv.replace(/[^0-9]/g, "")) - Number(first.ltv.replace(/[^0-9]/g, ""));
        }
        if (filters.sort === "orders") return second.orders - first.orders;
        return 0;
      });
  }, [filters]);

  const handleToggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectedIds.size === filteredCustomers.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredCustomers.map((c) => c.id)));
    }
  }, [filteredCustomers, selectedIds.size]);

  const hasActiveFilters =
    filters.search !== "" ||
    filters.channel !== "Todos" ||
    filters.segment !== "Todos" ||
    filters.sort !== "recent";

  const handleStartConversation = useCallback(
    (channel: "email" | "whatsapp" | "outro") => {
      if (!selectedCustomer) return;
      router.push(`/conversas?cliente=${encodeURIComponent(selectedCustomer.id)}&canal=${channel}`);
    },
    [router, selectedCustomer]
  );

  return (
    <div className="relative space-y-7 pb-12">
      <CustomersHeader onAction={setActiveAction} hasSelection={selectedIds.size > 0} />

      <section aria-label="Métricas de Relacionamento">
        <CustomersKpis />
      </section>

      <section className="space-y-3">
        <CustomersFilters value={filters} onChange={setFilters} />

        <div className="flex items-center justify-between px-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <p>
              Exibindo <span className="font-bold text-foreground">{filteredCustomers.length}</span> de{" "}
              <span className="font-bold text-foreground">{initialCustomers.length}</span> clientes
            </p>
            {hasActiveFilters && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setFilters(defaultFilters)}
                className="h-6 gap-1 px-2 text-[11px] font-semibold text-accent hover:bg-accent/10"
              >
                <FilterX className="h-3 w-3" />
                <span>Limpar filtros</span>
              </Button>
            )}
          </div>

          <button
            type="button"
            onClick={handleSelectAll}
            className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
          >
            {selectedIds.size > 0 && selectedIds.size === filteredCustomers.length ? (
              <CheckSquare className="h-3.5 w-3.5 text-accent" />
            ) : (
              <Square className="h-3.5 w-3.5" />
            )}
            <span>Selecionar todos</span>
          </button>
        </div>

        {/* Tabela de Clientes */}
        <div className="data-surface overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-border-subtle bg-muted/30 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  <th className="w-10 px-4 py-3 text-center">#</th>
                  <th className="px-4 py-3">Cliente</th>
                  <th className="px-4 py-3">Canal</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">LTV</th>
                  <th className="px-4 py-3">Última Compra</th>
                  <th className="w-10 px-4 py-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-12 text-center text-xs text-muted-foreground">
                      Nenhum cliente encontrado com os filtros selecionados.
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map((customer) => {
                    const isSelected = selectedIds.has(customer.id);
                    const ChannelIcon = customer.channelIcon;
                    const statusConfig = statusStyles[customer.status] || {
                      label: customer.status,
                      className: "bg-muted text-muted-foreground border-border",
                    };

                    return (
                      <tr
                        key={customer.id}
                        onClick={() => setSelectedCustomer(customer)}
                        className={`group cursor-pointer text-xs transition-colors duration-150 ${
                          isSelected ? "bg-accent/5 hover:bg-accent/10" : "hover:bg-muted/30 active:bg-muted/50"
                        }`}
                      >
                        <td
                          className="px-4 py-3.5 text-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleSelect(customer.id);
                          }}
                        >
                          <button type="button" className="text-muted-foreground hover:text-foreground">
                            {isSelected ? (
                              <CheckSquare className="h-4 w-4 text-accent" />
                            ) : (
                              <Square className="h-4 w-4" />
                            )}
                          </button>
                        </td>

                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                              {customer.initials}
                            </div>
                            <div>
                              <p className="font-bold text-foreground">{customer.name}</p>
                              <p className="text-[11px] text-muted-foreground">{customer.email}</p>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-1.5 font-medium text-foreground">
                            {ChannelIcon ? (
                              <ChannelIcon className={`h-4 w-4 ${customer.channelColor}`} />
                            ) : (
                              <div className="h-4 w-4 rounded-full bg-muted" />
                            )}
                            <span>{customer.channel}</span>
                          </div>
                        </td>

                        <td className="px-4 py-3.5">
                          <span
                            className={`inline-flex rounded-md border px-2 py-0.5 text-[10px] font-bold ${statusConfig.className}`}
                          >
                            {statusConfig.label}
                          </span>
                        </td>

                        <td className="px-4 py-3.5 font-bold text-foreground">
                          {customer.ltv}
                        </td>

                        <td className="px-4 py-3.5 text-muted-foreground">
                          <p className="font-medium text-foreground">{customer.lastPurchase}</p>
                          <p className="text-[10px]">{customer.daysSincePurchase}</p>
                        </td>

                        <td className="px-4 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Floating Bulk Action Bar */}
      {selectedIds.size > 0 && (
        <div className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-2xl border border-border/80 bg-background/95 px-4 py-2.5 shadow-2xl backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          <div className="flex items-center gap-2 border-r border-border pr-3">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
              {selectedIds.size}
            </span>
            <span className="text-xs font-semibold text-foreground hidden sm:inline">
              selecionados
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Button size="sm" variant="outline" className="h-8 gap-1.5 rounded-xl text-xs font-semibold">
              <Mail className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="hidden sm:inline">Enviar Email</span>
            </Button>
            <Button size="sm" variant="outline" className="h-8 gap-1.5 rounded-xl text-xs font-semibold">
              <Tag className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="hidden sm:inline">Adicionar Tag</span>
            </Button>
            <Button size="sm" variant="outline" className="h-8 gap-1.5 rounded-xl text-xs font-semibold">
              <Download className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="hidden sm:inline">Exportar</span>
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 rounded-xl p-0 text-danger hover:bg-danger/10">
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setSelectedIds(new Set())}
            className="ml-1 rounded-lg p-1 text-muted-foreground hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* 360° Customer Profile Sheet Workspace */}
      <CustomerDetailsSheet
        customer={selectedCustomer}
        isOpen={!!selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
        onStartConversation={handleStartConversation}
      />

      <CustomerActionModals
        action={activeAction}
        selectedCount={selectedIds.size}
        onClose={() => setActiveAction(null)}
      />
    </div>
  );
}