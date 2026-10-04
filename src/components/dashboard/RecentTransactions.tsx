import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { StatusBadge, MethodBadge } from "@/components/ui/StatusBadge";
import { Avatar } from "@/components/ui/Avatar";
import { recentTransactions } from "@/data/transactions";
import { formatCurrencyBRL } from "@/lib/format";

export function RecentTransactions(): React.JSX.Element {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Transações recentes</CardTitle>
          <p className="mt-1 text-[13px] text-zinc-500 dark:text-zinc-400">Últimas cobranças processadas</p>
        </div>
        <Link
          href="/transacoes"
          className="inline-flex shrink-0 items-center gap-1 rounded-lg px-2 py-1 text-[13px] font-medium text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-500/10"
        >
          Ver todas <ArrowRight aria-hidden className="h-3.5 w-3.5" />
        </Link>
      </CardHeader>
      <CardContent className="px-0 pt-2 pb-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <caption className="sr-only">Transações recentes</caption>
            <thead>
              <tr className="border-y border-zinc-100 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                <th scope="col" className="px-5 py-2.5 font-medium">Cliente</th>
                <th scope="col" className="px-3 py-2.5 font-medium">Status</th>
                <th scope="col" className="px-3 py-2.5 font-medium">Método</th>
                <th scope="col" className="px-3 py-2.5 text-right font-medium">Valor</th>
                <th scope="col" className="px-5 py-2.5 text-right font-medium">Data</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((t) => (
                <tr key={t.id} className="border-b border-zinc-50 last:border-0 hover:bg-zinc-50/70 dark:border-zinc-800/60 dark:hover:bg-zinc-900">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={t.clientName} size="sm" />
                      <div className="leading-tight">
                        <p className="font-medium text-zinc-900 dark:text-zinc-100">{t.clientName}</p>
                        <p className="text-xs text-zinc-500">{t.company}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3"><StatusBadge status={t.status} /></td>
                  <td className="px-3 py-3"><MethodBadge method={t.method} /></td>
                  <td className="px-3 py-3 text-right font-semibold text-zinc-900 tabular-nums dark:text-zinc-100">
                    {formatCurrencyBRL(t.value)}
                  </td>
                  <td className="px-5 py-3 text-right text-[13px] text-zinc-500">{t.dateLabel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
