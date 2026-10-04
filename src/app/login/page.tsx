import type { Metadata } from "next";
import LoginView from "@/components/views/LoginView";

export const metadata: Metadata = {
  title: "Entrar",
  description: "Tela de login conceitual da Pulseboard — demonstração sem autenticação real.",
};

export default function Page(): React.JSX.Element {
  return <LoginView />;
}
