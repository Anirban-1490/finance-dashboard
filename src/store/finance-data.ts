import type { FinanceDashboardData } from "@/type";
import { create } from "zustand";
interface IFinanceState {
  data: FinanceDashboardData | null;
  setData: (data: FinanceDashboardData | null) => void;
}
export const useFinanceData = create<IFinanceState>((set) => ({
  data: null,
  setData: (data: FinanceDashboardData | null) => set({ data }),
}));
