import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { AppHeader } from "@/components/AppHeader";
import { AppProvider } from "@/components/AppProvider";
import { Footer } from "@/components/Footer";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema Acadêmico",
  description: "Consulta e cadastro de alunos, disciplinas e matrículas.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={geist.variable}>
      <body>
        <AppProvider>
          <AppHeader />
          <main className="container">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
