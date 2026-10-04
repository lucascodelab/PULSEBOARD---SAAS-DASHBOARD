import * as React from "react";

/**
 * Guarda de montagem para componentes que consomem `useTheme()` (next-themes).
 *
 * No SSR e no primeiro render do cliente, `theme`/`resolvedTheme` ainda não
 * refletem a preferência persistida (localStorage só existe no navegador),
 * então qualquer atributo derivado deles (ex.: `aria-checked`) divergiria do
 * HTML do servidor → hydration mismatch.
 *
 * Retorna `false` no servidor e no primeiro render do cliente, e `true` após
 * a hidratação. O `setState` é adiado para um callback (nunca síncrono no
 * corpo do efeito), respeitando `react-hooks/set-state-in-effect`.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return mounted;
}
