import { ArrowUpRight, DollarSign, ShoppingCart, Sparkles, Users } from "lucide-react";
import { PrivateLayout } from "@/components/layout/private-layout";

const metrics = [
  {
    title: "Clientes",
    value: "12.480",
    change: "+8.2%",
    description: "vs. mês anterior",
    icon: Users,
  },
  {
    title: "Pedidos",
    value: "3.842",
    change: "+12.4%",
    description: "este trimestre",
    icon: ShoppingCart,
  },
  {
    title: "Novos clientes",
    value: "468",
    change: "+14.1%",
    description: "na última semana",
    icon: Sparkles,
  },
  {
    title: "Clientes recorrentes",
    value: "74%",
    change: "+3.6%",
    description: "retenção ativa",
    icon: DollarSign,
  },
];

const recentActivities = [
  { customer: "Ana Souza", product: "Kit Sabor Premium", value: "R$ 438,00", date: "18/08/2026", status: "Pago" },
  { customer: "Lucas Mendes", product: "Bebida Fitness 12x", value: "R$ 312,00", date: "17/08/2026", status: "Em separação" },
  { customer: "Marina Costa", product: "Combo Casa + Pet", value: "R$ 589,00", date: "16/08/2026", status: "Entregue" },
  { customer: "Pedro Lima", product: "Assinatura Mensal", value: "R$ 199,00", date: "14/08/2026", status: "Ativo" },
];

export default function DashboardPage() {
  return (
    <PrivateLayout
      title="Dashboard"
      subtitle="Visão geral do relacionamento com seus clientes."
    >
      <div className="space-y-6">
        <section className="card-surface p-5 sm:p-6">
          <div className="flex flex-col gap-5 rounded-2xl border border-emerald-500/15 bg-emerald-500/5 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-300">Resumo</p>
              <h1 className="mt-2 text-2xl font-semibold text-white">Dashboard</h1>
              <p className="mt-2 max-w-xl text-sm text-slate-300">
                Visão geral do relacionamento com seus clientes.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
              <ArrowUpRight className="h-4 w-4" />
              <span>+18.4% em receitas</span>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map(({ title, value, change, description, icon: Icon }) => (
            <div key={title} className="card-surface p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">{title}</p>
                  <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between text-sm">
                <span className="font-medium text-emerald-300">{change}</span>
                <span className="text-slate-400">{description}</span>
              </div>
            </div>
          ))}
        </section>

        <section className="card-surface overflow-hidden">
          <div className="border-b border-white/10 px-5 py-4">
            <h2 className="text-lg font-semibold text-white">Atividade recente</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10 text-left">
              <thead className="bg-slate-900/60">
                <tr>
                  <th className="px-5 py-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Cliente</th>
                  <th className="px-5 py-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Produto</th>
                  <th className="px-5 py-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Valor</th>
                  <th className="px-5 py-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Data</th>
                  <th className="px-5 py-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-sm text-slate-300">
                {recentActivities.map((activity) => (
                  <tr key={`${activity.customer}-${activity.product}`} className="bg-slate-950/10 hover:bg-white/5">
                    <td className="px-5 py-4 font-medium text-white">{activity.customer}</td>
                    <td className="px-5 py-4">{activity.product}</td>
                    <td className="px-5 py-4">{activity.value}</td>
                    <td className="px-5 py-4">{activity.date}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
                        {activity.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </PrivateLayout>
  );
}
