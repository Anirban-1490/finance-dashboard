export type FinanceCategory =
  | "Services"
  | "Entertainment"
  | "Shopping"
  | "Vehicles"
  | "Other";

export type TransactionType = "income" | "expense";

export interface SummaryItem {
  label: string;
  value: number;
  currency: string;
  percentageChange: number;
  isPositiveTrend: boolean;
  id: string;
}

export interface TrendData {
  month: string;
  balance: number;
}

export interface CategoryBreakdown {
  category: FinanceCategory;
  amount: number;
  fill: string;
}

export interface Transaction {
  name: string;
  amount: number;
  date: string;
  category: FinanceCategory;
  type: TransactionType;
  id: string;
}

type SummaryType = "balance" | "income" | "savings" | "expenses";
export interface FinanceDashboardData {
  summary: Record<SummaryType, SummaryItem>;
  balanceTrend: TrendData[];
  spendingBreakdown: Record<FinanceCategory, CategoryBreakdown>;
  transactions: Transaction[];
}

export interface ITransactionFilterProps {
  category: FinanceCategory;
  type: TransactionType;
  minAmount: number;
  maxAmount: number;
}
