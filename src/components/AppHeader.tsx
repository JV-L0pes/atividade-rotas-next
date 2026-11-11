"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const areas = [
  { area: "alunos", href: "/alunos", rotulo: "Alunos" },
  { area: "disciplinas", href: "/disciplinas", rotulo: "Disciplinas" },
  { area: "matriculas", href: "/matriculas", rotulo: "Matrículas" },
];

export function AppHeader() {
  const pathname = usePathname() ?? "";

  return (
    <header className="header">
      <Link href="/" className="brand">
        Sistema Acadêmico
      </Link>
      <nav className="menu" aria-label="Navegação principal">
        {areas.map(({ area, href, rotulo }) => {
          const ativo = pathname.startsWith(`/${area}`);
          return (
            <Link
              key={area}
              href={href}
              className={`menu-link ${area}${ativo ? " ativo" : ""}`}
              aria-current={ativo ? "page" : undefined}
            >
              {rotulo}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
