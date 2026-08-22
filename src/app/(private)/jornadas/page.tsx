import { PrivateLayout } from "@/components/layout/private-layout";
import { JourneysContent } from "./_components/journeys-content";

export default function JourneysPage() {
  return <PrivateLayout title="Jornadas" subtitle="Percursos de relacionamento ligados a segmentos e campanhas."><JourneysContent /></PrivateLayout>;
}
