"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { IntegrationId } from "@/lib/integration-registry";

export type WorkspaceSettings = {
  workspaceName: string;
  defaultChannel: "email" | "whatsapp" | "outro";
  timezone: string;
  currency: "BRL" | "USD" | "EUR";
  orderAutoSync: boolean;
  customerMerge: boolean;
  slaAlerts: boolean;
  weeklyDigest: boolean;
  everEnabled: boolean;
};

type CrmSettingsContextValue = {
  settings: WorkspaceSettings;
  connectedIntegrations: IntegrationId[];
  isIntegrationConnected: (id: IntegrationId) => boolean;
  setIntegrationConnected: (id: IntegrationId, connected: boolean) => void;
  updateSettings: (patch: Partial<WorkspaceSettings>) => void;
  resetSettings: () => void;
};

const defaultSettings: WorkspaceSettings = {
  workspaceName: "NeverX Store",
  defaultChannel: "whatsapp",
  timezone: "America/Sao_Paulo",
  currency: "BRL",
  orderAutoSync: true,
  customerMerge: true,
  slaAlerts: true,
  weeklyDigest: false,
  everEnabled: true,
};

const defaultConnectedIntegrations: IntegrationId[] = ["nuvemshop", "mercadolivre", "whatsapp", "email"];
const CrmSettingsContext = createContext<CrmSettingsContextValue | null>(null);

export function CrmSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<WorkspaceSettings>(defaultSettings);
  const [connectedIntegrations, setConnectedIntegrations] = useState<IntegrationId[]>(defaultConnectedIntegrations);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const storedSettings = window.sessionStorage.getItem("neverx.crm.settings");
        const storedIntegrations = window.sessionStorage.getItem("neverx.crm.integrations");
        if (storedSettings) setSettings({ ...defaultSettings, ...JSON.parse(storedSettings) as Partial<WorkspaceSettings> });
        if (storedIntegrations) setConnectedIntegrations(JSON.parse(storedIntegrations) as IntegrationId[]);
      } catch {
        // O workspace continua funcional em memória quando o storage não está disponível.
      }
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.sessionStorage.setItem("neverx.crm.settings", JSON.stringify(settings));
      window.sessionStorage.setItem("neverx.crm.integrations", JSON.stringify(connectedIntegrations));
    } catch {
      // A persistência é uma melhoria de sessão, não uma dependência da interface.
    }
  }, [connectedIntegrations, hydrated, settings]);

  const value = useMemo<CrmSettingsContextValue>(() => ({
    settings,
    connectedIntegrations,
    isIntegrationConnected: (id) => connectedIntegrations.includes(id),
    setIntegrationConnected: (id, connected) => setConnectedIntegrations((current) => connected ? Array.from(new Set([...current, id])) : current.filter((item) => item !== id)),
    updateSettings: (patch) => setSettings((current) => ({ ...current, ...patch })),
    resetSettings: () => { setSettings(defaultSettings); setConnectedIntegrations(defaultConnectedIntegrations); },
  }), [connectedIntegrations, settings]);

  return <CrmSettingsContext.Provider value={value}>{children}</CrmSettingsContext.Provider>;
}

export function useCrmSettings() {
  const context = useContext(CrmSettingsContext);
  if (!context) throw new Error("useCrmSettings deve ser usado dentro de CrmSettingsProvider");
  return context;
}
