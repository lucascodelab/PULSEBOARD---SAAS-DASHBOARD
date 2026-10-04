import { Inbox, SearchX, type LucideIcon } from "lucide-react";
import { Button } from "./Button";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title,
  description,
  icon: Icon = Inbox,
  actionLabel,
  onAction,
}: EmptyStateProps): React.JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-14 text-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
        <Icon aria-hidden className="h-5 w-5" />
      </span>
      <div>
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</p>
        <p className="mx-auto mt-1 max-w-sm text-[13px] text-zinc-500 dark:text-zinc-400">{description}</p>
      </div>
      {actionLabel && onAction ? (
        <Button variant="outline" size="sm" onClick={onAction} className="mt-1">
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}

export function NoResults({ onClear }: { onClear: () => void }): React.JSX.Element {
  return (
    <EmptyState
      icon={SearchX}
      title="Nenhum resultado encontrado"
      description="Ajuste os filtros ou o termo de busca para encontrar o que procura."
      actionLabel="Limpar filtros"
      onAction={onClear}
    />
  );
}
