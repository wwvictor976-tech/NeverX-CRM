"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { campaigns as seedCampaigns, customerProfiles as seedCustomers } from "@/lib/crm-data";
import type { CampaignRecord, CustomerProfile } from "@/lib/crm-domain";

type CrmWorkspaceContextValue = {
  customers: CustomerProfile[];
  campaigns: CampaignRecord[];
  addCustomer: (customer: CustomerProfile) => void;
  updateCustomer: (customerId: string, updater: (customer: CustomerProfile) => CustomerProfile) => void;
  removeCustomers: (customerIds: string[]) => void;
  addCampaign: (campaign: CampaignRecord) => void;
};

const CrmWorkspaceContext = createContext<CrmWorkspaceContextValue | null>(null);

function persistSession(customers: CustomerProfile[], campaigns: CampaignRecord[]) {
  try {
    window.sessionStorage.setItem("neverx.crm.customers", JSON.stringify(customers));
    window.sessionStorage.setItem("neverx.crm.campaigns", JSON.stringify(campaigns));
  } catch {
    // A sessão pode bloquear storage; o workspace continua funcional em memória.
  }
}

function readSession<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const stored = window.sessionStorage.getItem(key);
    return stored ? JSON.parse(stored) as T : fallback;
  } catch {
    return fallback;
  }
}

export function CrmWorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [customers, setCustomers] = useState<CustomerProfile[]>(() => [...seedCustomers]);
  const [campaigns, setCampaigns] = useState<CampaignRecord[]>(() => [...seedCampaigns]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setCustomers(readSession("neverx.crm.customers", seedCustomers));
      setCampaigns(readSession("neverx.crm.campaigns", seedCampaigns));
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    persistSession(customers, campaigns);
  }, [campaigns, customers, hydrated]);

  const value = useMemo<CrmWorkspaceContextValue>(() => ({
    customers,
    campaigns,
    addCustomer: (customer) => {
      const nextCustomers = [customer, ...customers];
      setCustomers(nextCustomers);
      persistSession(nextCustomers, campaigns);
    },
    updateCustomer: (customerId, updater) => {
      const nextCustomers = customers.map((customer) => customer.id === customerId ? updater(customer) : customer);
      setCustomers(nextCustomers);
      persistSession(nextCustomers, campaigns);
    },
    removeCustomers: (customerIds) => {
      const nextCustomers = customers.filter((customer) => !customerIds.includes(customer.id));
      setCustomers(nextCustomers);
      persistSession(nextCustomers, campaigns);
    },
    addCampaign: (campaign) => {
      const nextCampaigns = [campaign, ...campaigns];
      const nextCustomers = customers.map((customer) => campaign.customerIds.includes(customer.id) && !customer.campaignIds.includes(campaign.id) ? { ...customer, campaignIds: [...customer.campaignIds, campaign.id] } : customer);
      setCampaigns(nextCampaigns);
      setCustomers(nextCustomers);
      persistSession(nextCustomers, nextCampaigns);
    },
  }), [campaigns, customers]);

  return <CrmWorkspaceContext.Provider value={value}>{children}</CrmWorkspaceContext.Provider>;
}

export function useCrmWorkspace() {
  const context = useContext(CrmWorkspaceContext);
  if (!context) throw new Error("useCrmWorkspace deve ser usado dentro de CrmWorkspaceProvider");
  return context;
}
