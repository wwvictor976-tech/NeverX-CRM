import { PrivateLayout } from "@/components/layout/private-layout";
import { ChannelsChart } from "./_components/channels-chart";
import { DashboardHeader } from "./_components/dashboard-header";
import { DashboardProvider } from "./_components/dashboard-context";
import { KpiGrid } from "./_components/kpi-grid";
import { RelationshipFeed } from "./_components/relationship-feed";
import { RevenueChart } from "./_components/revenue-chart";
import { SalesChannelsChart } from "./_components/sales-channels";

export default function DashboardPage() {
  return (
    <PrivateLayout title="Dashboard" subtitle="Visão geral da sua operação, vendas e relacionamento com clientes.">
      <DashboardProvider>
        <div className="space-y-7">
          <DashboardHeader />

          <section aria-labelledby="dashboard-health" className="space-y-3">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="page-kicker">Leitura executiva</p>
                <h2 id="dashboard-health" className="section-heading mt-1">Saúde da operação</h2>
              </div>
              <span className="hidden text-[11px] font-medium text-muted-foreground sm:block">Clientes, vendas e atendimento num só lugar</span>
            </div>
            <KpiGrid />
          </section>

          <section aria-labelledby="dashboard-revenue" className="space-y-3">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="page-kicker">Performance financeira</p>
                <h2 id="dashboard-revenue" className="section-heading mt-1">Receita e ritmo de vendas</h2>
              </div>
              <span className="hidden text-[11px] font-medium text-muted-foreground sm:block">Acompanhe o que entrou e onde a loja vende</span>
            </div>
            <RevenueChart />
          </section>

          <section aria-labelledby="dashboard-channels" className="space-y-3">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="page-kicker">Origem e resposta</p>
                <h2 id="dashboard-channels" className="section-heading mt-1">Canais que movem a operação</h2>
              </div>
              <span className="hidden text-[11px] font-medium text-muted-foreground sm:block">Venda por plataforma e atendimento por canal</span>
            </div>
            <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-2"><SalesChannelsChart /><ChannelsChart /></div>
          </section>

          <section aria-labelledby="dashboard-activity" className="space-y-3">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="page-kicker">Operação diária</p>
                <h2 id="dashboard-activity" className="section-heading mt-1">Clientes e atendimento</h2>
              </div>
              <span className="hidden text-[11px] font-medium text-muted-foreground sm:block">A próxima ação da sua equipe começa aqui</span>
            </div>
            <RelationshipFeed />
          </section>
        </div>
      </DashboardProvider>
    </PrivateLayout>
  );
}
