import { PrivateLayout } from "@/components/layout/private-layout";
import { SettingsContent } from "./_components/settings-content";

export default function SettingsPage() {
  return (
    <PrivateLayout
      title="Configurações"
      subtitle="Defina preferências, integrações e regras operacionais do seu workspace."
    >
      <SettingsContent />
    </PrivateLayout>
  );
}
