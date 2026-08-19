import {
  ArrowUpDown,
  ChevronRight,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Users,
} from "lucide-react";
import { PrivateLayout } from "@/components/layout/private-layout";

const clients = [
  { initials: "AS", name: "Ana Souza", email: "ana.souza@email.com", segment: "VIP", purchases: "R$ 12.480,00", lastContact: "Hoje", status: "Ativo", color: "bg-[#FCE7F3] text-[#BE185D]" },
  { initials: "RM", name: "Rafael Mendes", email: "rafael.mendes@email.com", segment: "Recorrente", purchases: "R$ 8.920,00", lastContact: "Ontem", status: "Ativo", color: "bg-[#DBEAFE] text-[#1D4ED8]" },
  { initials: "CL", name: "Camila Lima", email: "camila.lima@email.com", segment: "Novo cliente", purchases: "R$ 2.340,00", lastContact: "12 ago", status: "Ativo", color: "bg-[#D1FAE5] text-[#047857]" },
  { initials: "JT", name: "Joao Teixeira", email: "joao.teixeira@email.com", segment: "Em risco", purchases: "R$ 5.760,00", lastContact: "08 ago", status: "Atenção", color: "bg-[#FEF3C7] text-[#B45309]" },
  { initials: "MB", name: "Marina Barbosa", email: "marina.barbosa@email.com", segment: "VIP", purchases: "R$ 18.200,00", lastContact: "05 ago", status: "Ativo", color: "bg-[#EDE9FE] text-[#6D28D9]" },
];

const summary = [
  { label: "Total de clientes", value: "2.847", change: "+12,4%", tone: "text-success" },
  { label: "Clientes ativos", value: "2.391", change: "+8,2%", tone: "text-success" },
  { label: "Novos este mês", value: "184", change: "+16,8%", tone: "text-success" },
  { label: "Em risco", value: "72", change: "-4,1%", tone: "text-success" },
];

export default function ClientsPage() {
  return (
    <PrivateLayout
      title="Clientes"
      subtitle="Gerencie seus relacionamentos e acompanhe a saúde da sua base."
    >
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-muted-foreground">Sua base de relacionamento</p>
            <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-foreground">Todos os clientes</h1>
          </div>
          <button type="button" className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-xs font-bold text-primary-foreground transition-colors hover:bg-primary-hover">
            <Plus className="h-4 w-4" />
            Adicionar cliente
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {summary.map((item) => (
            <div key={item.label} className="rounded-2xl border border-border-subtle bg-card p-4 shadow-card">
              <p className="text-xs font-medium text-muted-foreground">{item.label}</p>
              <div className="mt-3 flex items-end justify-between gap-2">
                <span className="text-2xl font-extrabold tracking-tight text-foreground">{item.value}</span>
                <span className={`text-[11px] font-bold ${item.tone}`}>{item.change}</span>
              </div>
            </div>
          ))}
        </div>

        <section className="overflow-hidden rounded-2xl border border-border-subtle bg-card shadow-card">
          <div className="flex flex-col gap-3 border-b border-border-subtle p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="relative w-full sm:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input aria-label="Buscar clientes" placeholder="Buscar por nome ou e-mail" className="h-10 w-full rounded-xl border border-input bg-background pl-9 pr-3 text-xs font-medium text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-ring" />
            </div>
            <div className="flex gap-2">
              <button type="button" className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-card px-3 text-xs font-semibold text-foreground transition-colors hover:bg-muted">
                <Filter className="h-3.5 w-3.5" />
                Filtros
              </button>
              <button type="button" className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-card px-3 text-xs font-semibold text-foreground transition-colors hover:bg-muted">
                <ArrowUpDown className="h-3.5 w-3.5" />
                Ordenar
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left">
              <thead className="bg-background/70 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-3">Cliente</th>
                  <th className="px-5 py-3">Segmento</th>
                  <th className="px-5 py-3">Compras</th>
                  <th className="px-5 py-3">Último contato</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3"><span className="sr-only">Ações</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {clients.map((client) => (
                  <tr key={client.email} className="text-xs transition-colors hover:bg-muted/40">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold ${client.color}`}>{client.initials}</div>
                        <div>
                          <p className="font-bold text-foreground">{client.name}</p>
                          <p className="mt-0.5 text-[11px] text-muted-foreground">{client.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-semibold text-muted-foreground">{client.segment}</td>
                    <td className="px-5 py-4 font-bold text-foreground">{client.purchases}</td>
                    <td className="px-5 py-4 text-muted-foreground">{client.lastContact}</td>
                    <td className="px-5 py-4"><span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ${client.status === "Ativo" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}`}>{client.status}</span></td>
                    <td className="px-5 py-4 text-right"><button type="button" aria-label={`Abrir opções de ${client.name}`} className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"><MoreHorizontal className="h-4 w-4" /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-border-subtle px-5 py-4 text-[11px] font-semibold text-muted-foreground">
            <span>Mostrando 5 de 2.847 clientes</span>
            <button type="button" className="inline-flex items-center gap-1 text-foreground transition-colors hover:text-accent-hover">Ver todos <ChevronRight className="h-3.5 w-3.5" /></button>
          </div>
        </section>

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>Base atualizada há poucos minutos</span>
        </div>
      </div>
    </PrivateLayout>
  );
}