export type DashboardPeriod = "today" | "7d" | "30d" | "90d";
export type ChartRange = "7d" | "30d" | "90d" | "12m";
export type ChannelFilter = "all" | "organico" | "google" | "instagram" | "facebook" | "indicacao";

export type Trend = "up" | "down";

export interface KpiMetric {
  id: string;
  title: string;
  value: string;
  delta: number;
  deltaLabel: string;
  trend: Trend;
  context: string;
  icon: "revenue" | "users" | "conversion" | "transactions";
}

export type ClientStatus = "ativo" | "trial" | "inativo";
export type PlanType = "Starter" | "Growth" | "Scale" | "Enterprise";

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: ClientStatus;
  plan: PlanType;
  lastActivity: string;
  lastActivityLabel: string;
  totalSpent: number;
  transactionsCount: number;
  history: { label: string; date: string }[];
}

export type TransactionStatus = "pago" | "pendente" | "cancelado";
export type PaymentMethod = "cartao" | "pix" | "boleto" | "transferencia";

export interface Transaction {
  id: string;
  clientName: string;
  company: string;
  email: string;
  date: string;
  dateLabel: string;
  method: PaymentMethod;
  value: number;
  status: TransactionStatus;
}

export interface RevenuePoint {
  label: string;
  receita: number;
  despesas: number;
}

export interface ChannelDatum {
  name: string;
  key: Exclude<ChannelFilter, "all">;
  value: number;
  share: number;
}

export type ActivityType = "cliente" | "pagamento" | "plano" | "transacao" | "alerta";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  time: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  unread: boolean;
  kind: "info" | "success" | "warning";
}

export interface AppUser {
  name: string;
  role: string;
  email: string;
}
