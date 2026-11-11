"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AlunosSidebar() {
  const pathname = usePathname() ?? "";

  return (
    <aside className="sidebar" aria-label="Menu de alunos">
      <h2>Alunos</h2>
      <nav>
        <Link
          href="/alunos"
          className={pathname === "/alunos" ? "ativo" : undefined}
          aria-current={pathname === "/alunos" ? "page" : undefined}
        >
          Listar alunos
        </Link>
        <Link
          href="/alunos/novo"
          className={pathname === "/alunos/novo" ? "ativo" : undefined}
          aria-current={pathname === "/alunos/novo" ? "page" : undefined}
        >
          Novo aluno
        </Link>
      </nav>
    </aside>
  );
}
