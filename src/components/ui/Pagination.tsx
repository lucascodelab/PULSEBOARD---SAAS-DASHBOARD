"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  totalLabel?: string;
}

export function Pagination({ page, totalPages, onChange, totalLabel }: PaginationProps): React.JSX.Element {
  if (totalPages <= 1) return <div className="py-1 text-xs text-zinc-500 dark:text-zinc-400">{totalLabel}</div>;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).slice(
    Math.max(0, Math.min(page - 2, totalPages - 5)),
    Math.max(5, Math.min(page + 3, totalPages))
  );
  return (
    <nav aria-label="Paginação" className="flex flex-wrap items-center justify-between gap-3">
      {totalLabel ? <p className="text-xs text-zinc-500 dark:text-zinc-400">{totalLabel}</p> : <span />}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onChange(Math.max(1, page - 1))}
          disabled={page === 1}
          aria-label="Página anterior"
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50 disabled:opacity-40 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          <ChevronLeft aria-hidden className="h-4 w-4" />
        </button>
        {pages.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            aria-label={`Ir para página ${p}`}
            aria-current={p === page ? "page" : undefined}
            className={cn(
              "h-8 min-w-8 cursor-pointer rounded-lg px-2 text-[13px] font-medium",
              p === page
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            )}
          >
            {p}
          </button>
        ))}
        <button
          type="button"
          onClick={() => onChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          aria-label="Próxima página"
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-50 disabled:opacity-40 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          <ChevronRight aria-hidden className="h-4 w-4" />
        </button>
      </div>
    </nav>
  );
}
