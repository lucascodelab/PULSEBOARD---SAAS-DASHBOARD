import type { Metadata } from "next";
import DashboardView from "@/components/views/DashboardView";

export const metadata: Metadata = {
  title: "Visão geral",
  description: "Acompanhe receita, usuários, conversão e transações da sua operação.",
};

export default function Page(): React.JSX.Element {
  return <DashboardView />;
}
