"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { ChartCard } from "@/components/ui/ChartCard";
import { acquisition } from "@/data/metrics";
import { formatNumberPT } from "@/lib/format";

const COLORS = ["#4f46e5", "#0ea5e9", "#10b981", "#f59e0b", "#8b5cf6"];

function DonutTooltip({ active, payload }: { active?: boolean; payload?: { payload: { name: string; value: number; share: number } }[] }): React.JSX.Element | null {
  if (!active || !payload || payload.length === 0) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-lg border border-zinc-200 bg-white px-3 py-2 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
      <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{d.name}</p>
      <p className="text-sm font-semibold text-zinc-900 tabular-nums dark:text-zinc-50">
        {formatNumberPT(d.value)} usuários
      </p>
      <p className="text-xs text-zinc-500">{d.share.toFixed(1).replace(".", ",")}% do total</p>
    </div>
  );
}

export function AcquisitionChart(): React.JSX.Element {
  const total = acquisition.reduce((a, b) => a + b.value, 0);
  return (
    <ChartCard title="Aquisição" description={`${formatNumberPT(total)} novos usuários no período`}>
      <div className="flex flex-col items-center gap-2">
        <div className="h-[210px] w-full" role="img" aria-label="Gráfico de aquisição por canal">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<DonutTooltip />} />
              <Pie
                data={acquisition}
                dataKey="value"
                nameKey="name"
                innerRadius={62}
                outerRadius={88}
                paddingAngle={2}
                strokeWidth={0}
              >
                {acquisition.map((entry, i) => (
                  <Cell key={entry.key} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="w-full space-y-2" aria-label="Detalhamento por canal">
          {acquisition.map((c, i) => (
            <li key={c.key} className="flex items-center gap-2.5 text-[13px]">
              <span aria-hidden className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
              <span className="flex-1 text-zinc-600 dark:text-zinc-300">{c.name}</span>
              <span className="font-semibold text-zinc-900 tabular-nums dark:text-zinc-100">
                {formatNumberPT(c.value)}
              </span>
              <span className="w-12 text-right text-zinc-500 tabular-nums dark:text-zinc-400">
                {c.share.toFixed(1).replace(".", ",")}%
              </span>
            </li>
          ))}
        </ul>
      </div>
    </ChartCard>
  );
}
