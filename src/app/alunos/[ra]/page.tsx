"use client";

import Link from "next/link";
import { use } from "react";
import { useApp } from "@/components/AppProvider";

export default function DetalhesAluno({
  params,
}: {
  params: Promise<{ ra: string }>;
}) {
  const { ra } = use(params);
  const { alunos } = useApp();
  const aluno = alunos.find((item) => item.ra === Number(ra));

  if (!aluno) {
    return (
      <>
        <h1>Aluno não encontrado</h1>
        <p>Nenhum aluno cadastrado com o RA {ra}.</p>
        <Link href="/alunos" className="botao">
          Voltar para a lista de alunos
        </Link>
      </>
    );
  }

  return (
    <>
      <h1>Detalhes do aluno</h1>
      <dl className="detalhes">
        <dt>RA</dt>
        <dd>{aluno.ra}</dd>
        <dt>Nome completo</dt>
        <dd>{aluno.name}</dd>
      </dl>
      <Link href="/alunos" className="botao">
        Voltar para a lista de alunos
      </Link>
    </>
  );
}
