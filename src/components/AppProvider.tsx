"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import { alunos as alunosIniciais, type Aluno } from "@/data/alunos";
import { matriculas as matriculasIniciais, type Matricula } from "@/data/matriculas";

type Resultado = { ok: true } | { ok: false; erro: string };

type Estado = { alunos: Aluno[]; matriculas: Matricula[] };

type AppContexto = Estado & {
  cadastrarAluno: (aluno: Aluno) => Resultado;
  cadastrarMatricula: (matricula: Matricula) => Resultado;
};

const CHAVE_ALUNOS = "atividade-alunos";
const CHAVE_MATRICULAS = "atividade-matriculas";

const estadoInicial: Estado = {
  alunos: alunosIniciais,
  matriculas: matriculasIniciais,
};

// Estado em memória sincronizado com o localStorage (fonte externa ao React).
let estado = estadoInicial;
let carregado = false;
const ouvintes = new Set<() => void>();

function ler<T>(chave: string, padrao: T): T {
  try {
    const bruto = localStorage.getItem(chave);
    return bruto ? (JSON.parse(bruto) as T) : padrao;
  } catch {
    return padrao;
  }
}

function snapshot(): Estado {
  if (!carregado) {
    carregado = true;
    estado = {
      alunos: ler(CHAVE_ALUNOS, alunosIniciais),
      matriculas: ler(CHAVE_MATRICULAS, matriculasIniciais),
    };
  }
  return estado;
}

// Durante a hidratação o React usa o estado do servidor e depois re-renderiza com o do navegador.
function snapshotServidor(): Estado {
  return estadoInicial;
}

function assinar(ouvinte: () => void): () => void {
  ouvintes.add(ouvinte);
  return () => {
    ouvintes.delete(ouvinte);
  };
}

function publicar(proximo: Estado) {
  estado = proximo;
  ouvintes.forEach((ouvinte) => ouvinte());
}

function salvar(chave: string, valor: unknown): string | null {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
    return null;
  } catch {
    return "Não foi possível salvar os dados no navegador.";
  }
}

function cadastrarAluno(aluno: Aluno): Resultado {
  if (estado.alunos.some((item) => item.ra === aluno.ra)) {
    return { ok: false, erro: `Já existe um aluno cadastrado com o RA ${aluno.ra}.` };
  }

  const proximos = [...estado.alunos, aluno];
  const erro = salvar(CHAVE_ALUNOS, proximos);
  if (erro) return { ok: false, erro };

  publicar({ ...estado, alunos: proximos });
  return { ok: true };
}

function cadastrarMatricula(matricula: Matricula): Resultado {
  const duplicada = estado.matriculas.some(
    (item) =>
      item.student_ra === matricula.student_ra &&
      item.course_id === matricula.course_id,
  );

  if (duplicada) {
    return { ok: false, erro: "Este aluno já está matriculado nesta disciplina." };
  }

  const proximas = [...estado.matriculas, matricula];
  const erro = salvar(CHAVE_MATRICULAS, proximas);
  if (erro) return { ok: false, erro };

  publicar({ ...estado, matriculas: proximas });
  return { ok: true };
}

const Contexto = createContext<AppContexto | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const dados = useSyncExternalStore(assinar, snapshot, snapshotServidor);

  return (
    <Contexto.Provider value={{ ...dados, cadastrarAluno, cadastrarMatricula }}>
      {children}
    </Contexto.Provider>
  );
}

export function useApp() {
  const contexto = useContext(Contexto);
  if (!contexto) throw new Error("useApp deve ser usado dentro de AppProvider.");
  return contexto;
}
