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

export function updateTransaction(transaction: Transaction) {
  const data: FinanceDashboardData = JSON.parse(
    localStorage.getItem("financeData") || "{}",
  );

  const prevValue = data.transactions.find((tx) => tx.id === transaction.id);
  const prevValueIndex = data.transactions.findIndex(
    (tx) => tx.id === transaction.id,
  );
  const prevAmount = prevValue?.amount || 0;

  data.transactions[prevValueIndex] = transaction;
  data.summary[transaction.type === "income" ? "income" : "expenses"].value +=
    transaction.amount - prevAmount;

  data.summary.balance.value +=
    transaction.type === "income"
      ? transaction.amount - prevAmount
      : -transaction.amount + prevAmount;
  data.spendingBreakdown[transaction.category].amount +=
    transaction.type === "expense" ? transaction.amount - prevAmount : 0;

  localStorage.setItem("financeData", JSON.stringify(data));
  return data;
}

export function deleteTransaction(transactionId: string) {
  const data: FinanceDashboardData = JSON.parse(
    localStorage.getItem("financeData") || "{}",
  );

  // const transaction = data.transactions.find((tx) => tx.id === transactionId);
  // const transactionIndex = data.transactions.findIndex(
  //   (tx) => tx.id === transactionId,
  // );

  data.transactions = data.transactions.filter((tx) => tx.id !== transactionId);
  // data.summary[transaction.type === "income" ? "income" : "expenses"].value +=
  //   transaction.amount - prevAmount;

  // data.summary.balance.value +=
  //   transaction.type === "income"
  //     ? transaction.amount - prevAmount
  //     : -transaction.amount + prevAmount;
  // data.spendingBreakdown[transaction.category].amount +=
  //   transaction.type === "expense" ? transaction.amount - prevAmount : 0;

  // console.log(data);

  // localStorage.setItem("financeData", JSON.stringify(data));
  return data;
}
