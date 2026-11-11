import Link from "next/link";

const areas = [
  {
    area: "alunos",
    href: "/alunos",
    rotulo: "Alunos",
    descricao: "Consulte a lista de alunos, veja os detalhes pelo RA e cadastre novos alunos.",
  },
  {
    area: "disciplinas",
    href: "/disciplinas",
    rotulo: "Disciplinas",
    descricao: "Navegue pelo catálogo fixo de disciplinas do curso.",
  },
  {
    area: "matriculas",
    href: "/matriculas",
    rotulo: "Matrículas",
    descricao: "Veja as matrículas existentes e vincule um aluno a uma disciplina.",
  },
];

export default function Home() {
  return (
    <>
      <h1>Sistema Acadêmico</h1>
      <p className="lead">
        Aplicação para consultar e cadastrar alunos e matrículas e consultar as
        disciplinas do curso.
      </p>
      <div className="card-grid">
        {areas.map(({ area, href, rotulo, descricao }) => (
          <Link key={area} href={href} className={`card tema-${area}`}>
            <h2>{rotulo}</h2>
            <p>{descricao}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
