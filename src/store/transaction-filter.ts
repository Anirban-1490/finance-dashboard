import type { ITransactionFilterProps } from "@/type";
import { create } from "zustand";

interface IFilterStoreProps {
  filter: ITransactionFilterProps | null;
  setFilter: (filter: ITransactionFilterProps | null) => void;
}
export const useTransactionFilter = create<IFilterStoreProps>((set) => ({
  filter: null,
  setFilter: (filter: ITransactionFilterProps | null) => set({ filter }),
}));
