import { FinanceCard } from "../common/finance-card";

import { useFinanceData } from "@/store/finance-data";

export function SummaryCards() {
  const data = useFinanceData((state) => state.data);

  return (
    <>
      {Object.entries(data?.summary || {}).map(([, card]) => {
        return (
          <FinanceCard key={card.id} title={card.label}>
            <>
              <h3 className=" font-bold">${card.value.toFixed(2)}</h3>
            </>
          </FinanceCard>
        );
      })}
    </>
  );
}
