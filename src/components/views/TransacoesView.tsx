"use client";

import * as React from "react";
import { ArrowUpDown, Download, EllipsisVertical, Eye, RotateCcw } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchInput } from "@/components/ui/SearchInput";
import { Button } from "@/components/ui/Button";
import { StatusBadge, MethodBadge } from "@/components/ui/StatusBadge";
import { Avatar } from "@/components/ui/Avatar";
import { Pagination } from "@/components/ui/Pagination";
import { Drawer } from "@/components/ui/Drawer";
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import { NoResults } from "@/components/ui/EmptyState";
import { transactions } from "@/data/transactions";
import { formatCurrencyBRL } from "@/lib/format";
import type { PaymentMethod, Transaction, TransactionStatus } from "@/types";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 8;

type SortKey = "date" | "value" | "clientName";

export default function TransacoesView(): React.JSX.Element {
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<"all" | TransactionStatus>("all");
  const [method, setMethod] = React.useState<"all" | PaymentMethod>("all");
  const [sortKey, setSortKey] = React.useState<SortKey>("date");
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("desc");
  const [page, setPage] = React.useState(1);
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());
  const [detail, setDetail] = React.useState<Transaction | null>(null);
  const [openMenuId, setOpenMenuId] = React.useState<string | null>(null);
  const [toast, setToast] = React.useState<string | null>(null);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = transactions.filter((t) => {
      const mq = !q || t.id.toLowerCase().includes(q) || t.clientName.toLowerCase().includes(q) || t.company.toLowerCase().includes(q);
      const ms = status === "all" || t.status === status;
      const mm = method === "all" || t.method === method;
      return mq && ms && mm;
    });
    return [...list].sort((a, b) => {
      let cmp = 0;
      if (sortKey === "date") cmp = a.date.localeCompare(b.date);
      if (sortKey === "value") cmp = a.value - b.value;
      if (sortKey === "clientName") cmp = a.clientName.localeCompare(b.clientName, "pt-BR");
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [query, status, method, sortKey, sortDir]);

  function handleQueryChange(value: string): void {
    setQuery(value);
    setPage(1);
  }

  function handleStatusChange(value: "all" | TransactionStatus): void {
    setStatus(value);
    setPage(1);
  }

  function handleMethodChange(value: "all" | PaymentMethod): void {
    setMethod(value);
    setPage(1);
  }

  function handleClearAll(): void {
    setQuery("");
    setStatus("all");
    setMethod("all");
    setPage(1);
  }

  React.useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2400);
    return () => window.clearTimeout(t);
  }, [toast]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const items = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const totalSelected = filtered.filter((t) => selectedIds.has(t.id)).length;
  const totalValue = filtered.reduce((a, t) => a + (t.status === "pago" ? t.value : 0), 0);
  const pageAllChecked = items.length > 0 && items.every((t) => selectedIds.has(t.id));

  function toggleSort(key: SortKey): void {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  function toggleOne(id: string): void {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function togglePage(): void {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (pageAllChecked) items.forEach((t) => next.delete(t.id));
      else items.forEach((t) => next.add(t.id));
      return next;
    });
  }


  return (
    <div className="space-y-5">
      <PageHeader
        title="Transações"
        subtitle={`${filtered.length} registros · ${formatCurrencyBRL(totalValue)} recebidos`}
        actions={
          <Button variant="outline" onClick={() => setToast(`${selectedIds.size} registro(s) exportado(s)`)}>
            <Download aria-hidden className="h-4 w-4" /> Exportar {selectedIds.size > 0 ? `(${selectedIds.size})` : ""}
          </Button>
        }
      />

      <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="space-y-3 border-b border-zinc-100 p-4 dark:border-zinc-800">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="w-full lg:max-w-xs">
              <SearchInput value={query} onChange={handleQueryChange} placeholder="Buscar por ID, cliente…" label="Buscar transações" />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <label className="sr-only" htmlFor="f-status">Status</label>
              <select
                id="f-status"
                value={status}
                onChange={(e) => handleStatusChange(e.target.value as typeof status)}
                className="h-9 cursor-pointer rounded-lg border border-zinc-200 bg-white px-2.5 text-[13px] text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200"
              >
                <option value="all">Todos os status</option>
                <option value="pago">Pago</option>
                <option value="pendente">Pendente</option>
                <option value="cancelado">Cancelado</option>
              </select>
              <label className="sr-only" htmlFor="f-method">Método</label>
              <select
                id="f-method"
                value={method}
                onChange={(e) => handleMethodChange(e.target.value as typeof method)}
                className="h-9 cursor-pointer rounded-lg border border-zinc-200 bg-white px-2.5 text-[13px] text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200"
              >
                <option value="all">Todos os métodos</option>
                <option value="cartao">Cartão</option>
                <option value="pix">Pix</option>
                <option value="boleto">Boleto</option>
                <option value="transferencia">Transferência</option>
              </select>
              {(query || status !== "all" || method !== "all") && (
                <button type="button" onClick={handleClearAll} className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg px-2.5 text-[13px] text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800">
                  <RotateCcw aria-hidden className="h-3.5 w-3.5" /> Limpar
                </button>
              )}
            </div>
            {totalSelected > 0 ? (
              <p aria-live="polite" className="text-xs font-medium text-indigo-600 lg:ml-auto dark:text-indigo-400">
                {totalSelected} selecionada(s)
              </p>
            ) : null}
          </div>
        </div>

        {filtered.length === 0 ? (
          <NoResults onClear={handleClearAll} />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] text-left text-sm">
                <caption className="sr-only">Transações</caption>
                <thead>
                  <tr className="border-b border-zinc-100 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                    <th scope="col" className="w-10 px-4 py-3">
                      <input
                        type="checkbox"
                        checked={pageAllChecked}
                        onChange={togglePage}
                        aria-label="Selecionar página atual"
                        className="h-4 w-4 cursor-pointer accent-indigo-600"
                      />
                    </th>
                    <th scope="col" className="px-2 py-3 font-medium">ID</th>
                    <th scope="col" className="px-3 py-3 font-medium">
                      <button type="button" onClick={() => toggleSort("clientName")} className="inline-flex cursor-pointer items-center gap-1 hover:text-zinc-900 dark:hover:text-zinc-100">
                        Cliente <ArrowUpDown aria-hidden className="h-3 w-3" />
                      </button>
                    </th>
                    <th scope="col" className="px-3 py-3 font-medium">
                      <button type="button" onClick={() => toggleSort("date")} className="inline-flex cursor-pointer items-center gap-1 hover:text-zinc-900 dark:hover:text-zinc-100">
                        Data <ArrowUpDown aria-hidden className="h-3 w-3" />
                      </button>
                    </th>
                    <th scope="col" className="px-3 py-3 font-medium">Método</th>
                    <th scope="col" className="px-3 py-3 text-right font-medium">
                      <button type="button" onClick={() => toggleSort("value")} className="inline-flex cursor-pointer items-center gap-1 hover:text-zinc-900 dark:hover:text-zinc-100">
                        Valor <ArrowUpDown aria-hidden className="h-3 w-3" />
                      </button>
                    </th>
                    <th scope="col" className="px-3 py-3 font-medium">Status</th>
                    <th scope="col" className="px-4 py-3 text-right font-medium"><span className="sr-only">Ações</span></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((t) => {
                    const checked = selectedIds.has(t.id);
                    return (
                      <tr key={t.id} className={cn("border-b border-zinc-50 last:border-0 hover:bg-zinc-50/70 dark:border-zinc-800/60 dark:hover:bg-zinc-900", checked && "bg-indigo-50/50 dark:bg-indigo-500/5")}>
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleOne(t.id)}
                            aria-label={`Selecionar ${t.id}`}
                            className="h-4 w-4 cursor-pointer accent-indigo-600"
                          />
                        </td>
                        <td className="px-2 py-3 font-mono text-[13px] text-zinc-600 dark:text-zinc-300">{t.id}</td>
                        <td className="px-3 py-3">
                          <div className="flex items-center gap-2.5">
                            <Avatar name={t.clientName} size="sm" />
                            <div className="leading-tight">
                              <p className="font-medium text-zinc-900 dark:text-zinc-100">{t.clientName}</p>
                              <p className="text-xs text-zinc-500">{t.company}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-[13px] text-zinc-500">{t.dateLabel}</td>
                        <td className="px-3 py-3"><MethodBadge method={t.method} /></td>
                        <td className="px-3 py-3 text-right font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">{formatCurrencyBRL(t.value)}</td>
                        <td className="px-3 py-3"><StatusBadge status={t.status} /></td>
                        <td className="relative px-4 py-3 text-right">
                          <button
                            type="button"
                            onClick={() => setOpenMenuId(openMenuId === t.id ? null : t.id)}
                            aria-label={`Ações de ${t.id}`}
                            aria-haspopup="menu"
                            aria-expanded={openMenuId === t.id}
                            className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                          >
                            <EllipsisVertical aria-hidden className="h-4 w-4" />
                          </button>
                          <Dropdown open={openMenuId === t.id} onClose={() => setOpenMenuId(null)} label={`Ações de ${t.id}`}>
                            <DropdownItem onClick={() => { setDetail(t); setOpenMenuId(null); }}>
                              <Eye aria-hidden className="h-4 w-4" /> Ver detalhes
                            </DropdownItem>
                            <DropdownItem onClick={() => { setToast(`Recibo ${t.id} enviado`); setOpenMenuId(null); }}>
                              Enviar recibo
                            </DropdownItem>
                            <DropdownItem onClick={() => { setToast(`${t.id} marcada para conciliação`); setOpenMenuId(null); }}>
                              Conciliar
                            </DropdownItem>
                          </Dropdown>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="border-t border-zinc-100 p-4 dark:border-zinc-800">
              <Pagination page={safePage} totalPages={totalPages} onChange={setPage} totalLabel={`Página ${safePage} de ${totalPages} · ${filtered.length} registros`} />
            </div>
          </>
        )}
      </div>

      <Drawer
        open={detail !== null}
        onClose={() => setDetail(null)}
        title={detail ? `Transação ${detail.id}` : "Detalhes"}
        description={detail ? `${detail.clientName} · ${detail.company}` : undefined}
      >
        {detail ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <StatusBadge status={detail.status} />
              <MethodBadge method={detail.method} />
            </div>
            <p className="text-3xl font-semibold tracking-tight tabular-nums text-zinc-900 dark:text-zinc-50">{formatCurrencyBRL(detail.value)}</p>
            <dl className="space-y-2 text-sm">
              {[
                ["Cliente", detail.clientName],
                ["Empresa", detail.company],
                ["Email", detail.email],
                ["Data", detail.dateLabel],
                ["Método", detail.method],
                ["Status", detail.status],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between rounded-lg bg-zinc-50 px-3 py-2.5 dark:bg-zinc-900">
                  <dt className="text-zinc-500 dark:text-zinc-400">{k}</dt>
                  <dd className="font-medium text-zinc-900 dark:text-zinc-100">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="flex gap-2">
              <Button className="flex-1" onClick={() => { setToast(`Recibo ${detail.id} enviado`); setDetail(null); }}>Enviar recibo</Button>
              <Button variant="outline" className="flex-1" onClick={() => setDetail(null)}>Fechar</Button>
            </div>
          </div>
        ) : null}
      </Drawer>

      <div aria-live="polite" className="pointer-events-none fixed bottom-6 left-1/2 z-[80] -translate-x-1/2">
        {toast ? (
          <p className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-lg dark:bg-zinc-100 dark:text-zinc-900">{toast}</p>
        ) : null}
      </div>
    </div>
  );
}

