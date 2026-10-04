import type { Metadata } from "next";
import AnalyticsView from "@/components/views/AnalyticsView";

export const metadata: Metadata = {
  title: "Analytics",
  description: "Análise de receita, aquisição, conversão, retenção e atividade.",
};

export default function Page(): React.JSX.Element {
  return <AnalyticsView />;
}
