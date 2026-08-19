"use client";

import { useState, useMemo } from "react";
import { FilterX, Smartphone, Store } from "lucide-react";
import { SiShopee } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { MercadoLivreIcon } from "@/components/mercado-livre-icon";
import { SheinIcon } from "@/components/shein-icon";
import { CustomersFilters, type CustomerFiltersValue } from "./customers-filters";
import { CustomerDetailsSheet } from "./customer-details-sheet";
import { CustomersHeader } from "./customers-header";
import { CustomersKpis } from "./customers-kpis";
import { CustomersTable, type Customer } from "./customers-table";

// Base de Dados de Teste (CRM E-commerce Brasil)
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
      { title: "Pedido #4029", detail: "Mercado Livre · Air fryer digital", value: "R$ 240,00" },
      { title: "Pedido #3968", detail: "E-commerce · Kit organizador", value: "R$ 680,00" },
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
      { title: "Pedido #4012", detail: "Shopee · Cafeteira compacta", value: "R$ 389,00" },
      { title: "Pedido #3844", detail: "Shopee · Moedor elétrico", value: "R$ 219,00" },
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
      { title: "Pedido #4031", detail: "E-commerce · Kit skincare", value: "R$ 780,00" },
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
      { title: "Pedido #3661", detail: "App Próprio · Fone bluetooth", value: "R$ 480,00" },
      { title: "Pedido #3502", detail: "App Próprio · Smartwatch", value: "R$ 620,00" },
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
      { title: "Pedido #4038", detail: "Shein · Coleção inverno", value: "R$ 1.240,00" },
    ],
  },
];

const defaultFilters: CustomerFiltersValue = {
  search: "",
  channel: "Todos",
  segment: "Todos",
  sort: "recent",
};

export function CustomersContent() {
  const [filters, setFilters] = useState<CustomerFiltersValue>(defaultFilters);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Filtragem e Ordenação Otimizadas com useMemo
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
          const ltvFirst = Number(first.ltv.replace(/[^0-9]/g, ""));
          const ltvSecond = Number(second.ltv.replace(/[^0-9]/g, ""));
          return ltvSecond - ltvFirst;
        }

        if (filters.sort === "orders") {
          return second.orders - first.orders;
        }

        return 0;
      });
  }, [filters]);

  const hasActiveFilters =
    filters.search !== "" ||
    filters.channel !== "Todos" ||
    filters.segment !== "Todos" ||
    filters.sort !== "recent";

  const handleResetFilters = () => setFilters(defaultFilters);

  return (
    <div className="space-y-8">
      {/* Topo da Aba de Clientes */}
      <CustomersHeader />

      {/* Indicadores Visuais / KPIs de Retenção */}
      <CustomersKpis />

      {/* Barra de Filtros + Contador Dinâmico de Resultados */}
      <div className="space-y-3">
        <CustomersFilters value={filters} onChange={setFilters} />

        <div className="flex items-center justify-between px-1 text-xs text-muted-foreground">
          <p>
            Exibindo{" "}
            <span className="font-bold text-foreground">
              {filteredCustomers.length}
            </span>{" "}
            de{" "}
            <span className="font-bold text-foreground">
              {initialCustomers.length}
            </span>{" "}
            clientes cadastrados
          </p>

          {hasActiveFilters && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleResetFilters}
              className="h-auto gap-1.5 rounded-lg px-1.5 py-1 text-xs font-semibold text-accent hover:bg-accent/5 hover:text-accent-hover"
            >
              <FilterX className="h-3.5 w-3.5" />
              <span>Limpar filtros</span>
            </Button>
          )}
        </div>
      </div>

      {/* Tabela Interativa de Clientes */}
      <CustomersTable
        customers={filteredCustomers}
        onSelect={setSelectedCustomer}
      />

      {/* Drawer Lateral - Perfil 360° */}
      <CustomerDetailsSheet
        customer={selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
      />
    </div>
  );
}