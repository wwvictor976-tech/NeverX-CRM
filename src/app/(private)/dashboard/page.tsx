import { PrivateLayout } from "@/components/layout/private-layout";
import { DashboardHeader } from "./_components/dashboard-header";
import { KpiGrid } from "./_components/kpi-grid";
import { RevenueChart } from "./_components/revenue-chart";
import { ChannelsChart } from "./_components/channels-chart";
import { SalesChannelsChart } from "./_components/sales-channels";
import { RelationshipFeed } from "./_components/relationship-feed";

export default function DashboardPage() {
  return (
    <PrivateLayout
      title="Dashboard"
      subtitle="Visão geral do relacionamento com seus clientes."
    >
      <div className="space-y-8">
        {/* NÍVEL 1: Cabeçalho com ações e período selecionado */}
        <DashboardHeader />

        {/* NÍVEL 2: Métricas Rápidas / Saúde do Negócio */}
        <section className="space-y-3">
          <KpiGrid />
        </section>

        {/* NÍVEL 3: Análise Macro de Faturamento */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Desempenho Financeiro
            </h2>
          </div>
          <RevenueChart />
        </section>

        {/* NÍVEL 4: Distribuição por Canais (Vendas vs. Atendimento) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Performance por Canal
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 items-start">
            <SalesChannelsChart />
            <ChannelsChart />
          </div>
        </section>

        {/* NÍVEL 5: Operacional e Atividades Recentes */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Atividade do Funil & Relacionamento
            </h2>
          </div>
          <RelationshipFeed />
        </section>
      </div>
    </PrivateLayout>
  );
}