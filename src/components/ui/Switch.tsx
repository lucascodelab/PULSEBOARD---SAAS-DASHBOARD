"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
  id?: string;
}

export function Switch({ checked, onChange, label, description, id }: SwitchProps): React.JSX.Element {
  const generatedId = React.useId();
  const switchId = id ?? generatedId;
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <div>
        <label htmlFor={switchId} className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {label}
        </label>
        {description ? (
          <p className="mt-0.5 text-[13px] text-zinc-500 dark:text-zinc-400">{description}</p>
        ) : null}
      </div>
      <button
        id={switchId}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors",
          checked ? "bg-indigo-600 dark:bg-indigo-500" : "bg-zinc-200 dark:bg-zinc-700"
        )}
      >
        <span
          aria-hidden
          className={cn(
            "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
            checked && "translate-x-5"
          )}
        />
      </button>
    </div>
  );
}
