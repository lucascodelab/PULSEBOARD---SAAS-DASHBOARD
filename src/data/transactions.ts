import type { Transaction } from "@/types";

export const transactions: Transaction[] = [
  { id: "INV-8421", clientName: "Rafael Monteiro", company: "Vetor Labs", email: "rafael@vetorlabs.com.br", date: "2026-10-03T10:12:00", dateLabel: "03 out 2026", method: "cartao", value: 4890, status: "pago" },
  { id: "INV-8420", clientName: "Beatriz Lemos", company: "Lume Saúde", email: "beatriz@lumesaude.com.br", date: "2026-10-03T09:05:00", dateLabel: "03 out 2026", method: "pix", value: 1290, status: "pago" },
  { id: "INV-8419", clientName: "Camila Ferraz", company: "Studio Prisma", email: "camila@studioprisma.com.br", date: "2026-10-02T16:40:00", dateLabel: "02 out 2026", method: "boleto", value: 2490, status: "pendente" },
  { id: "INV-8418", clientName: "Gustavo Nogueira", company: "Atlas Log", email: "gustavo@atlaslog.com.br", date: "2026-10-02T11:22:00", dateLabel: "02 out 2026", method: "transferencia", value: 12900, status: "pago" },
  { id: "INV-8417", clientName: "Thiago Alvarenga", company: "Orbe Educação", email: "thiago@orbeeducacao.com.br", date: "2026-10-01T15:00:00", dateLabel: "01 out 2026", method: "boleto", value: 890, status: "pendente" },
  { id: "INV-8416", clientName: "Aline Vasques", company: "Nimbo Tech", email: "aline@nimbo.tech", date: "2026-10-01T09:18:00", dateLabel: "01 out 2026", method: "cartao", value: 3890, status: "pago" },
  { id: "INV-8415", clientName: "Paulo Henriques", company: "Kubo Engenharia", email: "paulo@kuboeng.com.br", date: "2026-09-30T17:02:00", dateLabel: "30 set 2026", method: "cartao", value: 1990, status: "cancelado" },
  { id: "INV-8414", clientName: "Sofia Mendes", company: "Clínica Vitta", email: "sofia@clinicavitta.com.br", date: "2026-09-30T13:45:00", dateLabel: "30 set 2026", method: "pix", value: 1790, status: "pago" },
  { id: "INV-8413", clientName: "Fernanda Sales", company: "Aurora Moda", email: "fernanda@auroramoda.com.br", date: "2026-09-29T10:20:00", dateLabel: "29 set 2026", method: "cartao", value: 690, status: "pago" },
  { id: "INV-8412", clientName: "Bruno Cardoso", company: "Ponto Alto", email: "bruno@pontoalto.com.br", date: "2026-09-28T14:11:00", dateLabel: "28 set 2026", method: "pix", value: 890, status: "pago" },
  { id: "INV-8411", clientName: "Thiago Alvarenga", company: "Orbe Educação", email: "thiago@orbeeducacao.com.br", date: "2026-09-27T09:00:00", dateLabel: "27 set 2026", method: "boleto", value: 890, status: "cancelado" },
  { id: "INV-8410", clientName: "Gustavo Nogueira", company: "Atlas Log", email: "gustavo@atlaslog.com.br", date: "2026-09-26T18:30:00", dateLabel: "26 set 2026", method: "transferencia", value: 12900, status: "pago" },
  { id: "INV-8409", clientName: "Camila Ferraz", company: "Studio Prisma", email: "camila@studioprisma.com.br", date: "2026-09-25T12:00:00", dateLabel: "25 set 2026", method: "cartao", value: 2490, status: "pago" },
  { id: "INV-8408", clientName: "Beatriz Lemos", company: "Lume Saúde", email: "beatriz@lumesaude.com.br", date: "2026-09-24T08:44:00", dateLabel: "24 set 2026", method: "pix", value: 1290, status: "pago" },
  { id: "INV-8407", clientName: "Fernanda Sales", company: "Aurora Moda", email: "fernanda@auroramoda.com.br", date: "2026-09-22T16:10:00", dateLabel: "22 set 2026", method: "boleto", value: 690, status: "pendente" },
  { id: "INV-8406", clientName: "Sofia Mendes", company: "Clínica Vitta", email: "sofia@clinicavitta.com.br", date: "2026-09-20T11:30:00", dateLabel: "20 set 2026", method: "cartao", value: 1790, status: "pago" },
  { id: "INV-8405", clientName: "Aline Vasques", company: "Nimbo Tech", email: "aline@nimbo.tech", date: "2026-09-18T09:12:00", dateLabel: "18 set 2026", method: "pix", value: 3890, status: "pago" },
  { id: "INV-8404", clientName: "Rafael Monteiro", company: "Vetor Labs", email: "rafael@vetorlabs.com.br", date: "2026-09-15T10:00:00", dateLabel: "15 set 2026", method: "cartao", value: 4890, status: "pago" },
  { id: "INV-8403", clientName: "Paulo Henriques", company: "Kubo Engenharia", email: "paulo@kuboeng.com.br", date: "2026-09-12T14:00:00", dateLabel: "12 set 2026", method: "boleto", value: 1990, status: "pendente" },
  { id: "INV-8402", clientName: "Bruno Cardoso", company: "Ponto Alto", email: "bruno@pontoalto.com.br", date: "2026-09-10T08:00:00", dateLabel: "10 set 2026", method: "pix", value: 890, status: "pago" },
  { id: "INV-8401", clientName: "Elisa Tavares", company: "Tátil Design", email: "elisa@tatil.design", date: "2026-09-05T12:00:00", dateLabel: "05 set 2026", method: "cartao", value: 590, status: "cancelado" },
  { id: "INV-8400", clientName: "Gustavo Nogueira", company: "Atlas Log", email: "gustavo@atlaslog.com.br", date: "2026-08-30T10:00:00", dateLabel: "30 ago 2026", method: "transferencia", value: 12900, status: "pago" },
  { id: "INV-8399", clientName: "Beatriz Lemos", company: "Lume Saúde", email: "beatriz@lumesaude.com.br", date: "2026-08-28T09:00:00", dateLabel: "28 ago 2026", method: "cartao", value: 1290, status: "pago" },
  { id: "INV-8398", clientName: "Sofia Mendes", company: "Clínica Vitta", email: "sofia@clinicavitta.com.br", date: "2026-08-25T15:00:00", dateLabel: "25 ago 2026", method: "pix", value: 1790, status: "pago" },
];

export const recentTransactions = transactions.slice(0, 6);
