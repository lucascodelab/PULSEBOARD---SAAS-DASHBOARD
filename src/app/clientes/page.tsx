import type { Metadata } from "next";
import ClientesView from "@/components/views/ClientesView";

export const metadata: Metadata = {
  title: "Clientes",
  description: "Gerencie clientes, planos, status e histórico da sua plataforma.",
};

export default function Page(): React.JSX.Element {
  return <ClientesView />;
}
