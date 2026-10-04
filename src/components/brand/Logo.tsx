import { cn } from "@/lib/utils";

type LogoTone = "brand" | "mono-dark" | "mono-light";

interface LogoMarkProps {
  size?: number;
  tone?: LogoTone;
  className?: string;
  title?: string;
}

/**
 * Símbolo original Pulseboard — "P nodal".
 *
 * Letra P geométrica com haste sólida + arco de fluxo e um ponto de dados
 * vazado no centro do arco. Disponível em brand (índigo) e nas versões
 * monocromáticas para fundos claros/escuros.
 */
export function LogoMark({ size = 32, tone = "brand", className, title = "Pulseboard" }: LogoMarkProps): React.JSX.Element {
  const palette =
    tone === "brand"
      ? { bg: "#4F46E5", fg: "#FFFFFF", cutout: "#4F46E5" }
      : tone === "mono-light"
        ? { bg: "#FFFFFF", fg: "#09090B", cutout: "#FFFFFF" }
        : { bg: "#09090B", fg: "#FFFFFF", cutout: "#09090B" };
  const { bg, fg, cutout } = palette;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      role="img"
      aria-label={title}
      className={cn("shrink-0", className)}
    >
      <rect width="32" height="32" rx="9" fill={bg} />
      {/* haste do P */}
      <rect x="10.6" y="8" width="3.4" height="16" rx="1.7" fill={fg} />
      {/* arco de fluxo do P */}
      <path
        d="M14 8h4.6a6 6 0 0 1 0 12H14"
        fill="none"
        stroke={fg}
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      {/* ponto de dados vazado */}
      <circle cx="18.6" cy="14" r="1.8" fill={cutout} />
    </svg>
  );
}

interface LogoProps {
  variant?: "full" | "mark";
  tone?: LogoTone;
  markSize?: number;
  className?: string;
  withTagline?: boolean;
}

/**
 * Lockup completo [símbolo] + [wordmark].
 * Wordmark em sans moderna, tracking refinado, sem fontes decorativas.
 */
export function Logo({
  variant = "full",
  tone = "brand",
  markSize = 32,
  className,
  withTagline = true,
}: LogoProps): React.JSX.Element {
  if (variant === "mark") {
    return <LogoMark size={markSize} tone={tone} className={className} />;
  }

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark size={markSize} tone={tone} />
      <span className="leading-none">
        <span className="block text-[15px] font-semibold tracking-[-0.02em] text-zinc-900 dark:text-zinc-50">
          Pulseboard
        </span>
        {withTagline ? (
          <span className="mt-1 block text-[10px] font-medium tracking-[0.14em] text-zinc-500 uppercase dark:text-zinc-400">
            Gestão SaaS
          </span>
        ) : null}
      </span>
    </span>
  );
}
