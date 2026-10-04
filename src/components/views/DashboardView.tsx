"use client";

import * as React from "react";
import { Download } from "lucide-react";
import { PageHeader, SegmentedControl } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { AcquisitionChart } from "@/components/dashboard/AcquisitionChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { kpiByPeriod } from "@/data/metrics";
import type { DashboardPeriod } from "@/types";

export default function DashboardView(): React.JSX.Element {
  const [period, setPeriod] = React.useState<DashboardPeriod>("30d");
  const [exported, setExported] = React.useState(false);
  const metrics = kpiByPeriod[period];

  function handleExport(): void {
    setExported(true);
    window.setTimeout(() => setExported(false), 2200);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Visão geral"
        subtitle="Acompanhe o desempenho da sua operação."
        actions={
          <>
            <SegmentedControl<DashboardPeriod>
              label="Período do dashboard"
              value={period}
              onChange={setPeriod}
              options={[
                { value: "today", label: "Hoje" },
                { value: "7d", label: "7 dias" },
                { value: "30d", label: "30 dias" },
                { value: "90d", label: "90 dias" },
              ]}
            />
            <Button variant="outline" size="md" onClick={handleExport} aria-live="polite">
              <Download aria-hidden className="h-4 w-4" />
              {exported ? "Exportado!" : "Exportar"}
            </Button>
          </>
        }
      />

      <section aria-label="Indicadores" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m, i) => (
          <KpiCard key={m.id} metric={m} index={i} />
        ))}
      </section>

      <section aria-label="Gráficos principais" className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="min-w-0 xl:col-span-2">
          <RevenueChart defaultRange="30d" />
        </div>
        <div className="min-w-0">
          <AcquisitionChart />
        </div>
      </section>

      <section aria-label="Atividade e transações" className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="min-w-0 xl:col-span-2">
          <RecentTransactions />
        </div>
        <div className="min-w-0">
          <RecentActivity />
        </div>
      </section>
    </div>
  );
}

