import type { Metadata } from "next";
import TransacoesView from "@/components/views/TransacoesView";

export const metadata: Metadata = {
  title: "Transações",
  description: "Consulte, filtre e gerencie todas as transações da operação.",
};

export default function Page(): React.JSX.Element {
  return <TransacoesView />;
}
