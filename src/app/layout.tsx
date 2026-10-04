import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";
import { AppShell } from "@/components/layout/AppShell";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Pulseboard — Dashboard SaaS de Gestão",
    template: "%s · Pulseboard",
  },
  description:
    "Pulseboard é uma plataforma SaaS conceitual para acompanhar receita, clientes, transações e métricas de negócio em tempo real. Projeto front-end demonstrativo com dados fictícios.",
  applicationName: "Pulseboard",
  keywords: ["dashboard", "saas", "gestão", "métricas", "front-end", "next.js"],
  authors: [{ name: "Pulseboard Studio" }],
  creator: "Pulseboard Studio",
  metadataBase: new URL("https://pulseboard.app"),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: "Pulseboard — Dashboard SaaS de Gestão",
    description: "Acompanhe receita, clientes e transações em uma interface SaaS moderna.",
    siteName: "Pulseboard",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${inter.variable} ${geistMono.variable}`}>
      <body className="min-h-screen antialiased">
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
