"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "next-themes";
import { useMounted } from "@/lib/useMounted";
import { PageHeader, SegmentedControl } from "@/components/ui/PageHeader";
import { ChartCard } from "@/components/ui/ChartCard";
import { KpiCard } from "@/components/dashboard/KpiCard";
import {
  acquisition,
  activityByPeriod,
  conversionByChannel,
  kpiByPeriod,
  retentionSeries,
  revenueByRange,
} from "@/data/metrics";
import { formatCompact, formatCurrencyBRL, formatNumberPT } from "@/lib/format";
import type { ChannelFilter, ChartRange } from "@/types";

const CHANNEL_COLORS: Record<string, string> = {
  organico: "#4f46e5",
  google: "#0ea5e9",
  instagram: "#ec4899",
  facebook: "#3b82f6",
  indicacao: "#10b981",
};

function MiniTooltip({ active, payload, label, formatter }: { active?: boolean; payload?: { value: number }[]; label?: string; formatter: (v: number) => string }): React.JSX.Element | null {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-lg border border-zinc-200 bg-white px-3 py-2 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="text-sm font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">{formatter(payload[0].value)}</p>
    </div>
  );
}

export default function AnalyticsView(): React.JSX.Element {
  const [range, setRange] = React.useState<ChartRange>("30d");
  const [channel, setChannel] = React.useState<ChannelFilter>("all");
  const { resolvedTheme } = useTheme();
  // Guarda de hidratação: paleta clara até hidratar (igual ao SSR).
  const mounted = useMounted();
  const dark = mounted && resolvedTheme === "dark";
  const grid = dark ? "#27272a" : "#f4f4f5";
  const tick = dark ? "#a1a1aa" : "#71717a";

  const revenue = revenueByRange[range];
  const filteredAcquisition = channel === "all" ? acquisition : acquisition.filter((a) => a.key === channel);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Analytics"
        subtitle="Análise detalhada de receita, aquisição e retenção."
        actions={
          <SegmentedControl<ChartRange>
            label="Período"
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
      />

      <section aria-label="Indicadores" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpiByPeriod["30d"].map((m, i) => (
          <KpiCard key={m.id} metric={m} index={i} />
        ))}
      </section>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <ChartCard title="Receita ao longo do tempo" description="Evolução comparada com despesas">
          <div className="h-[260px]" role="img" aria-label="Receita ao longo do tempo">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenue} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid stroke={grid} vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="label" tick={{ fill: tick, fontSize: 11 }} tickLine={false} axisLine={false} minTickGap={30} />
                <YAxis tick={{ fill: tick, fontSize: 11 }} tickLine={false} axisLine={false} width={56} tickFormatter={(v: number) => formatCompact(v)} />
                <Tooltip content={<MiniTooltip formatter={(v) => formatCurrencyBRL(v)} />} />
                <Line type="monotone" dataKey="receita" stroke="#4f46e5" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="despesas" stroke={dark ? "#71717a" : "#a1a1aa"} strokeDasharray="5 4" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard
          title="Usuários adquiridos"
          description="Volume por período"
          actions={
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filtrar canal">
              {(["all", "organico", "google", "instagram", "facebook", "indicacao"] as ChannelFilter[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setChannel(c)}
                  aria-pressed={channel === c}
                  className={`h-7 cursor-pointer rounded-md px-2.5 text-xs font-medium ${channel === c ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"}`}
                >
                  {c === "all" ? "Todos" : c[0].toUpperCase() + c.slice(1)}
                </button>
              ))}
            </div>
          }
        >
          <div className="h-[260px]" role="img" aria-label="Usuários adquiridos por canal">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredAcquisition} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid stroke={grid} vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fill: tick, fontSize: 11 }} tickLine={false} axisLine={false} interval={0} />
                <YAxis tick={{ fill: tick, fontSize: 11 }} tickLine={false} axisLine={false} width={48} tickFormatter={(v: number) => formatCompact(v)} />
                <Tooltip content={<MiniTooltip formatter={(v) => `${formatNumberPT(v)} usuários`} />} cursor={{ fill: dark ? "#27272a" : "#f4f4f5" }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {filteredAcquisition.map((a) => (
                    <Cell key={a.key} fill={CHANNEL_COLORS[a.key] ?? "#4f46e5"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Conversão por canal" description="Taxa de trial para pago (%)">
          <div className="h-[240px]" role="img" aria-label="Conversão por canal">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversionByChannel} layout="vertical" margin={{ top: 4, right: 12, left: 12, bottom: 0 }}>
                <CartesianGrid stroke={grid} horizontal={false} strokeDasharray="3 3" />
                <XAxis type="number" tick={{ fill: tick, fontSize: 11 }} tickLine={false} axisLine={false} domain={[0, 10]} />
                <YAxis type="category" dataKey="canal" tick={{ fill: tick, fontSize: 12 }} tickLine={false} axisLine={false} width={84} />
                <Tooltip content={<MiniTooltip formatter={(v) => `${v.toFixed(1).replace(".", ",")}%`} />} cursor={{ fill: dark ? "#27272a" : "#f4f4f5" }} />
                <Bar dataKey="taxa" fill="#4f46e5" radius={[0, 6, 6, 0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Retenção de clientes" description="Coorte dos últimos 60 dias (%)">
          <div className="h-[240px]" role="img" aria-label="Retenção de clientes">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={retentionSeries} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
                <CartesianGrid stroke={grid} vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="label" tick={{ fill: tick, fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fill: tick, fontSize: 11 }} tickLine={false} axisLine={false} width={44} domain={[50, 100]} />
                <Tooltip content={<MiniTooltip formatter={(v) => `${v}%`} />} />
                <Line type="monotone" dataKey="retencao" stroke="#10b981" strokeWidth={2} dot={{ r: 3, fill: "#10b981" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <ChartCard title="Atividade por período" description="Sessões ao longo do dia">
        <div className="h-[220px]" role="img" aria-label="Atividade por período do dia">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={activityByPeriod} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid stroke={grid} vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="periodo" tick={{ fill: tick, fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fill: tick, fontSize: 11 }} tickLine={false} axisLine={false} width={48} />
              <Tooltip content={<MiniTooltip formatter={(v) => `${formatNumberPT(v)} sessões`} />} cursor={{ fill: dark ? "#27272a" : "#f4f4f5" }} />
              <Bar dataKey="sessoes" fill="#4f46e5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
}

