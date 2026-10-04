"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  CreditCard,
  LayoutDashboard,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { appUser } from "@/data/user";
import { Avatar } from "@/components/ui/Avatar";
import { Dropdown, DropdownItem } from "@/components/ui/Dropdown";
import { Logo } from "@/components/brand/Logo";
import * as React from "react";

const mainNav = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/clientes", label: "Clientes", icon: Users },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/transacoes", label: "Transações", icon: CreditCard },
];

const secondaryNav = [{ href: "/configuracoes", label: "Configurações", icon: Settings }];

function NavSection({
  title,
  items,
  onNavigate,
  collapsed = false,
}: {
  title: string;
  items: typeof mainNav;
  onNavigate?: () => void;
  collapsed?: boolean;
}): React.JSX.Element {
  const pathname = usePathname();
  return (
    <div>
      {!collapsed ? (
        <p className="px-3 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
          {title}
        </p>
      ) : (
        <span aria-hidden className="mx-auto block h-px w-8 bg-zinc-200 dark:bg-zinc-800" />
      )}
      <ul className="mt-2 space-y-0.5" role="list" aria-label={title}>
        {items.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                title={collapsed ? item.label : undefined}
                aria-label={collapsed ? item.label : undefined}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  collapsed && "justify-center px-0",
                  active
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                )}
              >
                <Icon aria-hidden className="h-4 w-4 shrink-0" />
                {!collapsed && item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function SidebarContent({
  onNavigate,
  collapsed = false,
  onToggleCollapse,
}: {
  onNavigate?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}): React.JSX.Element {
  const [userOpen, setUserOpen] = React.useState(false);
  return (
    <div className="flex h-full flex-col">
      <div className={cn("flex items-center gap-2.5 px-4 pt-5 pb-4", collapsed && "justify-center px-2")}>
        <Link
          href="/"
          onClick={onNavigate}
          aria-label="Pulseboard — ir para o dashboard"
          className="rounded-lg"
        >
          <Logo variant={collapsed ? "mark" : "full"} markSize={collapsed ? 32 : 32} />
        </Link>
        {!collapsed && onToggleCollapse ? (
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label="Recolher barra lateral"
            title="Recolher barra lateral"
            className="ml-auto hidden h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 lg:flex dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          >
            <PanelLeftClose aria-hidden className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      <nav aria-label="Navegação principal" className="flex-1 space-y-6 overflow-y-auto px-3">
        <NavSection title="Principal" items={mainNav} onNavigate={onNavigate} collapsed={collapsed} />
        <NavSection title="Sistema" items={secondaryNav} onNavigate={onNavigate} collapsed={collapsed} />
        {!collapsed ? (
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3.5 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-[13px] font-semibold text-zinc-900 dark:text-zinc-100">Uso do plano Scale</p>
            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">7.842 de 10.000 eventos</p>
            <div
              role="progressbar"
              aria-valuenow={78}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Uso do plano"
              className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800"
            >
              <div className="h-full w-[78%] rounded-full bg-indigo-600 dark:bg-indigo-400" />
            </div>
          </div>
        ) : null}
      </nav>

      {collapsed && onToggleCollapse ? (
        <div className="flex justify-center px-3 pb-2">
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label="Expandir barra lateral"
            title="Expandir barra lateral"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            <PanelLeftOpen aria-hidden className="h-4 w-4" />
          </button>
        </div>
      ) : null}

      <div className="relative border-t border-zinc-200 p-3 dark:border-zinc-800">
        <button
          type="button"
          onClick={() => setUserOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={userOpen}
          aria-label={collapsed ? `Perfil de ${appUser.name}` : undefined}
          title={collapsed ? appUser.name : undefined}
          className={cn(
            "flex w-full cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-zinc-100 dark:hover:bg-zinc-800",
            collapsed && "justify-center px-0"
          )}
        >
          <Avatar name={appUser.name} size="md" />
          {!collapsed ? (
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {appUser.name}
              </span>
              <span className="block truncate text-xs text-zinc-500 dark:text-zinc-400">{appUser.role}</span>
            </span>
          ) : null}
        </button>
        <Dropdown open={userOpen} onClose={() => setUserOpen(false)} label="Menu do perfil" className="right-3 bottom-full left-3 mb-1">
          <DropdownItem onClick={() => setUserOpen(false)}>
            <Users aria-hidden className="h-4 w-4" /> Ver perfil
          </DropdownItem>
          <DropdownItem onClick={() => setUserOpen(false)}>
            <Settings aria-hidden className="h-4 w-4" /> Configurações
          </DropdownItem>
          <DropdownItem onClick={() => setUserOpen(false)} className="text-red-600 dark:text-red-400">
            <LogOut aria-hidden className="h-4 w-4" /> Sair
          </DropdownItem>
        </Dropdown>
      </div>
    </div>
  );
}

export function Sidebar({
  mobileOpen,
  onClose,
  collapsed = false,
  onToggleCollapse,
}: {
  mobileOpen: boolean;
  onClose: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}): React.JSX.Element {
  return (
    <>
      {/* Desktop */}
      <aside
        aria-label="Barra lateral"
        className={cn(
          "sticky top-0 hidden h-screen shrink-0 border-r border-zinc-200 bg-white transition-[width] duration-200 lg:block dark:border-zinc-800 dark:bg-zinc-950",
          collapsed ? "w-[76px]" : "w-[260px]"
        )}
      >
        <SidebarContent collapsed={collapsed} onToggleCollapse={onToggleCollapse} />
      </aside>

      {/* Mobile drawer — sempre versão completa da marca */}
      <AnimatePresence>
        {mobileOpen ? (
          <div className="fixed inset-0 z-[60] lg:hidden">
            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-zinc-950/50"
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navegação"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.22, ease: "easeOut" }}
              className="absolute top-0 left-0 h-full w-[280px] border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
            >
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar menu"
                className="absolute top-4 right-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
              >
                <X aria-hidden className="h-4 w-4" />
              </button>
              <SidebarContent onNavigate={onClose} />
            </motion.aside>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
