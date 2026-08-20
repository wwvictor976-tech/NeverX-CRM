import { CrmSettingsProvider } from "@/components/settings/crm-settings-context";

export default function PrivateRouteLayout({ children }: { children: React.ReactNode }) {
  return <CrmSettingsProvider>{children}</CrmSettingsProvider>;
}
