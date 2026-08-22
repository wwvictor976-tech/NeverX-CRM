"use client";

import { useCallback, useMemo, useState } from "react";
import { FilterX, Mail, Tag, Trash2, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { CustomerProfile } from "@/lib/crm-domain";
import { useCrmWorkspace } from "@/components/crm/crm-workspace-context";
import { parseMockDate } from "@/lib/crm-selectors";
import { CustomerActionModals, type CustomerAction } from "./customer-action-modals";
import { CustomerDetailsSheet } from "./customer-details-sheet";
import { CustomersFilters, type CustomerFiltersValue } from "./customers-filters";
import { CustomersHeader } from "./customers-header";
import { CustomersKpis } from "./customers-kpis";
import { CustomersTable } from "./customers-table";

export type Customer = CustomerProfile;

const defaultFilters: CustomerFiltersValue = { search: "", channel: "Todos", segment: "Todos", sort: "recent" };

export function CustomersContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedCustomer = searchParams.get("cliente");
  const { customers, campaigns: campaignRecords, addCustomer, updateCustomer: updateWorkspaceCustomer, removeCustomers, addCampaign } = useCrmWorkspace();
  const [filters, setFilters] = useState<CustomerFiltersValue>(defaultFilters);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerProfile | null>(() => customers.find((customer) => customer.id === requestedCustomer || customer.slug === requestedCustomer) ?? null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [activeAction, setActiveAction] = useState<CustomerAction>(null);

  const filteredCustomers = useMemo(() => {
    const query = filters.search.toLowerCase().trim();
    return customers
      .filter((customer) => {
        const searchable = [customer.id, customer.name, customer.email, customer.phone, customer.cpf, customer.sourceLabel, ...customer.tags, ...customer.segments].join(" ").toLowerCase();
        return (!query || searchable.includes(query)) && (filters.channel === "Todos" || customer.channel === filters.channel) && (filters.segment === "Todos" || customer.status === filters.segment);
      })
      .sort((first, second) => {
        if (filters.sort === "ltv") return second.totalSpent - first.totalSpent;
        if (filters.sort === "orders") return second.orders - first.orders;
        return (parseMockDate(second.lastPurchase) ?? "").localeCompare(parseMockDate(first.lastPurchase) ?? "");
      });
  }, [customers, filters]);

  const selectedCustomers = useMemo(() => customers.filter((customer) => selectedIds.has(customer.id)), [customers, selectedIds]);
  const hasActiveFilters = filters.search !== "" || filters.channel !== "Todos" || filters.segment !== "Todos" || filters.sort !== "recent";

  const handleToggleSelect = useCallback((id: string) => {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    const allVisibleSelected = filteredCustomers.length > 0 && filteredCustomers.every((customer) => selectedIds.has(customer.id));
    setSelectedIds((current) => {
      const next = new Set(current);
      filteredCustomers.forEach((customer) => { if (allVisibleSelected) next.delete(customer.id); else next.add(customer.id); });
      return next;
    });
  }, [filteredCustomers, selectedIds]);

  const handleStartConversation = useCallback((channel: "email" | "whatsapp" | "outro") => {
    if (!selectedCustomer) return;
    router.push(`/conversas?cliente=${encodeURIComponent(selectedCustomer.id)}&canal=${channel}`);
  }, [router, selectedCustomer]);

  const updateCustomer = (customerId: string, updater: (customer: CustomerProfile) => CustomerProfile) => {
    updateWorkspaceCustomer(customerId, updater);
    setSelectedCustomer((current) => current?.id === customerId ? updater(current) : current);
  };

  const handleTagSaved = (tag: string) => {
    selectedCustomers.forEach((customer) => updateWorkspaceCustomer(customer.id, (current) => current.tags.includes(tag) ? current : { ...current, tags: [...current.tags, tag] }));
    setSelectedCustomer((current) => current && selectedIds.has(current.id) && !current.tags.includes(tag) ? { ...current, tags: [...current.tags, tag] } : current);
    setActiveAction(null);
  };

  const handleTagAdded = (customerId: string, tag: string) => {
    updateCustomer(customerId, (customer) => customer.tags.includes(tag) ? customer : { ...customer, tags: [...customer.tags, tag] });
  };

  const handleCustomersDeleted = () => {
    removeCustomers(Array.from(selectedIds));
    setSelectedIds(new Set());
    setActiveAction(null);
    setSelectedCustomer(null);
  };

  const handleCustomerCreated = (customer: CustomerProfile) => {
    addCustomer(customer);
    setSelectedCustomer(customer);
    setActiveAction(null);
  };

  return (
    <div className="relative space-y-7 pb-12">
      <CustomersHeader onAction={setActiveAction} hasSelection={selectedIds.size > 0} selectedCount={selectedIds.size} />

      <section aria-labelledby="customers-kpis" className="space-y-3">
        <div className="flex items-end justify-between gap-3"><div><p className="page-kicker">Leitura da base</p><h2 id="customers-kpis" className="section-heading mt-1">Saúde dos clientes</h2></div><span className="hidden text-[11px] font-medium text-muted-foreground sm:block">Valor, recorrência e risco em uma única visão</span></div>
        <CustomersKpis customers={customers} />
      </section>

      <section aria-labelledby="customers-list" className="space-y-3">
        <div className="flex items-end justify-between gap-3"><div><p className="page-kicker">Base operacional</p><h2 id="customers-list" className="section-heading mt-1">Todos os clientes</h2></div><span className="hidden text-[11px] font-medium text-muted-foreground sm:block">Use a busca por ID, nome, contato, canal ou segmento</span></div>
        <CustomersFilters value={filters} onChange={setFilters} />

        <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-muted-foreground"><div className="flex items-center gap-2"><p>Exibindo <span className="font-bold text-foreground">{filteredCustomers.length}</span> de <span className="font-bold text-foreground">{customers.length}</span> {customers.length === 1 ? "cliente" : "clientes"}</p>{hasActiveFilters ? <Button type="button" variant="ghost" size="sm" onClick={() => setFilters(defaultFilters)} className="h-6 gap-1 px-2 text-[11px] font-semibold text-accent hover:bg-accent/10"><FilterX className="h-3 w-3" />Limpar filtros</Button> : null}</div><span className="font-medium">{selectedIds.size ? `${selectedIds.size} selecionado${selectedIds.size === 1 ? "" : "s"}` : "Nenhum cliente selecionado"}</span></div>

        <CustomersTable customers={filteredCustomers} selectedIds={selectedIds} onToggleSelect={handleToggleSelect} onSelectAll={handleSelectAll} onSelect={setSelectedCustomer} />
      </section>

      {selectedIds.size > 0 ? <div className="fixed bottom-4 left-1/2 z-40 flex max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-2 overflow-x-auto rounded-2xl border border-border/80 bg-background/95 px-3 py-2.5 shadow-2xl backdrop-blur-md sm:bottom-6 sm:gap-3 sm:px-4"><div className="flex shrink-0 items-center gap-2 border-r border-border pr-2 sm:pr-3"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">{selectedIds.size}</span><span className="hidden text-xs font-semibold text-foreground sm:inline">selecionados</span></div><div className="flex shrink-0 items-center gap-1.5"><Button size="sm" variant="outline" onClick={() => setActiveAction("tag")} className="h-8 gap-1.5 rounded-xl text-xs font-semibold"><Tag className="h-3.5 w-3.5 text-muted-foreground" /><span className="hidden sm:inline">Adicionar tag</span></Button><Button size="sm" variant="outline" onClick={() => setActiveAction("export")} className="h-8 gap-1.5 rounded-xl text-xs font-semibold"><Mail className="h-3.5 w-3.5 text-muted-foreground" /><span className="hidden sm:inline">Exportar seleção</span></Button><Button size="sm" variant="ghost" onClick={() => setActiveAction("delete")} className="h-8 w-8 rounded-xl p-0 text-danger hover:bg-danger/10" aria-label="Remover clientes selecionados"><Trash2 className="h-3.5 w-3.5" /></Button></div><button type="button" onClick={() => setSelectedIds(new Set())} className="ml-1 shrink-0 rounded-lg p-1 text-muted-foreground hover:bg-muted" aria-label="Limpar seleção"><X className="h-4 w-4" /></button></div> : null}

      <CustomerDetailsSheet key={selectedCustomer?.id ?? "empty"} customer={selectedCustomer} isOpen={!!selectedCustomer} onClose={() => setSelectedCustomer(null)} onStartConversation={handleStartConversation} additionalCampaigns={campaignRecords} onTagAdded={handleTagAdded} />
      <CustomerActionModals action={activeAction} selectedCustomers={selectedCustomers} visibleCustomers={filteredCustomers} onClose={() => setActiveAction(null)} onCustomerCreated={handleCustomerCreated} onTagSaved={handleTagSaved} onCustomersDeleted={handleCustomersDeleted} onCampaignSaved={(campaign) => { addCampaign(campaign); setActiveAction(null); }} />
    </div>
  );
}
