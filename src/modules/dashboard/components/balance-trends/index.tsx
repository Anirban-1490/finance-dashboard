import { FinanceCard } from "../common/finance-card";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { Area, AreaChart, XAxis, YAxis } from "recharts";
import { useFinanceData } from "@/store/finance-data";

const chartConfig = {
  desktop: {
    label: "Balance",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;
export function BalanceTrends() {
  const balanceTrendData = useFinanceData(
    (state) => state.data?.balanceTrend || [],
  );

  return (
    <FinanceCard cardProps={{ className: "h-fit!" }} title={"Balance Trend"}>
      <ChartContainer
        config={chartConfig}
        className="min-h-[6rem] h-[19rem] w-full"
      >
        <AreaChart accessibilityLayer data={balanceTrendData}>
          <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-desktop)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-desktop)"
              stopOpacity={0.1}
            />
          </linearGradient>
          <Area
            dataKey="balance"
            type="natural"
            fill="url(#fillDesktop)"
            stroke="var(--color-desktop)"
            stackId="a"
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickCount={3}
          />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
        </AreaChart>
      </ChartContainer>
    </FinanceCard>
  );
}
