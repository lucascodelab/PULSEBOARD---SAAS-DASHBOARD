import type { AppUser, NotificationItem } from "@/types";

export const appUser: AppUser = {
  name: "Marina Duarte",
  role: "Product Manager",
  email: "marina.duarte@pulseboard.app",
};

export const notifications: NotificationItem[] = [
  {
    id: "n1",
    title: "Pagamento recebido",
    description: "Assinatura Scale da Vetor Labs — R$ 4.890,00",
    time: "há 12 min",
    unread: true,
    kind: "success",
  },
  {
    id: "n2",
    title: "Novo cliente em trial",
    description: "Studio Prisma iniciou teste de 14 dias no plano Growth",
    time: "há 48 min",
    unread: true,
    kind: "info",
  },
  {
    id: "n3",
    title: "Taxa de churn em alerta",
    description: "Segmento Starter subiu 0,8 p.p. nos últimos 7 dias",
    time: "há 3 h",
    unread: false,
    kind: "warning",
  },
  {
    id: "n4",
    title: "Relatório mensal pronto",
    description: "Resumo de setembro já está disponível para exportação",
    time: "ontem",
    unread: false,
    kind: "info",
  },
];
