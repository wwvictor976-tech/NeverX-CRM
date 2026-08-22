import { CrmWorkspaceProvider } from "@/components/crm/crm-workspace-context";
import { CrmSettingsProvider } from "@/components/settings/crm-settings-context";

export default function PrivateRouteLayout({ children }: { children: React.ReactNode }) {
  return <CrmWorkspaceProvider><CrmSettingsProvider>{children}</CrmSettingsProvider></CrmWorkspaceProvider>;
}
