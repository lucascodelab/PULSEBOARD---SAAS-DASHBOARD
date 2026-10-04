import { cn } from "@/lib/utils";
import type { ClientStatus, PaymentMethod, TransactionStatus } from "@/types";

type BadgeTone = "success" | "warning" | "danger" | "neutral" | "info";

const tones: Record<BadgeTone, string> = {
  success:
    "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-400/20",
  warning:
    "bg-amber-50 text-amber-700 ring-amber-600/25 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-400/20",
  danger:
    "bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-400/20",
  neutral:
    "bg-zinc-100 text-zinc-700 ring-zinc-500/20 dark:bg-zinc-500/10 dark:text-zinc-300 dark:ring-zinc-400/20",
  info: "bg-indigo-50 text-indigo-700 ring-indigo-600/20 dark:bg-indigo-500/10 dark:text-indigo-300 dark:ring-indigo-400/20",
};

const statusMap: Record<TransactionStatus | ClientStatus, { label: string; tone: BadgeTone }> = {
  pago: { label: "Pago", tone: "success" },
  pendente: { label: "Pendente", tone: "warning" },
  cancelado: { label: "Cancelado", tone: "danger" },
  ativo: { label: "Ativo", tone: "success" },
  trial: { label: "Trial", tone: "info" },
  inativo: { label: "Inativo", tone: "neutral" },
};

const methodLabels: Record<PaymentMethod, string> = {
  cartao: "Cartão",
  pix: "Pix",
  boleto: "Boleto",
  transferencia: "Transferência",
};

export function StatusBadge({
  status,
  withDot = true,
}: {
  status: TransactionStatus | ClientStatus;
  withDot?: boolean;
}): React.JSX.Element {
  const meta = statusMap[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        tones[meta.tone]
      )}
    >
      {withDot ? (
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />
      ) : null}
      {meta.label}
    </span>
  );
}

export function MethodBadge({ method }: { method: PaymentMethod }): React.JSX.Element {
  return (
    <span className="inline-flex items-center rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
      {methodLabels[method]}
    </span>
  );
}
