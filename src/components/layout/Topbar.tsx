"use client";

import * as React from "react";
import Link from "next/link";
import { Bell, CheckCheck, ChevronDown, Menu, PanelLeftClose, PanelLeftOpen, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import { Avatar } from "@/components/ui/Avatar";
import { Logo } from "@/components/brand/Logo";
import { appUser, notifications } from "@/data/user";
import { clients } from "@/data/clients";
import { transactions } from "@/data/transactions";
import { formatCurrencyBRL } from "@/lib/format";

const titles: Record<string, string> = {
  "/": "Dashboard",
  "/clientes": "Clientes",
  "/analytics": "Analytics",
  "/transacoes": "Transações",
  "/configuracoes": "Configurações",
};

export function Topbar({
  onMenu,
  collapsed = false,
  onToggleCollapse,
}: {
  onMenu: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}): React.JSX.Element {
  const [notifOpen, setNotifOpen] = React.useState(false);
  const [userOpen, setUserOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const q = query.trim().toLowerCase();
  const matchedClients = q ? clients.filter((c) => c.name.toLowerCase().includes(q) || c.company.toLowerCase().includes(q)).slice(0, 3) : [];
  const matchedTx = q ? transactions.filter((t) => t.id.toLowerCase().includes(q) || t.clientName.toLowerCase().includes(q)).slice(0, 3) : [];
  const showResults = focused && q.length > 0;

  const unread = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="flex h-16 items-center gap-2 px-4 sm:gap-3 sm:px-6">
        <button
          type="button"
          onClick={onMenu}
          aria-label="Abrir menu de navegação"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100 lg:hidden dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          <Menu aria-hidden className="h-5 w-5" />
        </button>

        <Link href="/" aria-label="Pulseboard — ir para o dashboard" className="rounded-lg lg:hidden">
          <Logo variant="mark" markSize={30} />
        </Link>

        {onToggleCollapse ? (
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={collapsed ? "Expandir barra lateral" : "Recolher barra lateral"}
            title={collapsed ? "Expandir barra lateral" : "Recolher barra lateral"}
            className="hidden h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 lg:flex dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            {collapsed ? (
              <PanelLeftOpen aria-hidden className="h-4 w-4" />
            ) : (
              <PanelLeftClose aria-hidden className="h-4 w-4" />
            )}
          </button>
        ) : null}

        <div className="hidden text-sm font-medium text-zinc-500 md:block dark:text-zinc-400">
          {titles[pathname] ?? "Pulseboard"}
          <span aria-hidden className="mx-2 text-zinc-300 dark:text-zinc-700">/</span>
          <span className="text-zinc-900 dark:text-zinc-100">Visão geral</span>
        </div>

        <div className="relative ml-auto w-full max-w-[200px] sm:max-w-xs">
          <div className="relative">
            <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <label htmlFor="global-search" className="sr-only">Buscar clientes ou transações</label>
            <input
              id="global-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setTimeout(() => setFocused(false), 150)}
              placeholder="Buscar…"
              autoComplete="off"
              className="h-9 w-full rounded-lg border border-zinc-200 bg-zinc-50 pr-3 pl-9 text-sm text-zinc-900 placeholder:text-zinc-400 hover:border-zinc-300 focus:border-indigo-500 focus:bg-white dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:bg-zinc-950 [&::-webkit-search-cancel-button]:hidden"
            />
          </div>
          {showResults ? (
            <div role="listbox" aria-label="Resultados da busca" className="absolute top-full right-0 left-0 z-50 mt-2 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg sm:right-auto sm:w-[340px] dark:border-zinc-800 dark:bg-zinc-900">
              {matchedClients.length === 0 && matchedTx.length === 0 ? (
                <p className="px-4 py-6 text-center text-[13px] text-zinc-500">Nenhum resultado para “{query}”.</p>
              ) : (
                <div className="max-h-[320px] overflow-y-auto p-1.5">
                  {matchedClients.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      role="option"
                      aria-selected="false"
                      onMouseDown={() => router.push("/clientes")}
                      className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      <Avatar name={c.name} size="sm" />
                      <span className="min-w-0">
                        <span className="block truncate text-[13px] font-medium text-zinc-900 dark:text-zinc-100">{c.name} · {c.company}</span>
                        <span className="block truncate text-xs text-zinc-500">Cliente — {c.email}</span>
                      </span>
                    </button>
                  ))}
                  {matchedTx.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      role="option"
                      aria-selected="false"
                      onMouseDown={() => router.push("/transacoes")}
                      className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-left hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-[13px] font-medium text-zinc-900 dark:text-zinc-100">{t.id} · {t.clientName}</span>
                        <span className="block truncate text-xs text-zinc-500">Transação — {t.dateLabel}</span>
                      </span>
                      <span className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">{formatCurrencyBRL(t.value)}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => { setNotifOpen((v) => !v); setUserOpen(false); }}
            aria-label={unread > 0 ? `Notificações, ${unread} não lidas` : "Notificações"}
            aria-haspopup="menu"
            aria-expanded={notifOpen}
            className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            <Bell aria-hidden className="h-4 w-4" />
            {unread > 0 ? (
              <span aria-hidden className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-white dark:ring-zinc-950" />
            ) : null}
          </button>
          <Dropdown open={notifOpen} onClose={() => setNotifOpen(false)} label="Notificações" className="w-[320px]">
            <div className="flex items-center justify-between px-3 py-2">
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Notificações</p>
              <span className="flex items-center gap-1 text-xs text-zinc-500"><CheckCheck aria-hidden className="h-3.5 w-3.5" /> {unread} novas</span>
            </div>
            <div className="max-h-[320px] overflow-y-auto">
              {notifications.map((n) => (
                <div key={n.id} className="flex gap-3 rounded-lg px-3 py-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-800">
                  <span aria-hidden className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.kind === "success" ? "bg-emerald-500" : n.kind === "warning" ? "bg-amber-500" : "bg-indigo-500"}`} />
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium text-zinc-900 dark:text-zinc-100">{n.title} {n.unread ? <span className="ml-1 rounded bg-indigo-50 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">NOVO</span> : null}</p>
                    <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">{n.description}</p>
                    <p className="mt-0.5 text-[11px] text-zinc-400">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Dropdown>
        </div>

        <ThemeToggle />

        <div className="relative">
          <button
            type="button"
            onClick={() => { setUserOpen((v) => !v); setNotifOpen(false); }}
            aria-haspopup="menu"
            aria-expanded={userOpen}
            aria-label="Menu do usuário"
            className="flex cursor-pointer items-center gap-1.5 rounded-lg p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <Avatar name={appUser.name} size="md" />
            <ChevronDown aria-hidden className="hidden h-4 w-4 text-zinc-400 sm:block" />
          </button>
          <Dropdown open={userOpen} onClose={() => setUserOpen(false)} label="Menu do usuário">
            <div className="px-3 py-2">
              <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">{appUser.name}</p>
              <p className="truncate text-xs text-zinc-500">{appUser.email}</p>
            </div>
            <DropdownItem onClick={() => setUserOpen(false)}>Meu perfil</DropdownItem>
            <DropdownItem onClick={() => setUserOpen(false)}>Preferências</DropdownItem>
            <DropdownItem onClick={() => setUserOpen(false)} className="text-red-600 dark:text-red-400">Sair da conta</DropdownItem>
          </Dropdown>
        </div>
      </div>
    </header>
  );
}
