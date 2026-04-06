import { useFinanceData } from "@/store/finance-data";
import { FinanceCard } from "../common/finance-card";

import { TransactionTable } from "@/modules/transactions/components/table";

export default function Transactions() {
  const data = useFinanceData((state) => state.data?.transactions || []);
  return (
    <FinanceCard cardProps={{ className: "row-span-1" }} title={"Transactions"}>
      <div className="w-full h-full flex flex-col justify-between gap-4">
        <TransactionTable data={data} />
        <a
          href="/transactions"
          className="text-sm text-primary hover:underline block mt-auto"
        >
          View All Transactions
        </a>
      </div>
    </FinanceCard>
  );
}
