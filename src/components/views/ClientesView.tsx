"use client";

import * as React from "react";
import { ArrowUpDown, Plus } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SearchInput } from "@/components/ui/SearchInput";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Avatar } from "@/components/ui/Avatar";
import { Pagination } from "@/components/ui/Pagination";
import { Drawer } from "@/components/ui/Drawer";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { NoResults } from "@/components/ui/EmptyState";
import { TableSkeleton, ErrorState } from "@/components/ui/Feedback";
import { clients } from "@/data/clients";
import { formatCurrencyBRL } from "@/lib/format";
import type { Client, ClientStatus } from "@/types";
import { cn } from "@/lib/utils";

type SortKey = "name" | "totalSpent" | "lastActivity";
type ViewState = "idle" | "loading" | "error";

const PAGE_SIZE = 6;

const statusOptions: { value: "all" | ClientStatus; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "ativo", label: "Ativos" },
  { value: "trial", label: "Trial" },
  { value: "inativo", label: "Inativos" },
];

export default function ClientesView(): React.JSX.Element {
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<"all" | ClientStatus>("all");
  const [sortKey, setSortKey] = React.useState<SortKey>("lastActivity");
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("desc");
  const [page, setPage] = React.useState(1);
  const [selected, setSelected] = React.useState<Client | null>(null);
  const [addOpen, setAddOpen] = React.useState(false);
  const [view, setView] = React.useState<ViewState>("loading");
  const [simulateError, setSimulateError] = React.useState(false);

  // Simula carregamento inicial realista (transição assíncrona, sem setState síncrono)
  React.useEffect(() => {
    const t = window.setTimeout(() => {
      if (simulateError) {
        setView("error");
      } else {
        setView("idle");
      }
    }, 650);
    return () => window.clearTimeout(t);
  }, [simulateError]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = clients.filter((c) => {
      const matchQ =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q);
      const matchS = status === "all" || c.status === status;
      return matchQ && matchS;
    });
    list = [...list].sort((a, b) => {
      let cmp = 0;
      if (sortKey === "name") cmp = a.name.localeCompare(b.name, "pt-BR");
      if (sortKey === "totalSpent") cmp = a.totalSpent - b.totalSpent;
      if (sortKey === "lastActivity") cmp = a.lastActivity.localeCompare(b.lastActivity);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return list;
  }, [query, status, sortKey, sortDir]);

  function handleQueryChange(value: string): void {
    setQuery(value);
    setPage(1);
  }

  function handleStatusChange(value: "all" | ClientStatus): void {
    setStatus(value);
    setPage(1);
  }

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  function toggleSort(key: SortKey): void {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "name" ? "asc" : "desc");
    }
  }

  function clearFilters(): void {
    setQuery("");
    setStatus("all");
    setPage(1);
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Clientes"
        subtitle="Gerencie os clientes da sua plataforma."
        actions={
          <Button onClick={() => setAddOpen(true)}>
            <Plus aria-hidden className="h-4 w-4" /> Adicionar cliente
          </Button>
        }
      />

      <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex flex-col gap-3 border-b border-zinc-100 p-4 sm:flex-row sm:items-center dark:border-zinc-800">
          <div className="w-full sm:max-w-xs">
            <SearchInput value={query} onChange={handleQueryChange} placeholder="Buscar por nome, empresa…" label="Buscar clientes" />
          </div>
          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filtrar por status">
            {statusOptions.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => handleStatusChange(o.value)}
                aria-pressed={status === o.value}
                className={cn(
                  "h-8 cursor-pointer rounded-lg px-3 text-[13px] font-medium transition-colors",
                  status === o.value
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                )}
              >
                {o.label}
              </button>
            ))}
          </div>
          <p aria-live="polite" className="text-xs text-zinc-500 sm:ml-auto dark:text-zinc-400">
            {filtered.length} cliente{filtered.length === 1 ? "" : "s"}
          </p>
        </div>

        {view === "loading" ? (
          <TableSkeleton rows={6} />
        ) : view === "error" ? (
          <ErrorState
            title="Erro ao carregar clientes"
            description="Não foi possível buscar a lista. Verifique sua conexão e tente novamente."
            onRetry={() => {
              setSimulateError(false);
              setView("loading");
              window.setTimeout(() => setView("idle"), 650);
            }}
          />
        ) : filtered.length === 0 ? (
          <NoResults onClear={clearFilters} />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] text-left text-sm">
                <caption className="sr-only">Lista de clientes</caption>
                <thead>
                  <tr className="border-b border-zinc-100 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                    <th scope="col" className="px-4 py-3 font-medium">
                      <button type="button" onClick={() => toggleSort("name")} className="inline-flex cursor-pointer items-center gap-1 hover:text-zinc-900 dark:hover:text-zinc-100" aria-label="Ordenar por cliente">
                        Cliente <ArrowUpDown aria-hidden className="h-3 w-3" />
                      </button>
                    </th>
                    <th scope="col" className="px-3 py-3 font-medium">Empresa</th>
                    <th scope="col" className="px-3 py-3 font-medium">Status</th>
                    <th scope="col" className="px-3 py-3 font-medium">Última atividade</th>
                    <th scope="col" className="px-3 py-3 text-right font-medium">
                      <button type="button" onClick={() => toggleSort("totalSpent")} className="inline-flex cursor-pointer items-center gap-1 hover:text-zinc-900 dark:hover:text-zinc-100" aria-label="Ordenar por valor">
                        Valor <ArrowUpDown aria-hidden className="h-3 w-3" />
                      </button>
                    </th>
                    <th scope="col" className="px-4 py-3 text-right font-medium">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {pageItems.map((c) => (
                    <tr key={c.id} className="border-b border-zinc-50 last:border-0 hover:bg-zinc-50/70 dark:border-zinc-800/60 dark:hover:bg-zinc-900">
                      <td className="px-4 py-3">
                        <button type="button" onClick={() => setSelected(c)} className="flex cursor-pointer items-center gap-2.5 text-left" aria-label={`Ver detalhes de ${c.name}`}>
                          <Avatar name={c.name} size="md" />
                          <span className="leading-tight">
                            <span className="block font-medium text-zinc-900 hover:underline dark:text-zinc-100">{c.name}</span>
                            <span className="block text-xs text-zinc-500">{c.email}</span>
                          </span>
                        </button>
                      </td>
                      <td className="px-3 py-3 text-zinc-600 dark:text-zinc-300">{c.company}</td>
                      <td className="px-3 py-3"><StatusBadge status={c.status} /></td>
                      <td className="px-3 py-3 text-[13px] text-zinc-500">{c.lastActivityLabel}</td>
                      <td className="px-3 py-3 text-right font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">
                        {formatCurrencyBRL(c.totalSpent)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button variant="ghost" size="sm" onClick={() => setSelected(c)}>
                          Detalhes
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-zinc-100 p-4 dark:border-zinc-800">
              <Pagination
                page={safePage}
                totalPages={totalPages}
                onChange={setPage}
                totalLabel={`Página ${safePage} de ${totalPages} · ${filtered.length} registros`}
              />
            </div>
          </>
        )}
      </div>

      <Drawer
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected ? selected.name : "Detalhes"}
        description={selected ? `${selected.company} · ${selected.plan}` : undefined}
      >
        {selected ? (
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <Avatar name={selected.name} size="lg" />
              <div>
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">{selected.company}</p>
                <div className="mt-1"><StatusBadge status={selected.status} /></div>
              </div>
            </div>
            <dl className="grid grid-cols-1 gap-3 text-sm">
              {[
                ["Email", selected.email],
                ["Telefone", selected.phone],
                ["Plano", selected.plan],
                ["Última atividade", selected.lastActivityLabel],
                ["Total gasto", formatCurrencyBRL(selected.totalSpent)],
                ["Transações", String(selected.transactionsCount)],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between rounded-lg bg-zinc-50 px-3 py-2.5 dark:bg-zinc-900">
                  <dt className="text-zinc-500 dark:text-zinc-400">{k}</dt>
                  <dd className="font-medium text-zinc-900 dark:text-zinc-100">{v}</dd>
                </div>
              ))}
            </dl>
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Histórico resumido</h3>
              <ul className="mt-2 space-y-2">
                {selected.history.map((h, i) => (
                  <li key={i} className="flex items-center justify-between gap-3 text-[13px]">
                    <span className="text-zinc-600 dark:text-zinc-300">{h.label}</span>
                    <span className="shrink-0 text-zinc-400">{h.date}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1">Enviar cobrança</Button>
              <Button variant="outline" className="flex-1" onClick={() => setSelected(null)}>Fechar</Button>
            </div>
          </div>
        ) : null}
      </Drawer>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Adicionar cliente" description="Cadastro fictício — nada é persistido.">
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            setAddOpen(false);
          }}
        >
          <Input label="Nome completo" placeholder="Ex.: Júlia Rocha" required autoComplete="off" />
          <Input label="Empresa" placeholder="Ex.: Litoral Games" required autoComplete="off" />
          <Input label="Email corporativo" type="email" placeholder="nome@empresa.com.br" required autoComplete="off" />
          <div className="flex gap-2 pt-1">
            <Button type="submit" className="flex-1">Salvar cliente</Button>
            <Button type="button" variant="outline" onClick={() => setAddOpen(false)} className="flex-1">Cancelar</Button>
          </div>
        </form>
      </Modal>

      {/* Atalho discreto para demonstrar estado de erro */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setSimulateError((v) => !v)}
          className="cursor-pointer text-xs text-zinc-400 underline-offset-2 hover:underline dark:text-zinc-500"
          aria-pressed={simulateError}
        >
          {simulateError ? "Desativar simulação de erro" : "Simular erro de carregamento"}
        </button>
      </div>
    </div>
  );
}

