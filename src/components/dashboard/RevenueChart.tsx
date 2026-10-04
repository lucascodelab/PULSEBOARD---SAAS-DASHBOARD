"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "next-themes";
import { useMounted } from "@/lib/useMounted";
import { ChartCard } from "@/components/ui/ChartCard";
import { SegmentedControl } from "@/components/ui/PageHeader";
import { revenueByRange } from "@/data/metrics";
import { formatCurrencyBRL, formatCompact } from "@/lib/format";
import type { ChartRange } from "@/types";

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number; dataKey: string }[]; label?: string }): React.JSX.Element | null {
  if (!active || !payload || payload.length === 0) return null;
  const receita = payload.find((p) => p.dataKey === "receita")?.value ?? 0;
  const despesas = payload.find((p) => p.dataKey === "despesas")?.value ?? 0;
  return (
    <div className="rounded-lg border border-zinc-200 bg-white px-3 py-2 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
      <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-zinc-900 tabular-nums dark:text-zinc-50">
        {formatCurrencyBRL(receita)}
      </p>
      <p className="text-xs text-zinc-500 tabular-nums dark:text-zinc-400">
        Despesas: {formatCurrencyBRL(despesas)}
      </p>
    </div>
  );
}

export function RevenueChart({ defaultRange = "30d" }: { defaultRange?: ChartRange }): React.JSX.Element {
  const [range, setRange] = React.useState<ChartRange>(defaultRange);
  const { resolvedTheme } = useTheme();
  // Guarda de hidratação: cores do gráfico em modo claro até hidratar,
  // idênticas ao SSR; o esquema dark só se aplica após a montagem.
  const mounted = useMounted();

  const data = revenueByRange[range];
  const dark = mounted && resolvedTheme === "dark";
  const grid = dark ? "#27272a" : "#f4f4f5";
  const tick = dark ? "#a1a1aa" : "#71717a";

  const total = data.reduce((acc, d) => acc + d.receita, 0);

  return (
    <ChartCard
      title="Receita"
      description={`Total no período: ${formatCurrencyBRL(total)}`}
      actions={
        <SegmentedControl<ChartRange>
          label="Período do gráfico de receita"
          value={range}
          onChange={setRange}
          options={[
            { value: "7d", label: "7 dias" },
            { value: "30d", label: "30 dias" },
            { value: "90d", label: "90 dias" },
            { value: "12m", label: "12 meses" },
          ]}
        />
      }
    >
      <div className="h-[280px] w-full sm:h-[320px]" role="img" aria-label={`Gráfico de receita dos últimos ${range}`}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 4, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.28} />
                <stop offset="100%" stopColor="#4f46e5" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={grid} vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="label"
              tick={{ fill: tick, fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              minTickGap={28}
            />
            <YAxis
              tick={{ fill: tick, fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              width={52}
              tickFormatter={(v: number) => formatCompact(v)}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: dark ? "#52525b" : "#d4d4d8", strokeDasharray: "4 4" }} />
            <Area
              type="monotone"
              dataKey="receita"
              name="Receita"
              stroke="#4f46e5"
              strokeWidth={2}
              fill="url(#revGradient)"
              dot={false}
              activeDot={{ r: 4, fill: "#4f46e5", strokeWidth: 2, stroke: "#fff" }}
            />
            <Area
              type="monotone"
              dataKey="despesas"
              name="Despesas"
              stroke={dark ? "#71717a" : "#a1a1aa"}
              strokeWidth={1.5}
              strokeDasharray="5 4"
              fill="transparent"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-3 flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
        <span className="flex items-center gap-1.5">
          <span aria-hidden className="h-2 w-4 rounded-full bg-indigo-600" /> Receita
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden className="h-0.5 w-4 bg-zinc-400" /> Despesas
        </span>
      </div>
    </ChartCard>
  );
}
