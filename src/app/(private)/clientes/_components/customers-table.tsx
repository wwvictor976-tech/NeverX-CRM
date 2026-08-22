import Link from "next/link";
import { ArrowUpRight, CheckSquare, Globe2, MessageSquare, Package, Smartphone, Square, UserX } from "lucide-react";
import { PlatformLogo } from "@/components/platform-logo";
import type { CustomerProfile } from "@/lib/crm-domain";
import { CustomerStatusBadge } from "./customer-status-badge";

interface CustomersTableProps {
  customers: CustomerProfile[];
  selectedIds: Set<string>;
  onToggleSelect: (id: string) => void;
  onSelectAll: () => void;
  onSelect: (customer: CustomerProfile) => void;
}

export function CustomersTable({ customers, selectedIds, onToggleSelect, onSelectAll, onSelect }: CustomersTableProps) {
  const allSelected = customers.length > 0 && customers.every((customer) => selectedIds.has(customer.id));

  if (customers.length === 0) {
    return (
      <div className="data-surface flex flex-col items-center justify-center p-12 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border-subtle bg-muted/60 text-muted-foreground"><UserX className="h-6 w-6" /></div>
        <h3 className="mt-4 text-sm font-bold text-foreground">Nenhum cliente encontrado</h3>
        <p className="mt-1 max-w-sm text-xs leading-relaxed text-muted-foreground">Tente alterar a busca ou remover algum filtro para ampliar os resultados.</p>
      </div>
    );
  }

  return (
    <div className="data-surface overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1120px] border-collapse text-left">
          <caption className="sr-only">Clientes encontrados na base do workspace</caption>
          <thead className="border-b border-border-subtle bg-background/50 text-[10px] font-bold uppercase tracking-wider text-muted-foreground select-none">
            <tr>
              <th className="w-12 px-4 py-3.5 text-center"><button type="button" onClick={onSelectAll} aria-label={allSelected ? "Desmarcar todos os clientes" : "Selecionar todos os clientes"} className="inline-flex rounded-md p-1 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{allSelected ? <CheckSquare className="h-4 w-4 text-accent" /> : <Square className="h-4 w-4" />}</button></th>
              <th className="px-4 py-3.5">Cliente</th>
              <th className="px-4 py-3.5">Origem</th>
              <th className="px-4 py-3.5">Saúde</th>
              <th className="px-4 py-3.5">Valor e pedidos</th>
              <th className="px-4 py-3.5">Última atividade</th>
              <th className="px-4 py-3.5">Próxima recompra</th>
              <th className="px-4 py-3.5 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle/70">
            {customers.map((customer) => {
              const isSelected = selectedIds.has(customer.id);
              const isLateRepurchase = customer.repurchaseDate === "em atraso";
              const SourceFallback = customer.sourcePlatform === "pdv" ? Smartphone : Globe2;
              return (
                <tr
                  key={customer.id}
                  tabIndex={0}
                  aria-selected={isSelected}
                  aria-label={`Abrir perfil 360 graus de ${customer.name}`}
                  onClick={() => onSelect(customer)}
                  onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onSelect(customer); } }}
                  className={`group cursor-pointer text-xs outline-none transition-colors duration-150 hover:bg-muted/30 focus-visible:bg-muted/40 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent ${isSelected ? "bg-accent/5" : ""}`}
                >
                  <td className="px-4 py-3.5 text-center" onClick={(event) => event.stopPropagation()}><button type="button" onClick={() => onToggleSelect(customer.id)} aria-label={`${isSelected ? "Desmarcar" : "Selecionar"} ${customer.name}`} className="inline-flex rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{isSelected ? <CheckSquare className="h-4 w-4 text-accent" /> : <Square className="h-4 w-4" />}</button></td>
                  <td className="px-4 py-3.5"><div className="flex min-w-0 items-center gap-3"><div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/20 bg-accent/10 text-[10px] font-bold text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">{customer.initials}</div><div className="min-w-0"><p className="truncate font-bold text-foreground">{customer.name}</p><p className="mt-0.5 truncate text-[10px] font-semibold text-accent">{customer.id}</p><p className="truncate text-[11px] text-muted-foreground">{customer.email}</p></div></div></td>
                  <td className="whitespace-nowrap px-4 py-3.5"><span className="inline-flex items-center gap-2 font-semibold text-foreground"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-border-subtle bg-background">{customer.channelLogo ? <PlatformLogo platform={customer.channelLogo} size="xs" framed={false} /> : <SourceFallback className="h-3.5 w-3.5 text-muted-foreground" />}</span><span><span className="block">{customer.sourceLabel}</span><span className="text-[10px] font-medium text-muted-foreground">{customer.sourcePlatform === "pdv" ? "Ponto de venda" : "Canal conectado"}</span></span></span></td>
                  <td className="whitespace-nowrap px-4 py-3.5"><CustomerStatusBadge status={customer.status} /></td>
                  <td className="whitespace-nowrap px-4 py-3.5"><p className="font-extrabold text-foreground">{customer.ltv}</p><p className="mt-0.5 inline-flex items-center gap-1 text-[10px] font-medium text-muted-foreground"><Package className="h-3 w-3" />{customer.orders} {customer.orders === 1 ? "pedido" : "pedidos"}</p></td>
                  <td className="whitespace-nowrap px-4 py-3.5"><p className="font-semibold text-foreground">{customer.lastInteraction}</p><p className="mt-0.5 text-[10px] font-medium text-muted-foreground">Compra: {customer.lastPurchase}</p></td>
                  <td className="whitespace-nowrap px-4 py-3.5">{isLateRepurchase ? <span className="inline-flex rounded-lg border border-warning/30 bg-warning/10 px-2 py-1 text-[10px] font-bold text-warning">Em atraso</span> : <span className="font-semibold text-muted-foreground">{customer.repurchaseDate}</span>}</td>
                  <td className="whitespace-nowrap px-4 py-3.5" onClick={(event) => event.stopPropagation()}><div className="flex items-center justify-end gap-1.5"><Link href={`/conversas?cliente=${encodeURIComponent(customer.id)}&canal=whatsapp`} target="_self" onClick={(event) => event.stopPropagation()} aria-label={`Abrir conversa com ${customer.name}`} title="Abrir atendimento" className="inline-flex h-8 items-center gap-1.5 rounded-xl border border-success/20 bg-success/5 px-2.5 text-[10px] font-bold text-success transition-colors hover:bg-success/10"><MessageSquare className="h-3.5 w-3.5" /><span className="hidden xl:inline">Atender</span></Link><button type="button" onClick={() => onSelect(customer)} className="inline-flex h-8 items-center gap-1.5 rounded-xl border border-border-subtle bg-background px-2.5 text-[10px] font-bold text-foreground transition-colors hover:border-accent/40 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><span>Perfil 360°</span><ArrowUpRight className="h-3 w-3 text-muted-foreground" /></button></div></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border-subtle bg-background/40 px-4 py-3.5 text-[11px] font-semibold text-muted-foreground sm:px-5"><span>Mostrando <strong className="text-foreground">{customers.length}</strong> {customers.length === 1 ? "cliente" : "clientes"}</span><span className="hidden sm:inline-block">Enter ou clique numa linha para abrir o perfil 360°</span></div>
    </div>
  );
}
