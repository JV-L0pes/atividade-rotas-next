import type { ReactNode } from "react";
import { AlunosSidebar } from "@/components/AlunosSidebar";

export default function AlunosLayout({ children }: { children: ReactNode }) {
  return (
    <div className="area-alunos">
      <AlunosSidebar />
      <section className="conteudo">{children}</section>
    </div>
  );
}
