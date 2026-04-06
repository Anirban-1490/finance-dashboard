import { FinanceCard } from "./components/common/finance-card";

import { SummaryCards } from "./components/summary-cards";
import { BalanceTrends } from "./components/balance-trends";
import SpendingBreakdown from "./components/spending-breakdown";
import dayjs from "dayjs";
import Transactions from "./components/transaction";

const upcomingPaymentsData = [
  {
    id: "pay-001",
    title: "Home Rent",
    date: "10 Feb 2020",
    iconType: "home",
  },
  {
    id: "pay-002",
    title: "Water Installment",
    date: "12 Feb 2020",
    iconType: "water",
  },
  {
    id: "pay-003",
    title: "Phone Bill",
    date: "14 Feb 2020",
    iconType: "phone",
  },
];

const nextMonth = dayjs().add(1, "month");
export function Dashboard() {
  return (
    <main className="flex-1 h-full p-8 flex flex-col gap-6 max-md:mt-[4rem] min-md:ml-[19.5rem]">
      <h1 className="text-primary">Dashboard</h1>
      <div className="grid max-md:grid-cols-1 max-xl:grid-cols-2 grid-cols-4 gap-4.5 ">
        <SummaryCards />
      </div>
      <div className="w-full grid grid-cols-2 max-xl:grid-cols-1 gap-4.5">
        <BalanceTrends />

        <SpendingBreakdown />
        <Transactions />
        <FinanceCard
          title={"Upcoming Payments"}
          description={`${nextMonth.format("MMMM YYYY")}`}
        >
          <ul className=" flex  flex-col gap-6">
            {upcomingPaymentsData.map((payment, index) => {
              return (
                <li key={index} className="flex flex-col gap-4">
                  <h5 className="font-medium">{payment.title}</h5>
                  <p className="text-sm opacity-55">
                    {nextMonth.format("DD MMM YYYY")}
                  </p>
                </li>
              );
            })}
          </ul>
        </FinanceCard>
        <FinanceCard
          cardProps={{ className: "row-span-3" }}
          title={"Transactions"}
        ></FinanceCard>
      </div>
    </main>
  );
}
