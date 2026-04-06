import type { FinanceDashboardData } from "@/type";

export const initialFinanceData: FinanceDashboardData = {
  summary: {
    balance: {
      id: "balance",
      label: "Total Balance",
      value: 1250.0,
      currency: "USD",
      percentageChange: 1.29,
      isPositiveTrend: true,
    },
    income: {
      id: "income",
      label: "Total Income",
      value: 2150.0,
      currency: "USD",
      percentageChange: 4.5,
      isPositiveTrend: true,
    },
    savings: {
      id: "savings",
      label: "Total Savings",
      value: 450.0,
      currency: "USD",
      percentageChange: 0.85,
      isPositiveTrend: true,
    },
    expenses: {
      id: "expenses",
      label: "Total Expenses",
      value: 900.0,
      currency: "USD",
      percentageChange: 2.1,
      isPositiveTrend: false,
    },
  },

  balanceTrend: [
    { month: "Nov", balance: 400 },
    { month: "Dec", balance: 850 },
    { month: "Jan", balance: 700 },
    { month: "Feb", balance: 1000 },
    { month: "Mar", balance: 1150 },
    { month: "Apr", balance: 1250 },
  ],
  spendingBreakdown: {
    Services: {
      category: "Services",
      amount: 250.0,
      fill: "var(--color-services)",
    },
    Entertainment: {
      category: "Entertainment",
      amount: 300.0,
      fill: "var(--color-entertainment)",
    },
    Shopping: {
      category: "Shopping",
      amount: 200.0,
      fill: "var(--color-shopping)",
    },
    Vehicles: {
      category: "Vehicles",
      amount: 150.0,
      fill: "var(--color-vehicles)",
    },
    Other: { category: "Other", amount: 0.0, fill: "var(--color-other)" },
  },

  transactions: [
    {
      name: "Project Bonus",
      amount: 2000.0,
      date: "2026-02-01",
      category: "Services",
      type: "income",
      id: "1",
    },
    {
      name: "Old Equipment Sale",
      amount: 150.0,
      date: "2026-04-02",
      category: "Vehicles",
      type: "income",
      id: "2",
    },
    {
      name: "Cloud Subscription",
      amount: 250.0,
      date: "2026-03-03",
      category: "Services",
      type: "expense",
      id: "3",
    },
    {
      name: "Resident Evil 9 Purchase",
      amount: 125.0,
      date: "2026-03-14",
      category: "Entertainment",
      type: "expense",
      id: "4",
    },
    {
      name: "Theater Outing",
      amount: 175.0,
      date: "2026-02-04",
      category: "Entertainment",
      type: "expense",
      id: "5",
    },
    {
      name: "Tech Gadgets",
      amount: 200.0,
      date: "2026-04-01",
      category: "Shopping",
      type: "expense",
      id: "6",
    },
    {
      name: "Oil Change",
      amount: 150.0,
      date: "2026-01-06",
      category: "Vehicles",
      type: "expense",
      id: "7",
    },
  ],
};
