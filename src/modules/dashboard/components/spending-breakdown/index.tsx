import { ChartContainer, type ChartConfig } from "@/components/ui/chart";

import { Pie, PieChart, Sector, type PieSectorShapeProps } from "recharts";
import { FinanceCard } from "../common/finance-card";
import { useFinanceData } from "@/store/finance-data";

import type { FinanceCategory } from "@/type";

const color = {
  Entertainment: "chart-1",
  Shopping: "chart-2",
  Services: "chart-3",
  Vehicles: "chart-4",
  Other: "chart-5",
};
const pieChartConfig = {
  entertainment: {
    label: "Entertainment",
    color: "var(--chart-1)",
  },
  shopping: {
    label: "Shopping",
    color: "var(--chart-2)",
  },
  services: {
    label: "Services",
    color: "var(--chart-3)",
  },
  vehicles: {
    label: "Vehicles",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export default function SpendingBreakdown() {
  const spendingBreakdown = useFinanceData(
    (state) => state.data?.spendingBreakdown,
  );
  const pieChartData = Object.values(spendingBreakdown || {}).map((item) => ({
    category: item.category,
    amount: item.amount,
    fill: item.fill,
  }));
  const sortedPieChartData = pieChartData?.sort(
    (a, b) => b.amount - a.amount,
  )?.[0]?.category;
  const ACTIVE_INDEX =
    pieChartData?.findIndex((data) => data.category === sortedPieChartData) ??
    -1;

  return (
    <FinanceCard
      cardProps={{ className: "h-full" }}
      title={"Spending Breakdown"}
    >
      {" "}
      <div className="w-full flex flex-col items-center gap-4">
        <ChartContainer
          config={pieChartConfig}
          className="w-full min-h-[10rem] h-[13rem]"
        >
          <PieChart>
            {/* <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              /> */}
            <Pie
              data={pieChartData}
              dataKey="amount"
              nameKey="category"
              innerRadius={45}
              shape={({
                index,
                outerRadius = 0,
                ...props
              }: PieSectorShapeProps) =>
                index === ACTIVE_INDEX ? (
                  <Sector {...props} outerRadius={outerRadius + 10} />
                ) : (
                  <Sector {...props} outerRadius={outerRadius} />
                )
              }
            />
          </PieChart>
        </ChartContainer>
        <div className="basis-[60%] flex gap-4 items-center justify-center flex-wrap">
          {pieChartData?.map((data) => {
            return (
              <div key={data.category} className="flex gap-4 items-center">
                <div
                  style={{
                    backgroundColor: `var(--${color[data.category as FinanceCategory]})`,
                  }}
                  className={`w-2 h-2 rounded-full `}
                ></div>
                <p className="text-sm capitalize">
                  {data.category} <span>(${data.amount.toFixed(2)})</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </FinanceCard>
  );
}
