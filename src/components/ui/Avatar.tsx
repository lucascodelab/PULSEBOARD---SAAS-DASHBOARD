import { cn } from "@/lib/utils";
import { getInitials } from "@/lib/format";

const palette = [
  "bg-indigo-600",
  "bg-emerald-600",
  "bg-amber-600",
  "bg-sky-600",
  "bg-rose-600",
  "bg-violet-600",
];

export function Avatar({
  name,
  className,
  size = "md",
}: {
  name: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}): React.JSX.Element {
  const sizes = {
    sm: "h-7 w-7 text-[11px]",
    md: "h-9 w-9 text-xs",
    lg: "h-12 w-12 text-sm",
  };
  const hash = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const color = palette[hash % palette.length];
  return (
    <span
      aria-hidden
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-semibold text-white",
        color,
        sizes[size],
        className
      )}
    >
      {getInitials(name)}
    </span>
  );
}
