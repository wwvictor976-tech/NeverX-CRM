import { PrivateLayout } from "@/components/layout/private-layout";
import { DashboardHeader } from "./_components/dashboard-header";
import { KpiGrid } from "./_components/kpi-grid";
import { RevenueChart } from "./_components/revenue-chart";
import { ChannelsChart } from "./_components/channels-chart";
import { SalesChannelsChart } from "./_components/sales-channels";
import { RelationshipFeed } from "./_components/relationship-feed";

export default function DashboardPage() {
  return (
    <PrivateLayout title="Dashboard" subtitle="Visão geral do relacionamento com seus clientes.">
      <div className="space-y-7">
        <DashboardHeader />

        <section aria-labelledby="dashboard-health" className="space-y-3">
          <div className="flex items-end justify-between gap-3"><div><p className="page-kicker">Leitura executiva</p><h2 id="dashboard-health" className="section-heading mt-1">Saúde do relacionamento</h2></div><span className="hidden text-[11px] font-medium text-muted-foreground sm:block">Visão consolidada da operação</span></div>
          <KpiGrid />
        </section>

        <section aria-labelledby="dashboard-revenue" className="space-y-3">
          <div><p className="page-kicker">Performance financeira</p><h2 id="dashboard-revenue" className="section-heading mt-1">Receita ao longo do tempo</h2></div>
          <RevenueChart />
        </section>

        <section aria-labelledby="dashboard-channels" className="space-y-3">
          <div><p className="page-kicker">Origem e resposta</p><h2 id="dashboard-channels" className="section-heading mt-1">Performance por canal</h2></div>
          <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-2"><SalesChannelsChart /><ChannelsChart /></div>
        </section>

        <section aria-labelledby="dashboard-activity" className="space-y-3">
          <div><p className="page-kicker">Operação diária</p><h2 id="dashboard-activity" className="section-heading mt-1">Atividade do relacionamento</h2></div>
          <RelationshipFeed />
        </section>
      </div>
    </PrivateLayout>
  );
}
