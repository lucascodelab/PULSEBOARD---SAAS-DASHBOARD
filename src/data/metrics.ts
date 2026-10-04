import type { ChannelDatum, ChartRange, DashboardPeriod, KpiMetric, RevenuePoint } from "@/types";

export const kpiByPeriod: Record<DashboardPeriod, KpiMetric[]> = {
  today: [
    { id: "revenue", title: "Receita", value: "R$ 8.420,00", delta: 12.8, deltaLabel: "vs. ontem", trend: "up", context: "142 cobranças processadas hoje", icon: "revenue" },
    { id: "users", title: "Usuários ativos", value: "1.284", delta: 8.4, deltaLabel: "vs. ontem", trend: "up", context: "312 novos acessos únicos", icon: "users" },
    { id: "conversion", title: "Conversão", value: "6,42%", delta: 2.1, deltaLabel: "vs. ontem", trend: "up", context: "Trial → pago em 14 dias", icon: "conversion" },
    { id: "transactions", title: "Transações", value: "186", delta: 14.7, deltaLabel: "vs. ontem", trend: "up", context: "96% aprovadas sem fricção", icon: "transactions" },
  ],
  "7d": [
    { id: "revenue", title: "Receita", value: "R$ 48.920,00", delta: 12.8, deltaLabel: "vs. 7 dias anteriores", trend: "up", context: "412 assinaturas ativas", icon: "revenue" },
    { id: "users", title: "Usuários ativos", value: "4.812", delta: 8.4, deltaLabel: "vs. período anterior", trend: "up", context: "1.204 novos usuários", icon: "users" },
    { id: "conversion", title: "Conversão", value: "6,18%", delta: 2.1, deltaLabel: "vs. período anterior", trend: "up", context: "Checkout otimizado", icon: "conversion" },
    { id: "transactions", title: "Transações", value: "1.024", delta: 14.7, deltaLabel: "vs. período anterior", trend: "up", context: "Ticket médio R$ 47,77", icon: "transactions" },
  ],
  "30d": [
    { id: "revenue", title: "Receita", value: "R$ 128.450,00", delta: 12.8, deltaLabel: "vs. mês anterior", trend: "up", context: "MRR de R$ 96,2 mil", icon: "revenue" },
    { id: "users", title: "Usuários ativos", value: "8.429", delta: 8.4, deltaLabel: "vs. mês anterior", trend: "up", context: "Retenção de 94,2%", icon: "users" },
    { id: "conversion", title: "Conversão", value: "6,42%", delta: 2.1, deltaLabel: "vs. mês anterior", trend: "up", context: "Melhor canal: indicação", icon: "conversion" },
    { id: "transactions", title: "Transações", value: "2.846", delta: 14.7, deltaLabel: "vs. mês anterior", trend: "up", context: "Inadimplência de 2,1%", icon: "transactions" },
  ],
  "90d": [
    { id: "revenue", title: "Receita", value: "R$ 342.180,00", delta: 9.6, deltaLabel: "vs. trimestre anterior", trend: "up", context: "Crescimento consistente", icon: "revenue" },
    { id: "users", title: "Usuários ativos", value: "12.640", delta: 6.2, deltaLabel: "vs. trimestre anterior", trend: "up", context: "Expansão Enterprise", icon: "users" },
    { id: "conversion", title: "Conversão", value: "5,94%", delta: -0.4, deltaLabel: "vs. trimestre anterior", trend: "down", context: "Ajuste no onboarding", icon: "conversion" },
    { id: "transactions", title: "Transações", value: "7.912", delta: 11.3, deltaLabel: "vs. trimestre anterior", trend: "up", context: "Pix representa 38%", icon: "transactions" },
  ],
};

function buildSeries(labels: string[], base: number, variance: number): RevenuePoint[] {
  return labels.map((label, i) => {
    const wave = Math.sin(i / 2.4) * variance + (i * base * 0.012);
    const receita = Math.round(base + wave + (i % 3) * (variance * 0.4));
    return {
      label,
      receita,
      despesas: Math.round(receita * 0.42 - (i % 4) * 120)
    };
  });
}

export const revenueByRange: Record<ChartRange, RevenuePoint[]> = {
  "7d": buildSeries(["27 set", "28 set", "29 set", "30 set", "01 out", "02 out", "03 out"], 6800, 1400),
  "30d": buildSeries(
    Array.from({ length: 30 }, (_, i) => `${String((i % 30) + 4).padStart(2, "0")} set`),
    6200,
    1800
  ),
  "90d": buildSeries(
    Array.from({ length: 18 }, (_, i) => `Sem ${i + 1}`),
    24000,
    5200
  ),
  "12m": buildSeries(
    ["nov", "dez", "jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out"],
    88000,
    14000
  ),
};

export const acquisition: ChannelDatum[] = [
  { name: "Orgânico", key: "organico", value: 2840, share: 33.7 },
  { name: "Google", key: "google", value: 1920, share: 22.8 },
  { name: "Instagram", key: "instagram", value: 1410, share: 16.7 },
  { name: "Facebook", key: "facebook", value: 980, share: 11.6 },
  { name: "Indicação", key: "indicacao", value: 1279, share: 15.2 },
];

export const retentionSeries = [
  { label: "Sem 1", retencao: 100 },
  { label: "Sem 2", retencao: 86 },
  { label: "Sem 3", retencao: 78 },
  { label: "Sem 4", retencao: 74 },
  { label: "Sem 5", retencao: 71 },
  { label: "Sem 6", retencao: 69 },
  { label: "Sem 7", retencao: 67 },
  { label: "Sem 8", retencao: 66 },
];

export const conversionByChannel = [
  { canal: "Indicação", taxa: 9.4 },
  { canal: "Orgânico", taxa: 7.1 },
  { canal: "Google", taxa: 6.2 },
  { canal: "Instagram", taxa: 4.8 },
  { canal: "Facebook", taxa: 3.9 },
];

export const activityByPeriod = [
  { periodo: "00h", sessoes: 120 },
  { periodo: "04h", sessoes: 80 },
  { periodo: "08h", sessoes: 420 },
  { periodo: "12h", sessoes: 780 },
  { periodo: "16h", sessoes: 640 },
  { periodo: "20h", sessoes: 390 },
];
