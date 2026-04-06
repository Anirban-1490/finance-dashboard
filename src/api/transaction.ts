import type { FinanceDashboardData, Transaction } from "@/type";

export function addTransaction(transaction: Transaction) {
  const data: FinanceDashboardData = JSON.parse(
    localStorage.getItem("financeData") || "{}",
  );
  data.transactions = [...data.transactions, transaction];
  data.summary[transaction.type === "income" ? "income" : "expenses"].value +=
    transaction.amount;

  data.summary.balance.value +=
    transaction.type === "income" ? transaction.amount : -transaction.amount;
  data.spendingBreakdown[transaction.category].amount +=
    transaction.type === "expense" ? transaction.amount : 0;
  localStorage.setItem("financeData", JSON.stringify(data));
  return data;
}
