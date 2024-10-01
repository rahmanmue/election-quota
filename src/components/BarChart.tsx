import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A bar chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface BarChartProps {
  vote: any;
  tahun?: string | number;
  dapil?: string;
  provinsi?: string;
}

export function ComponentBarChart({ vote }: BarChartProps) {
  const [chartData, setCData] = useState([]);
  useEffect(() => {
    // console.log(vote);
    const nD: any = vote
      ?.map((item: any) => ({
        parpol: item.namaParpol,
        pKursi: item.perolehanKursi,
      }))
      .filter((item: any) => item.pKursi != 0);
    setCData(nD);
    // console.log(nD);
  }, [vote]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Perolehan Alokasi Kursi DPR/DPRD Partai Politik</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="parpol"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="browser" />}
            />
            <Bar
              dataKey="pKursi"
              name={"Kuota"}
              fill="var(--color-desktop)"
              radius={8}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Kuota Perolehan Kursi Partai Politik
        </div>
        <div className="leading-none text-muted-foreground">
          Menampilkan perolehan kursi setiap partai politik berdasarkan daerah
          pemilihan.
        </div>
      </CardFooter>
    </Card>
  );
}
