"use client";

import Link from "next/link";
import { useApp } from "@/components/AppProvider";
import { disciplinas } from "@/data/disciplinas";

export default function Matriculas() {
  const { matriculas, alunos } = useApp();

  return (
    <>
      <div className="titulo-linha">
        <h1>Matrículas</h1>
        <span className="contador laranja">{matriculas.length} matrícula(s)</span>
      </div>

      <p>
        <Link href="/matriculas/nova" className="botao laranja">
          Nova matrícula
        </Link>
      </p>

      {matriculas.length === 0 ? (
        <p>Nenhuma matrícula cadastrada.</p>
      ) : (
        <table className="tabela">
          <thead>
            <tr>
              <th>RA</th>
              <th>Aluno</th>
              <th>Disciplina</th>
            </tr>
          </thead>
          <tbody>
            {matriculas.map((matricula) => (
              <tr key={`${matricula.student_ra}-${matricula.course_id}`}>
                <td>{matricula.student_ra}</td>
                <td>
                  {alunos.find((aluno) => aluno.ra === matricula.student_ra)?.name ??
                    "Aluno não encontrado"}
                </td>
                <td>
                  {disciplinas.find(
                    (disciplina) => disciplina.id === matricula.course_id,
                  )?.name ?? "Disciplina não encontrada"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
