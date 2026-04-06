import { useFinanceData } from "@/store/finance-data";
import { FinanceCard } from "../common/finance-card";

import { TransactionTable } from "@/modules/transactions/components/table";

export default function Transactions() {
  const data = useFinanceData((state) => state.data?.transactions || []);
  return (
    <FinanceCard cardProps={{ className: "row-span-5" }} title={"Transactions"}>
      <div className="w-full">
        <TransactionTable data={data} />
        <a
          href="/transactions"
          className="text-sm text-primary hover:underline block mt-6"
        >
          View All Transactions
        </a>
      </div>
    </FinanceCard>
  );
}
