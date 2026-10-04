"use client";

import * as React from "react";
import { KeyRound, Laptop, MonitorSmartphone, ShieldCheck } from "lucide-react";
import { useTheme } from "next-themes";
import { useMounted } from "@/lib/useMounted";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Switch } from "@/components/ui/Switch";
import { Avatar } from "@/components/ui/Avatar";
import { appUser } from "@/data/user";
import { cn } from "@/lib/utils";

export default function ConfiguracoesView(): React.JSX.Element {
  const { theme, setTheme } = useTheme();
  // Guarda de hidratação: antes da montagem, `theme` não reflete a preferência
  // persistida — os radios renderizam em estado neutro (nenhum ativo), igual
  // ao SSR. O valor real só é aplicado após a hidratação.
  const mounted = useMounted();
  const [name, setName] = React.useState(appUser.name);
  const [email, setEmail] = React.useState(appUser.email);
  const [role, setRole] = React.useState(appUser.role);
  const [saved, setSaved] = React.useState(false);
  const [notifs, setNotifs] = React.useState({ email: true, alerts: true, reports: false, updates: true });
  const [twoFA, setTwoFA] = React.useState(true);
  const [toast, setToast] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2400);
    return () => window.clearTimeout(t);
  }, [toast]);

  function saveProfile(e: React.FormEvent): void {
    e.preventDefault();
    setSaved(true);
    setToast("Perfil atualizado com sucesso");
    window.setTimeout(() => setSaved(false), 2000);
  }

  const themes = [
    { value: "light", label: "Claro", hint: "Fundo branco" },
    { value: "dark", label: "Escuro", hint: "Fundo grafite" },
    { value: "system", label: "Sistema", hint: "Segue o SO" },
  ] as const;

  return (
    <div className="space-y-5">
      <PageHeader title="Configurações" subtitle="Gerencie perfil, aparência, notificações e segurança." />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card className="p-5 sm:p-6">
          <h2 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-50">Perfil</h2>
          <p className="mt-0.5 text-[13px] text-zinc-500 dark:text-zinc-400">Informações exibidas na plataforma.</p>
          <div className="mt-4 flex items-center gap-3">
            <Avatar name={name || "U"} size="lg" />
            <div>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{name}</p>
              <p className="text-xs text-zinc-500">{role}</p>
            </div>
            <Button variant="outline" size="sm" className="ml-auto" onClick={() => setToast("Avatar atualizado (demonstração)")}>
              Trocar avatar
            </Button>
          </div>
          <form onSubmit={saveProfile} className="mt-4 space-y-3">
            <Input label="Nome" value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" />
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
            <Input label="Cargo" value={role} onChange={(e) => setRole(e.target.value)} autoComplete="organization-title" />
            <Button type="submit" className="w-full sm:w-auto" aria-live="polite">
              {saved ? "Salvo!" : "Salvar alterações"}
            </Button>
          </form>
        </Card>

        <Card className="p-5 sm:p-6">
          <h2 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-50">Aparência</h2>
          <p className="mt-0.5 text-[13px] text-zinc-500 dark:text-zinc-400">Escolha como a interface é exibida.</p>
          <div className="mt-4 grid grid-cols-3 gap-2" role="radiogroup" aria-label="Tema da interface">
            {themes.map((t) => {
              // `theme === "system"` indica o botão System ativo — nunca confundir
              // com `resolvedTheme` (que é light/dark resolvido do SO).
              const active = mounted && theme === t.value;
              return (
                <button
                  key={t.value}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => {
                    setTheme(t.value);
                    setToast(`Tema ${t.label.toLowerCase()} ativado`);
                  }}
                  className={cn(
                    "cursor-pointer rounded-xl border p-3 text-left transition-colors",
                    active
                      ? "border-indigo-600 bg-indigo-50/50 dark:border-indigo-400 dark:bg-indigo-500/10"
                      : "border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
                  )}
                >
                  <span className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">{t.label}</span>
                  <span className="mt-0.5 block text-xs text-zinc-500">{t.hint}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-4 rounded-xl bg-zinc-50 p-3 text-[13px] text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">
            A preferência de tema é salva automaticamente neste navegador.
          </div>
        </Card>

        <Card className="p-5 sm:p-6">
          <h2 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-50">Notificações</h2>
          <p className="mt-0.5 text-[13px] text-zinc-500 dark:text-zinc-400">Controle o que você recebe.</p>
          <div className="mt-2 divide-y divide-zinc-100 dark:divide-zinc-800">
            <Switch checked={notifs.email} onChange={(v) => setNotifs((s) => ({ ...s, email: v }))} label="Email" description="Resumos e cobranças por email" />
            <Switch checked={notifs.alerts} onChange={(v) => setNotifs((s) => ({ ...s, alerts: v }))} label="Alertas" description="Churn, inadimplência e risco" />
            <Switch checked={notifs.reports} onChange={(v) => setNotifs((s) => ({ ...s, reports: v }))} label="Relatórios" description="Resumo semanal em PDF" />
            <Switch checked={notifs.updates} onChange={(v) => setNotifs((s) => ({ ...s, updates: v }))} label="Atualizações" description="Novidades do produto" />
          </div>
        </Card>

        <Card className="p-5 sm:p-6">
          <h2 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-50">Segurança</h2>
          <p className="mt-0.5 text-[13px] text-zinc-500 dark:text-zinc-400">Demonstração visual — sem autenticação real.</p>
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-3 rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
              <KeyRound aria-hidden className="h-4 w-4 shrink-0 text-zinc-500" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Alterar senha</p>
                <p className="text-xs text-zinc-500">Última troca há 42 dias</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setToast("Link de redefinição enviado")}>Alterar</Button>
            </div>
            <div className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <ShieldCheck aria-hidden className="h-4 w-4 text-zinc-500" />
                <p className="flex-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">Autenticação em dois fatores</p>
              </div>
              <Switch checked={twoFA} onChange={(v) => { setTwoFA(v); setToast(v ? "2FA ativado" : "2FA desativado"); }} label="Proteção extra no login" description="Código via app autenticador" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Sessões ativas</p>
              <ul className="mt-2 space-y-2">
                {[
                  { icon: MonitorSmartphone, label: "MacBook Pro · São Paulo", meta: "Atual · Chrome", current: true },
                  { icon: Laptop, label: "Windows · Escritório", meta: "há 2 dias · Edge", current: false },
                ].map((s) => (
                  <li key={s.label} className="flex items-center gap-3 rounded-xl bg-zinc-50 px-3 py-2.5 text-sm dark:bg-zinc-900">
                    <s.icon aria-hidden className="h-4 w-4 text-zinc-500" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium text-zinc-900 dark:text-zinc-100">{s.label}</span>
                      <span className="block text-xs text-zinc-500">{s.meta}</span>
                    </span>
                    {s.current ? (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">ATUAL</span>
                    ) : (
                      <button type="button" onClick={() => setToast("Sessão encerrada")} className="cursor-pointer text-xs font-medium text-red-600 hover:underline dark:text-red-400">Encerrar</button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </div>

      <div aria-live="polite" className="pointer-events-none fixed bottom-6 left-1/2 z-[80] -translate-x-1/2">
        {toast ? (
          <p className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-lg dark:bg-zinc-100 dark:text-zinc-900">{toast}</p>
        ) : null}
      </div>
    </div>
  );
}

