import type { ActivityItem } from "@/types";

export const recentActivities: ActivityItem[] = [
  {
    id: "a1",
    type: "cliente",
    title: "Novo cliente cadastrado",
    description: "Nexo Contábil assinou o plano Growth",
    time: "há 18 min",
  },
  {
    id: "a2",
    type: "pagamento",
    title: "Pagamento recebido",
    description: "Fatura #INV-8421 — Vetor Labs · R$ 4.890,00",
    time: "há 42 min",
  },
  {
    id: "a3",
    type: "plano",
    title: "Plano atualizado",
    description: "Studio Prisma migrou de Starter para Growth",
    time: "há 2 h",
  },
  {
    id: "a4",
    type: "transacao",
    title: "Nova transação realizada",
    description: "Cobrança via Pix — Lume Saúde · R$ 1.290,00",
    time: "há 5 h",
  },
  {
    id: "a5",
    type: "alerta",
    title: "Assinatura em risco",
    description: "Orbe Educação com 2 faturas em aberto",
    time: "há 8 h",
  },
  {
    id: "a6",
    type: "cliente",
    title: "Trial iniciado",
    description: "Fazenda Futuro começou teste do plano Scale",
    time: "ontem",
  },
];
