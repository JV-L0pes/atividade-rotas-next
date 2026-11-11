"use client";

import Link from "next/link";
import { useApp } from "@/components/AppProvider";

export default function ListaAlunos() {
  const { alunos } = useApp();

  return (
    <>
      <div className="titulo-linha">
        <h1>Alunos</h1>
        <span className="contador">{alunos.length} aluno(s)</span>
      </div>

      {alunos.length === 0 ? (
        <p>Nenhum aluno cadastrado.</p>
      ) : (
        <ul className="lista-alunos">
          {alunos.map((aluno) => (
            <li key={aluno.ra}>
              <div>
                <strong>{aluno.name}</strong>
                <span>RA {aluno.ra}</span>
              </div>
              <Link href={`/alunos/${aluno.ra}`}>Ver detalhes</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
