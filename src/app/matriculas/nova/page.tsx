"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useApp } from "@/components/AppProvider";
import { disciplinas } from "@/data/disciplinas";

export default function NovaMatricula() {
  const router = useRouter();
  const { alunos, cadastrarMatricula } = useApp();
  const [ra, setRa] = useState("");
  const [disciplinaId, setDisciplinaId] = useState("");
  const [erro, setErro] = useState<string | null>(null);

  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    if (!ra || !disciplinaId) {
      setErro("Selecione o aluno e a disciplina.");
      return;
    }

    const resultado = cadastrarMatricula({
      student_ra: Number(ra),
      course_id: Number(disciplinaId),
    });

    if (!resultado.ok) {
      setErro(resultado.erro);
      return;
    }

    router.push("/matriculas");
  }

  return (
    <>
      <h1>Nova matrícula</h1>
      <form className="formulario" onSubmit={enviar}>
        <label>
          Aluno
          <select
            value={ra}
            onChange={(evento) => setRa(evento.target.value)}
            required
          >
            <option value="">Selecione um aluno</option>
            {alunos.map((aluno) => (
              <option key={aluno.ra} value={aluno.ra}>
                {aluno.ra} — {aluno.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Disciplina
          <select
            value={disciplinaId}
            onChange={(evento) => setDisciplinaId(evento.target.value)}
            required
          >
            <option value="">Selecione uma disciplina</option>
            {disciplinas.map((disciplina) => (
              <option key={disciplina.id} value={disciplina.id}>
                {disciplina.id} — {disciplina.name}
              </option>
            ))}
          </select>
        </label>

        {erro && <p className="erro">{erro}</p>}

        <div className="acoes">
          <button type="submit" className="botao laranja">
            Cadastrar
          </button>
          <Link href="/matriculas">Voltar</Link>
        </div>
      </form>
    </>
  );
}
