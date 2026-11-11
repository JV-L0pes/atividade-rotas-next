"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useApp } from "@/components/AppProvider";

export default function NovoAluno() {
  const router = useRouter();
  const { cadastrarAluno } = useApp();
  const [ra, setRa] = useState("");
  const [nome, setNome] = useState("");
  const [erro, setErro] = useState<string | null>(null);

  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const raNumerico = Number(ra);
    if (!/^\d+$/.test(ra) || raNumerico <= 0) {
      setErro("Informe um RA válido, apenas com números.");
      return;
    }
    if (nome.trim().length < 3) {
      setErro("Informe o nome completo do aluno.");
      return;
    }

    const resultado = cadastrarAluno({ ra: raNumerico, name: nome.trim() });
    if (!resultado.ok) {
      setErro(resultado.erro);
      return;
    }

    router.push("/alunos");
  }

  return (
    <>
      <h1>Novo aluno</h1>
      <form className="formulario" onSubmit={enviar}>
        <label>
          RA
          <input
            inputMode="numeric"
            value={ra}
            onChange={(evento) => setRa(evento.target.value)}
            placeholder="Ex.: 258004"
            required
          />
        </label>
        <label>
          Nome completo
          <input
            value={nome}
            onChange={(evento) => setNome(evento.target.value)}
            placeholder="Ex.: Diego Martins"
            required
          />
        </label>

        {erro && <p className="erro">{erro}</p>}

        <div className="acoes">
          <button type="submit" className="botao">
            Cadastrar
          </button>
          <Link href="/alunos">Voltar</Link>
        </div>
      </form>
    </>
  );
}
