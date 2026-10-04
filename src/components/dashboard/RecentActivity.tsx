import { AlertTriangle, ArrowLeftRight, CreditCard, TrendingUp, UserPlus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { recentActivities } from "@/data/activity";
import type { ActivityType } from "@/types";

const iconByType: Record<ActivityType, typeof UserPlus> = {
  cliente: UserPlus,
  pagamento: CreditCard,
  plano: TrendingUp,
  transacao: ArrowLeftRight,
  alerta: AlertTriangle,
};

export function RecentActivity(): React.JSX.Element {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader>
        <div>
          <CardTitle>Atividade recente</CardTitle>
          <p className="mt-1 text-[13px] text-zinc-500 dark:text-zinc-400">Últimos eventos da operação</p>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="relative space-y-0" role="list">
          {recentActivities.map((a, i) => {
            const Icon = iconByType[a.type];
            const last = i === recentActivities.length - 1;
            return (
              <li key={a.id} className="relative flex gap-3 pb-5 last:pb-0">
                {!last ? (
                  <span aria-hidden className="absolute top-9 left-[17px] h-[calc(100%-28px)] w-px bg-zinc-200 dark:bg-zinc-800" />
                ) : null}
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
                  <Icon aria-hidden className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-medium text-zinc-900 dark:text-zinc-100">{a.title}</p>
                  <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">{a.description}</p>
                  <p className="mt-0.5 text-[11px] text-zinc-400 dark:text-zinc-500">{a.time}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
