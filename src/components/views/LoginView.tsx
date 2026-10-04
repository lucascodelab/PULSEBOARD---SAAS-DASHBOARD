"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Logo, LogoMark } from "@/components/brand/Logo";

export default function LoginView(): React.JSX.Element {
  const router = useRouter();
  const [email, setEmail] = React.useState("marina.duarte@pulseboard.app");
  const [password, setPassword] = React.useState("pulse-demo-2026");
  const [loading, setLoading] = React.useState(false);

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    setLoading(true);
    window.setTimeout(() => router.push("/"), 700);
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-zinc-950 p-10 text-white lg:flex dark:border-r dark:border-zinc-800">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 15%, #4F46E5 0, transparent 42%), radial-gradient(circle at 85% 80%, #312E81 0, transparent 46%)",
          }}
        />
        <Link href="/" aria-label="Pulseboard — ir para o dashboard" className="relative rounded-lg dark">
          <Logo tone="brand" markSize={36} />
        </Link>
        <div className="relative">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-indigo-300 uppercase">
            Plataforma de gestão
          </p>
          <h1 className="mt-3 max-w-md text-3xl font-semibold tracking-tight text-balance">
            Dados, clientes e receita em um só fluxo.
          </h1>
          <p className="mt-3 max-w-md text-sm text-zinc-400">
            Identidade e interface conceituais. O símbolo “P nodal” representa precisão,
            conexão e crescimento — sem depender de gráficos genéricos.
          </p>
          <dl className="mt-8 grid max-w-md grid-cols-3 gap-3">
            {[
              ["R$ 128 mil", "receita / mês"],
              ["8.429", "usuários ativos"],
              ["94,2%", "retenção"],
            ].map(([value, label]) => (
              <div key={label} className="flex flex-col rounded-xl border border-white/10 bg-white/5 p-3">
                <dt className="order-2 mt-1 block text-[11px] text-zinc-400">{label}</dt>
                <dd className="order-1 text-lg font-semibold tracking-tight">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative flex items-center gap-2 text-xs text-zinc-500">
          <LogoMark size={18} />
          <span>Dados fictícios — nenhuma marca real é utilizada.</span>
        </div>
      </div>

      <div className="flex items-center justify-center px-4 py-10 sm:px-8">
        <div className="w-full max-w-sm">
          <div className="lg:hidden">
            <Logo markSize={36} />
          </div>
          <h2 className="mt-6 text-2xl font-semibold tracking-tight text-zinc-900 lg:mt-0 dark:text-zinc-50">
            Entrar na plataforma
          </h2>
          <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
            Tela conceitual — autenticação desativada para demonstração.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="relative">
              <Mail aria-hidden className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <Input
                label="Email corporativo"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="pl-9"
              />
            </div>
            <div className="relative">
              <Lock aria-hidden className="pointer-events-none absolute top-[38px] left-3 h-4 w-4 text-zinc-400" />
              <Input
                label="Senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="pl-9"
              />
            </div>
            <Button type="submit" loading={loading} className="w-full">
              {loading ? "Entrando…" : "Entrar no dashboard"}
              {!loading ? <ArrowRight aria-hidden className="h-4 w-4" /> : null}
            </Button>
          </form>

          <div className="mt-6 flex items-center justify-between text-[13px]">
            <Link href="/" className="font-medium text-indigo-600 hover:underline dark:text-indigo-400">
              Ver dashboard sem login
            </Link>
            <span className="text-zinc-400">v1.0 conceitual</span>
          </div>
        </div>
      </div>
    </div>
  );
}
