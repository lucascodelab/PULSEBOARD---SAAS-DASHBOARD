import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound(): React.JSX.Element {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-center">
      <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">404</p>
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Página não encontrada
      </h1>
      <p className="max-w-sm text-sm text-zinc-500 dark:text-zinc-400">
        A rota acessada não existe. Volte para a visão geral para continuar acompanhando a operação.
      </p>
      <Link href="/">
        <Button className="mt-2">Voltar ao dashboard</Button>
      </Link>
    </div>
  );
}
