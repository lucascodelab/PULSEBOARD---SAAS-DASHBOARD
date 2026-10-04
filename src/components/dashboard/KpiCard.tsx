"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, CircleDollarSign, Percent, Receipt, Users } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { KpiMetric } from "@/types";
import { cn } from "@/lib/utils";

const icons = {
  revenue: CircleDollarSign,
  users: Users,
  conversion: Percent,
  transactions: Receipt,
} as const;

export function KpiCard({ metric, index = 0 }: { metric: KpiMetric; index?: number }): React.JSX.Element {
  const Icon = icons[metric.icon];
  const positive = metric.trend === "up";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06, ease: "easeOut" }}
    >
      <Card className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[13px] font-medium text-zinc-500 dark:text-zinc-400">{metric.title}</p>
            <p className="mt-1.5 text-2xl font-semibold tracking-tight text-zinc-900 tabular-nums dark:text-zinc-50">
              {metric.value}
            </p>
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
            <Icon aria-hidden className="h-4 w-4" />
          </span>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums",
              positive
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                : "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
            )}
          >
            {positive ? (
              <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
            ) : (
              <ArrowDownRight aria-hidden className="h-3.5 w-3.5" />
            )}
            {positive ? "+" : ""}
            {metric.delta.toFixed(1).replace(".", ",")}%
            <span className="sr-only">{positive ? "crescimento" : "queda"}</span>
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">{metric.deltaLabel}</span>
        </div>
        <p className="mt-2 border-t border-zinc-100 pt-2 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
          {metric.context}
        </p>
      </Card>
    </motion.div>
  );
}
