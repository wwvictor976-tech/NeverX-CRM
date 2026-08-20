import { PrivateLayout } from "@/components/layout/private-layout";
import { CampaignsContent } from "./_components/campaigns-content";

export default function CampaignsPage() {
  return <PrivateLayout title="Campanhas" subtitle="Planeie, active e acompanhe comunicações segmentadas."><CampaignsContent /></PrivateLayout>;
}
