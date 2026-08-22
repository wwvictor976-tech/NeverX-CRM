"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import {
  getCustomDashboardDateRange,
  getDashboardDateRange,
  type DashboardDateRange,
  type DashboardPeriodKey,
} from "@/lib/crm-selectors";

type DashboardContextValue = {
  range: DashboardDateRange;
  periodKey: DashboardPeriodKey;
  customStartDate: string;
  customEndDate: string;
  isRefreshing: boolean;
  refreshVersion: number;
  lastUpdatedAt: Date | null;
  refreshMessage: string;
  applyPreset: (key: Exclude<DashboardPeriodKey, "custom">) => void;
  applyCustomRange: (startDate: string, endDate: string) => boolean;
  refresh: () => void;
};

const DashboardContext = createContext<DashboardContextValue | null>(null);
const defaultStartDate = getDashboardDateRange("30d").startDate;
const defaultEndDate = getDashboardDateRange("30d").endDate;

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [range, setRange] = useState<DashboardDateRange>(() => getDashboardDateRange("30d"));
  const [customStartDate, setCustomStartDate] = useState(defaultStartDate);
  const [customEndDate, setCustomEndDate] = useState(defaultEndDate);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshVersion, setRefreshVersion] = useState(0);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<Date | null>(null);
  const [refreshMessage, setRefreshMessage] = useState("Dados prontos para análise");

  const applyPreset = useCallback((key: Exclude<DashboardPeriodKey, "custom">) => {
    setRange(getDashboardDateRange(key));
    setRefreshMessage("Período aplicado aos dados");
  }, []);

  const applyCustomRange = useCallback((startDate: string, endDate: string) => {
    if (!startDate || !endDate || startDate > endDate) return false;
    setCustomStartDate(startDate);
    setCustomEndDate(endDate);
    setRange(getCustomDashboardDateRange(startDate, endDate));
    setRefreshMessage("Período personalizado aplicado");
    return true;
  }, []);

  const refresh = useCallback(() => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setRefreshMessage("Atualizando indicadores…");
    window.setTimeout(() => {
      setRefreshVersion((version) => version + 1);
      setLastUpdatedAt(new Date());
      setIsRefreshing(false);
      setRefreshMessage("Dados atualizados agora");
    }, 650);
  }, [isRefreshing]);

  const value = useMemo(
    () => ({
      range,
      periodKey: range.key,
      customStartDate,
      customEndDate,
      isRefreshing,
      refreshVersion,
      lastUpdatedAt,
      refreshMessage,
      applyPreset,
      applyCustomRange,
      refresh,
    }),
    [range, customStartDate, customEndDate, isRefreshing, refreshVersion, lastUpdatedAt, refreshMessage, applyPreset, applyCustomRange, refresh],
  );

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) throw new Error("useDashboard deve ser usado dentro de DashboardProvider");
  return context;
}
