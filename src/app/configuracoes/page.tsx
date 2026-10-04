import type { Metadata } from "next";
import ConfiguracoesView from "@/components/views/ConfiguracoesView";

export const metadata: Metadata = {
  title: "Configurações",
  description: "Perfil, aparência, notificações e segurança da plataforma.",
};

export default function Page(): React.JSX.Element {
  return <ConfiguracoesView />;
}
