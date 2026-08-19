import { ArrowUpRight, UserX } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import type { ElementType } from "react";
import { CustomerStatusBadge, type CustomerStatus } from "./customer-status-badge";

export interface Customer {
  id: string;
  initials: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  channel: string;
  channelIcon: ElementType;
  channelColor: string;
  ltv: string;
  averageTicket: string;
  orders: number;
  lastPurchase: string;
  daysSincePurchase: string;
  repurchaseDate: string;
  status: CustomerStatus;
  tags: string[];
  history: { title: string; detail: string; value: string }[];
}

interface CustomersTableProps {
  customers: Customer[];
  onSelect: (customer: Customer) => void;
}

export function CustomersTable({ customers, onSelect }: CustomersTableProps) {
  if (customers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border-subtle bg-card p-12 text-center shadow-card">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border-subtle bg-muted/60 text-muted-foreground">
          <UserX className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-sm font-bold text-foreground">
          Nenhum cliente encontrado
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Tente alterar os termos da pesquisa ou ajustar os filtros selecionados.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border-subtle bg-card shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1060px] border-collapse text-left">
          <thead className="border-b border-border-subtle bg-background/50 text-[10px] font-bold uppercase tracking-wider text-muted-foreground select-none">
            <tr>
              <th className="px-5 py-3.5">Cliente</th>
              <th className="px-5 py-3.5">Canal de Origem</th>
              <th className="px-5 py-3.5">LTV & Pedidos</th>
              <th className="px-5 py-3.5">Última Compra</th>
              <th className="px-5 py-3.5">Previsão de Recompra</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="px-5 py-3.5 text-right">
                <span className="sr-only">Ações</span>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border-subtle/70">
            {customers.map((customer) => {
              const ChannelIcon = customer.channelIcon;
              const isLateRepurchase = customer.repurchaseDate === "em atraso";

              return (
                <tr
                  key={customer.id}
                  onClick={() => onSelect(customer)}
                  className="group cursor-pointer text-xs transition-colors duration-150 hover:bg-muted/30 active:bg-muted/50"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/20 bg-accent/10 text-[10px] font-bold text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                        {customer.initials}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-foreground transition-colors group-hover:text-accent">
                          {customer.name}
                        </p>
                        <p className="mt-0.5 truncate text-[11px] font-medium text-muted-foreground">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="whitespace-nowrap px-5 py-3.5">
                    <span className="inline-flex items-center gap-2 font-semibold text-foreground">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-border-subtle bg-background">
                        <ChannelIcon className={`h-3.5 w-3.5 ${customer.channelColor}`} />
                      </span>
                      <span>{customer.channel}</span>
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-5 py-3.5">
                    <p className="font-bold text-foreground">{customer.ltv}</p>
                    <p className="mt-0.5 text-[11px] font-medium text-muted-foreground">
                      {customer.orders} pedidos
                    </p>
                  </td>

                  <td className="whitespace-nowrap px-5 py-3.5">
                    <p className="font-semibold text-foreground">{customer.lastPurchase}</p>
                    <p className="mt-0.5 text-[11px] font-medium text-muted-foreground">
                      {customer.daysSincePurchase}
                    </p>
                  </td>

                  <td className="whitespace-nowrap px-5 py-3.5">
                    {isLateRepurchase ? (
                      <span className="inline-flex items-center rounded-md border border-warning/30 bg-warning/10 px-2 py-0.5 text-[10px] font-bold text-warning">
                        Em atraso
                      </span>
                    ) : (
                      <span className="font-semibold text-muted-foreground">
                        {customer.repurchaseDate}
                      </span>
                    )}
                  </td>

                  <td className="whitespace-nowrap px-5 py-3.5">
                    <CustomerStatusBadge status={customer.status} />
                  </td>

                  <td className="whitespace-nowrap px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1.5">
                      <a
                        href={`https://wa.me/${customer.phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(event) => event.stopPropagation()}
                        aria-label={`Iniciar conversa no WhatsApp com ${customer.name}`}
                        title="Conversar no WhatsApp"
                        className="flex h-8 w-8 items-center justify-center rounded-xl border border-transparent text-success transition-colors hover:border-success/20 hover:bg-success/10 active:scale-[0.98]"
                      >
                        <SiWhatsapp className="h-4 w-4 text-[#25D366]" />
                      </a>

                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          onSelect(customer);
                        }}
                        className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-xl border border-border-subtle bg-background px-3 text-[11px] font-semibold text-foreground transition-colors hover:border-border hover:bg-muted active:scale-[0.98]"
                      >
                        <span>Perfil 360°</span>
                        <ArrowUpRight className="h-3 w-3 text-muted-foreground transition-colors group-hover:text-foreground" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-border-subtle bg-background/40 px-5 py-3.5 text-[11px] font-semibold text-muted-foreground">
        <span>
          Mostrando <strong className="text-foreground">{customers.length}</strong> clientes
        </span>
        <span className="hidden sm:inline-block">
          Dica: clique em qualquer linha para visualizar o perfil 360° do cliente
        </span>
      </div>
    </div>
  );
}
